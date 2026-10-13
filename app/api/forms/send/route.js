import { NextResponse } from 'next/server';

export async function POST(request) {
  const websiteId = process.env.CRM_WEBSITE_ID;
  const integrationSecret = process.env.CRM_INTEGRATION_SECRET;
  if (!websiteId || !integrationSecret) {
    return NextResponse.json({
      success: false,
      message: 'Form submission is not configured on the server.',
    }, { status: 503 });
  }

  try {
    const payload = await request.json();
    const response = await fetch(
      process.env.CRM_ENDPOINT || 'https://office.digifyitsolution.com/api/crm/integrations/leads',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-crm-integration-id': websiteId,
          'x-crm-integration-secret': integrationSecret,
        },
        body: JSON.stringify(payload),
      },
    );
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false) {
      return NextResponse.json({
        success: false,
        message: result.message || 'Form submission failed. Please try again.',
      }, { status: response.ok ? 502 : response.status });
    }
    return NextResponse.json({
      success: true,
      message: result.message || 'Your submission has been sent successfully.',
    });
  } catch (error) {
    console.error('CRM form submission failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Could not submit the form. Please try again.',
    }, { status: 502 });
  }
}
