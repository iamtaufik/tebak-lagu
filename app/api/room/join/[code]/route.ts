import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/libs/prisma';

export const PUT = async (req: NextRequest, context: { params: { code: string } }) => {
  try {
    const { code } = context.params;
    const { playerId } = await req.json();

    const room = await prisma.room.findUnique({
      where: {
        code: code,
      },
    });

    const player = await prisma.user.update({
      where: {
        playerId,
      },
      data: {
        roomId: room?.roomId,
      },
    });
    return NextResponse.json(player);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

export const GET = async (req: NextRequest, context: { params: { code: string } }) => {
  try {
    const { code } = context.params;
    const result = await prisma.room.findUnique({
      where: {
        code: code,
      },
      select: {
        roomId: true,
        code: true,
        players: {
          select: {
            playerId: true,
            username: true,
            artist: true,
            song: true,
            album: true,
            url: true,
            image: true,
            guesses: {
              select: {
                playerId: true,
                text: true,
                correct: true,
                points: true,
                createdAt: true,
              },
            },
            createdAt: true,
          },
        },
        createdAt: true,
      },
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
