import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/libs/prisma';
import { calculatePoints } from '@/libs/pointSystem';

export const GET = async (req: NextRequest, context: { params: { playerid: string } }) => {
  try {
    const { playerid } = context.params;
    const result = await prisma.user.findUnique({
      where: {
        playerId: playerid,
      },
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
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

export const POST = async (req: NextRequest, context: { params: { playerid: string } }) => {
  try {
    const { playerid } = context.params;
    const { guessId, text, timestamp } = await req.json();

    const answer = await prisma.user.findUnique({
      where: {
        playerId: playerid,
      },
      select: {
        song: true,
      },
    });

    const isCorrect = answer?.song!.toLowerCase() === text.toLowerCase();

    const result = await prisma.guess.create({
      data: {
        playerId: guessId,
        authorId: playerid,
        correct: isCorrect,
        points: isCorrect ? calculatePoints(Number(timestamp)) : 0,
        text,
      },
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

export const PUT = async (req: NextRequest, context: { params: { playerid: string } }) => {
  try {
    const { playerid } = context.params;
    const { artist, song, album, url, image } = await req.json();

    const result = await prisma.user.update({
      where: {
        playerId: playerid,
      },
      data: {
        artist,
        song,
        album,
        url,
        image,
      },
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
