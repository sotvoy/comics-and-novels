// reCAPTCHA verification utility
// Used to verify the reCAPTCHA token on the server side

export interface RecaptchaVerificationResult {
  success: boolean;
  score?: number;
  error?: string;
}

/**
 * Verify reCAPTCHA token with Google
 * @param token - The reCAPTCHA token from the client
 * @param action - The action name for score-based verification (v3)
 */
export async function verifyRecaptcha(
  token: string,
  action?: string
): Promise<RecaptchaVerificationResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY not configured - skipping verification');
    return { success: true }; // Fail open if not configured
  }

  try {
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);

    if (action) {
      formData.append('action', action);
    }

    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        error: data['error-codes']?.join(', ') || 'Verification failed',
      };
    }

    // For reCAPTCHA v3, check score threshold
    if (action && data.score !== undefined) {
      const threshold = 0.5; // Adjust based on security needs
      if (data.score < threshold) {
        return {
          success: false,
          score: data.score,
          error: `Score ${data.score} below threshold ${threshold}`,
        };
      }
    }

    return {
      success: true,
      score: data.score,
    };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Verify reCAPTCHA token for a specific action
 */
export async function verifyRecaptchaForAction(
  token: string,
  action: 'signup' | 'comment' | 'contact'
): Promise<RecaptchaVerificationResult> {
  return verifyRecaptcha(token, action);
}
