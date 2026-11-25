import { NextResponse } from 'next/server';
import { createTestResult } from '@/lib/airtable';

// Saves level-test results to Airtable on the server,
// so the Airtable key never reaches the visitor's browser.
export async function POST(request) {
  try {
    const data = await request.json();
    if (!data?.Email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }
    const record = await createTestResult(data);
    return NextResponse.json({ success: true, airtableId: record?.id });
  } catch (error) {
    console.error('❌ Test result save error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save test result' },
      { status: 500 }
    );
  }
}
