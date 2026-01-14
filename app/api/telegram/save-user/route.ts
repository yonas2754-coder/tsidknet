import { NextResponse } from 'next/server';
import  prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { telegramId, phone, username } = await req.json();

  if (!telegramId || !phone) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  await prisma.user.upsert({
    where: { telegramId: BigInt(telegramId) },
    update: { phone, username },
    create: {
      telegramId: BigInt(telegramId),
      phone,
      username
    }
  });

  return NextResponse.json({ success: true });
}
