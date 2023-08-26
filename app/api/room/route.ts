import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/libs/prisma';
import { generateCode } from '@/libs/generateCode';

export const POST = async (req: NextRequest) => {
  try {
    const { username } = await req.json();

    const player = await prisma.user.create({
      data: {
        username,
      },
    });

    const result = await prisma.room.create({
      data: {
        roomAuthorId: player.playerId,
        code: generateCode(5),
      },
    });

    await prisma.user.update({
      where: {
        playerId: player.playerId,
      },
      data: {
        roomId: result.roomId,
      },
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const result = await prisma.room.findMany({
      select: {
        roomAuthorId: true,
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
                id: true,
                playerId: true,
                text: true,
                correct: true,
                points: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
