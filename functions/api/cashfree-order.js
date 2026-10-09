/**
 * Cloudflare Pages Function: /api/cashfree-order
 * Creates a Cashfree PG Order and returns the payment_session_id.
 * 
 * Environment Variables required in Cloudflare Pages dashboard:
 * - CF_APP_ID: Cashfree App ID / Client ID
 * - CF_SECRET_KEY: Cashfree Secret Key
 * - CF_ENVIRONMENT: "production" (default) or "sandbox"
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-version',
};

// Handle browser CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json().catch(() => ({}));
    
    // Test/Live amount (minimum ₹1 in Cashfree)
    const amount = Number(body.amount) || 11.00;
    const customerId = (body.customer_id || 'owner_bhargav_' + Date.now()).substring(0, 45);
    const customerPhone = body.phone || '9876543210';
    const customerName = body.name || 'Bhargav Kulkarni';

    // Cloudflare environment variables
    const appId = env.CF_APP_ID || env.CASHFREE_APP_ID;
    const secretKey = env.CF_SECRET_KEY || env.CASHFREE_SECRET_KEY;
    const isSandbox = (env.CF_ENVIRONMENT === 'sandbox');

    if (!appId || !secretKey) {
      return new Response(
        JSON.stringify({
          error: 'Missing Cashfree credentials. Please set CF_APP_ID and CF_SECRET_KEY in Cloudflare Pages environment variables.',
        }),
        {
          status: 500,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        }
      );
    }

    const host = isSandbox
      ? 'https://sandbox.cashfree.com/pg/orders'
      : 'https://api.cashfree.com/pg/orders';

    const orderId = 'order_us_' + Date.now();

    const cfPayload = {
      order_id: orderId,
      order_amount: amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: customerId,
        customer_phone: customerPhone,
        customer_name: customerName,
      },
      order_meta: {
        return_url: 'https://urbanstay.living/payment-status?order_id={order_id}',
      },
      order_note: 'UrbanStay PG Bed Licensing',
    };

    const cfResponse = await fetch(host, {
      method: 'POST',
      headers: {
        'x-client-id': appId.trim(),
        'x-client-secret': secretKey.trim(),
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cfPayload),
    });

    const cfData = await cfResponse.json();

    if (!cfResponse.ok) {
      return new Response(
        JSON.stringify({
          error: cfData.message || 'Failed to create Cashfree order',
          details: cfData,
        }),
        {
          status: cfResponse.status,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        }
      );
    }

    // Successfully created order!
    return new Response(
      JSON.stringify({
        success: true,
        order_id: cfData.order_id,
        payment_session_id: cfData.payment_session_id,
        order_amount: cfData.order_amount,
        order_status: cfData.order_status,
      }),
      {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: err.message,
      }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      }
    );
  }
}
