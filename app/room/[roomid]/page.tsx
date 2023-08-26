'use client';
import { fetcher } from '@/libs/fetcher';
import { Room } from '@/types/room';
import React from 'react';
import useSWR from 'swr';

const Page = ({ params }: { params: { roomid: string } }) => {
  const { data, error, isLoading }: { data: Room; error: any; isLoading: boolean } = useSWR(`/api/room/join/${params.roomid}`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (!isLoading) console.log(data.players);
  return (
    <div className="container flex gap-y-4 justify-evenly flex-wrap">
      {data.players.map((player) => (
        <div className="w-80">
          <h1>{player.username}</h1>
          <div>
            <img src={player.image} alt={player.song} width={100} height={100} />
            <p>
              {player.song} - {player.artist}
            </p>
            <audio controls autoPlay>
              <source src={player.url} />
            </audio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
