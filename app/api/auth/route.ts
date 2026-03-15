import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'studio2026';

export async function POST(request: Request) {
  const body = await request.json();
  if (body.password === ADMIN_PASSWORD) {
    return NextResponse.json({ success: true, token: 'admin-session-token' });
  }
  return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
}
