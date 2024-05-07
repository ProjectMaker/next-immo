import { NextResponse } from 'next/server';
import sync from './sync-ftp-to-db'
export async function GET(req) {
  const authorized = process.env.VERCEL_ENV === "development"
    ? true
    : req.headers.get('Authorization') === `Bearer ${process.env.CRON_SECRET}`
  if (authorized) {
    await sync()
    return NextResponse.json({ status: 200 });
  }
  return NextResponse.json({ status: 401 });
}
