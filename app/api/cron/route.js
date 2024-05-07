import { NextResponse } from 'next/server';
import sync from './sync-ftp-to-db'
export async function GET(req) {
  const token = req.headers.get('authorization')
  const authorized = process.env.VERCEL_ENV === "development"
    || process.env.CRON_SECRET === `Bearer ${token}`
  if (authorized) {
    await sync()
    return NextResponse.json({ status: 200 });
  }
  return new NextResponse(`Bad token ${token}`, { status: 401 })
}
