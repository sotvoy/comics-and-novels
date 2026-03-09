import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function POST(req: NextRequest) {
  try {
    const supabase = createMiddlewareClient({ req, NextResponse });
    
    // Verify user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized - must be logged in' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { type = 'tip', amount = 500, creatorId, seriesId } = body; // amount in cents

    // Validate amount
    if (amount < 50 || amount > 100000) { // $0.50 to $1000
      return NextResponse.json(
        { error: 'Amount must be between $0.50 and $1000' },
        { status: 400 }
      );
    }

    // Check if Stripe is configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      // Return mock response for development
      console.warn('STRIPE_SECRET_KEY not configured - returning mock checkout');
      return NextResponse.json({
        url: `/stripe/mock-checkout?amount=${amount}&type=${type}&creatorId=${creatorId || ''}&seriesId=${seriesId || ''}`,
        mock: true,
        message: 'Stripe not configured - this is a mock checkout URL',
      });
    }

    // Dynamic import for Stripe
    let stripe: any;
    try {
      const stripeModule = await import('stripe');
      stripe = stripeModule.default;
    } catch (importError) {
      console.warn('Stripe package not installed - using mock response');
      return NextResponse.json({
        url: `/stripe/mock-checkout?amount=${amount}&type=${type}&creatorId=${creatorId || ''}&seriesId=${seriesId || ''}`,
        mock: true,
        message: 'Stripe not installed - this is a mock checkout URL',
      });
    }

    const stripeInstance = new stripe(stripeSecretKey, { apiVersion: '2023-10-16' });

    // Create line items based on type
    const lineItems = [];

    if (type === 'tip') {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Tip for Creator',
            description: creatorId ? `Tip for creator ${creatorId}` : 'Support the platform',
          },
          unit_amount: amount,
        },
        quantity: 1,
      });
    } else if (type === 'subscription') {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Premium Subscription',
            description: 'Monthly premium subscription',
          },
          unit_amount: amount,
        },
        quantity: 1,
      });
    }

    // Create checkout session
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.headers.get('origin') || 'http://localhost:3000';
    
    const checkoutSession = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: type === 'subscription' ? 'subscription' : 'payment',
      success_url: `${baseUrl}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/stripe/canceled`,
      metadata: {
        userId: session.user.id,
        type,
        creatorId: creatorId || '',
        seriesId: seriesId || '',
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
