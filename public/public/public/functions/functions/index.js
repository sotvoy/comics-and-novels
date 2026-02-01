// functions/index.js - Stripe checkout creation + webhook (Firebase Functions)
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();
const db = admin.firestore();

// load stripe secret from functions config
const stripeSecret = functions.config().stripe ? functions.config().stripe.secret : '';
const stripe = require('stripe')(stripeSecret);

exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  if(!context.auth) throw new functions.https.HttpsError('unauthenticated','User must be logged in');
  const uid = context.auth.uid;
  const priceId = data.priceId;
  if(!priceId) throw new functions.https.HttpsError('invalid-argument','priceId required');
  try{
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { uid },
      success_url: data.successUrl || 'https://yourdomain.com/success',
      cancel_url: data.cancelUrl || 'https://yourdomain.com/cancel'
    });
    return { sessionId: session.id, url: session.url };
  }catch(err){ console.error(err); throw new functions.https.HttpsError('internal', err.message); }
});

// Stripe webhook: use express raw to get signature
const webhookApp = express();
webhookApp.use(cors({ origin: true }));
webhookApp.post('/stripeWebhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = functions.config().stripe ? functions.config().stripe.webhook_secret : '';
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if(event.type === 'checkout.session.completed'){
    const session = event.data.object;
    const uid = session.metadata.uid;
    try{
      await admin.firestore().collection('users').doc(uid).set({ verified: true, verifiedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
      console.log('User verified:', uid);
    }catch(e){ console.error('Error updating user verified:', e); }
  }
  res.json({received:true});
});
exports.stripeWebhook = functions.https.onRequest(webhookApp);
