import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/libs/prisma';

export const GET = async (req: NextRequest) => {
  return NextResponse.json({ message: 'Hello World' });
};

export const POST = async (req: NextRequest) => {
  try {
    const { username } = await req.json();
    const result = await prisma.user.create({
      data: {
        username,
      },
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
