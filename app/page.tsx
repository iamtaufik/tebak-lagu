'use client';
import { ShowModal } from '@/components/Modal';
import { PlayerContext } from '@/context/player.context';
import Link from 'next/link';
import { useContext, useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { setPlayers } = useContext(PlayerContext);

  setPlayers([
    {
      album: 'Album 1',
      artist: 'Artist 1',
      image: 'https://i.scdn.co/image/ab67616d0000b273e3b5b8b2b2b2b2b2b2b2b2b2',
      song: 'Song 1',
      playerId: '1',
      url: 'https://p.scdn.co/mp3-preview/ab67616d0000b273e3b5b8b2b2b2b2b2b2b2b2b2?cid=774b29d4f13844c495f206cafdad9c86',
      username: 'Username 1',
      guesses: [],
      createdAt: new Date().toLocaleString(),
    },
  ]);
  const handleClick = (ev: boolean) => {
    ShowModal(ev);
  };
  return (
    <div className="container">
      <div>
        <button onClick={() => handleClick(!isOpen)}>Multiplayer</button>
      </div>
    </div>
  );
}
