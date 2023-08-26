'use client';
import { Player } from '@/types/player';
import { createContext, useState } from 'react';

interface PlayerContextType {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}

export const PlayerContext = createContext<PlayerContextType>(null!);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const contextValue: PlayerContextType = {
    players,
    setPlayers,
  };
  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};
