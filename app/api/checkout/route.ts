import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();
    
    let planId: string;
    let amount: string;
    let description: string;
    
    switch (plan) {
      case 'basic':
        planId = process.env.PAYPAL_PLAN_BASIC!;
        amount = '20.00';
        description = 'KI-Agent Basic - Monatliches Abo';
        break;
      case 'premium':
        planId = process.env.PAYPAL_PLAN_PREMIUM!;
        amount = '40.00';
        description = 'KI-Agent Premium - Monatliches Abo';
        break;
      default:
        return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // PayPal Access Token holen
    const auth = Buffer.from(
      `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64');

    const tokenResponse = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // PayPal Subscription erstellen
    const subscriptionResponse = await fetch('https://api-m.sandbox.paypal.com/v1/billing/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        plan_id: planId,
        start_time: new Date(Date.now() + 60000).toISOString(), // Start in 1 Minute
        subscriber: {
          name: {
            given_name: 'Kunde',
            surname: 'Name'
          }
        },
        application_context: {
          brand_name: 'KI-Assistent Service',
          locale: 'de-DE',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
          payment_method: {
            payer_selected: 'PAYPAL',
            payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
          },
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`
        }
      }),
    });

    const subscriptionData = await subscriptionResponse.json();
    
    if (subscriptionData.links) {
      const approvalUrl = subscriptionData.links.find((link: any) => link.rel === 'approve')?.href;
      return NextResponse.json({ url: approvalUrl });
    }

    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  } catch (error) {
    console.error('PayPal checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}