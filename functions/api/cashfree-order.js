/**
 * Cloudflare Pages Function: /api/cashfree-order
 * Creates a Cashfree PG Order and returns payment_session_id.
 * 
 * Auto-detects and supports both Production & Sandbox credentials.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-version',
};

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
    
    const amount = Number(body.amount) || 11.00;
    const customerId = (body.customer_id || 'owner_bhargav_' + Date.now()).substring(0, 45);
    const customerPhone = body.phone || '9876543210';
    const customerName = body.name || 'Bhargav Kulkarni';

    const appId = (env.CF_APP_ID || env.CASHFREE_APP_ID || '').trim();
    const secretKey = (env.CF_SECRET_KEY || env.CASHFREE_SECRET_KEY || '').trim();

    if (!appId || !secretKey) {
      return new Response(
        JSON.stringify({
          error: 'Missing Cashfree credentials. Please set CF_APP_ID and CF_SECRET_KEY in Cloudflare Pages (Settings -> Environment variables).',
        }),
        {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        }
      );
    }

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

    // Auto-detect whether to try Sandbox or Production first
    const explicitlySandbox = env.CF_ENVIRONMENT === 'sandbox' || appId.toUpperCase().startsWith('TEST');
    const primaryHost = explicitlySandbox 
      ? 'https://sandbox.cashfree.com/pg/orders' 
      : 'https://api.cashfree.com/pg/orders';
    const fallbackHost = explicitlySandbox 
      ? 'https://api.cashfree.com/pg/orders' 
      : 'https://sandbox.cashfree.com/pg/orders';

    let activeEnv = explicitlySandbox ? 'sandbox' : 'production';

    // 1. Try Primary Host
    let cfResponse = await fetch(primaryHost, {
      method: 'POST',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cfPayload),
    });

    let cfData = await cfResponse.json();

    // 2. If 401 Authentication failed, automatically try the other environment
    if (cfResponse.status === 401) {
      const fallbackEnv = (activeEnv === 'sandbox') ? 'production' : 'sandbox';
      const fallbackResponse = await fetch(fallbackHost, {
        method: 'POST',
        headers: {
          'x-client-id': appId,
          'x-client-secret': secretKey,
          'x-api-version': '2023-08-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cfPayload),
      });

      if (fallbackResponse.ok) {
        cfResponse = fallbackResponse;
        cfData = await fallbackResponse.json();
        activeEnv = fallbackEnv;
      }
    }

    if (!cfResponse.ok) {
      return new Response(
        JSON.stringify({
          error: cfData.message || 'Cashfree Authentication Failed',
          hint: 'Please check your Cashfree App ID and Secret Key in Cloudflare Pages. Verify whether your keys were created in Cashfree Sandbox (test) or Live Production dashboard.',
          details: cfData,
        }),
        {
          status: cfResponse.status,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        }
      );
    }

    // Success
    return new Response(
      JSON.stringify({
        success: true,
        order_id: cfData.order_id,
        payment_session_id: cfData.payment_session_id,
        order_amount: cfData.order_amount,
        environment: activeEnv,
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
