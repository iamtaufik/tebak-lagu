import { MusicTrack } from '@/types/musicTrack';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');

    const response = await fetch(`https://itunes.apple.com/search?term=${search}`, { next: { revalidate: 60 } });
    const data = await response.json();
    const { resultCount, results }: { resultCount: number; results: MusicTrack[] } = data;
    const output = results.map((result) => {
      return { artist: result.artistName, song: result.trackName, album: result.collectionName, url: result.previewUrl, image: result.artworkUrl100 };
    });

    return NextResponse.json({ resultCount, results: output });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};


