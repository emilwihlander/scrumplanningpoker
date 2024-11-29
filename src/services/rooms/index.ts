import { repository as inMemoryRepository } from "./InMemoryRoomService";
export type Room = {
  id: string;
  hidden: boolean;
  owner: Member;
  members: Record<string, Member>;
};

export type Member = {
  id: string;
  name: string;
  card: string;
};

export type RoomService = {
  create: (userId: string, name: string) => Promise<Room>;
  get: (roomId: string) => Promise<Room | null>;
  setHidden: (roomId: string, hidden: boolean) => Promise<void>;
  selectCard: (roomId: string, userId: string, card: string) => Promise<void>;
  joinRoom: (roomId: string, userId: string, name: string) => Promise<void>;
  resetRoom: (roomId: string) => Promise<void>;
};

export const roomService = inMemoryRepository;
