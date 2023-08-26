import { Guess } from './guess';

export type Player = {
  playerId: string;
  username: string;
  artist: string;
  song: string;
  album: string;
  url: string;
  image: string;
  guesses: Guess[];
  createdAt: string;
};
