import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

export const STRIPE_PLANS = {
  VIP_MONTHLY: {
    price: 5000, // 50 TRY in cents
    interval: 'month',
    name: 'VIP QR - Aylık',
  },
  VIP_YEARLY: {
    price: 40000, // 400 TRY in cents
    interval: 'year',
    name: 'VIP QR - Yıllık',
  },
  VIP_LIFETIME: {
    price: 150000, // 1500 TRY in cents
    interval: 'one_time',
    name: 'VIP QR - Lifetime',
  },
}

export async function createCheckoutSession(
  userId: string,
  planType: keyof typeof STRIPE_PLANS,
  successUrl: string,
  cancelUrl: string
): Promise<Stripe.Checkout.Session> {
  const plan = STRIPE_PLANS[planType]

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'try',
          product_data: {
            name: plan.name,
            description: 'Premium QR özellikleri',
          },
          unit_amount: plan.price,
          ...(plan.interval !== 'one_time' && {
            recurring: {
              interval: plan.interval as 'month' | 'year',
            },
          }),
        },
        quantity: 1,
      },
    ],
    mode: plan.interval === 'one_time' ? 'payment' : 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
    metadata: {
      userId,
      planType,
    },
  })

  return session
}

export async function createPaymentIntent(
  amount: number,
  currency: string = 'try',
  metadata: Record<string, string> = {}
): Promise<Stripe.PaymentIntent> {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  })

  return paymentIntent
}

export async function handleWebhookEvent(
  event: Stripe.Event
): Promise<void> {
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      // Handle successful payment
      console.log('Payment successful:', session.id)
      break
    
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      // Handle successful payment intent
      console.log('Payment intent succeeded:', paymentIntent.id)
      break
    
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent
      // Handle failed payment
      console.log('Payment failed:', failedPayment.id)
      break
    
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }
}
