import { NextResponse } from 'next/server';
import { verifyTelegramInitData } from '@/lib/telegram';

export async function POST(req: Request) {
  const { initData } = await req.json();

  const valid = verifyTelegramInitData(
    initData,
    process.env.BOT_TOKEN!
  );

  return NextResponse.json({ valid });
}
