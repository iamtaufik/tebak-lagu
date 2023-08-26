import { Player } from './player';

export type Room = {
  roomId: string;
  code: string;
  players: Player[];
  createdAt: string;
};
