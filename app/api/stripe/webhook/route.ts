import { NextRequest, NextResponse } from 'next/server';

// Stripe webhook handler
// Note: For this to work, you need to set up Stripe CLI or configure your webhook URL in Stripe Dashboard

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  // Check if Stripe is configured
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    console.warn('Stripe not configured - skipping webhook processing');
    return NextResponse.json(
      { received: true, mock: true },
      { status: 200 }
    );
  }

  let event;

  try {
    let stripe: any;
    try {
      const stripeModule = await import('stripe');
      stripe = stripeModule.default;
    } catch (importError) {
      console.warn('Stripe package not installed - skipping webhook');
      return NextResponse.json(
        { received: true, mock: true },
        { status: 200 }
      );
    }

    const stripeInstance = new stripe(stripeSecretKey, { apiVersion: '2023-10-16' });

    event = stripeInstance.webhooks.constructEvent(body, signature!, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { userId, type, creatorId, seriesId } = session.metadata || {};

        if (!userId) {
          console.warn('No userId in session metadata');
          break;
        }

        // Record transaction in database
        // This would insert into a payments/transactions table
        console.log('Payment completed:', {
          userId,
          type,
          creatorId,
          seriesId,
          amount: session.amount_total,
          currency: session.currency,
        });

        // TODO: Insert into transactions table
        // const supabase = createServerClient(...);
        // await supabase.from('transactions').insert({ ... });

        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log('Subscription event:', event.type, subscription.id);
        // TODO: Handle subscription changes in database
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        console.log('Invoice paid:', invoice.id);
        // TODO: Update subscription status
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.log('Invoice payment failed:', invoice.id);
        // TODO: Handle failed payment
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
