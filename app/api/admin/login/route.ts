import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const pwd = await req.text();
  if (pwd === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set('admin', 'ok', {
      httpOnly: true,
      path: '/admin',
      maxAge: 60 * 60 * 8,
    });
    return res;
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
