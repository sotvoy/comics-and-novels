// Stripe wrapper that handles optional installation
// Use this instead of directly importing 'stripe'

let stripeInstance: any = null;

export async function getStripe(secretKey: string) {
  if (stripeInstance) {
    return stripeInstance;
  }

  try {
    const Stripe = (await import('stripe')).default;
    stripeInstance = new Stripe(secretKey, { apiVersion: '2023-10-16' });
    return stripeInstance;
  } catch (error) {
    console.warn('Stripe package not installed');
    return null;
  }
}

export function isStripeAvailable(): boolean {
  try {
    require.resolve('stripe');
    return true;
  } catch {
    return false;
  }
}
