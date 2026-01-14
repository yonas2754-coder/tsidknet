import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const telegramId = searchParams.get('telegramId');

  if (!telegramId) {
    return NextResponse.json({ error: 'Missing telegramId' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { telegramId: BigInt(telegramId) }
  });

  return NextResponse.json(user);
}
