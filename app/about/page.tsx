'use client';
import { PlayerContext } from '@/context/player.context';
import Link from 'next/link';
import { useContext } from 'react';

const Page = () => {
  const { players } = useContext(PlayerContext);

  return <div>{JSON.stringify(players)}</div>;
};

export default Page;
