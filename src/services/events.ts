import { Member } from "./rooms";

export type RoomEvent =
  | CardSelectedEvent
  | ResetEvent
  | JoinedEvent
  | HideEvent;

export type CardSelectedEvent = {
  type: "CARD_SELECTED";
  card?: string;
  by: Member;
};

export type JoinedEvent = {
  type: "JOINED";
  user: Member;
};

export type ResetEvent = {
  type: "RESET";
};

export type HideEvent = {
  type: "HIDDEN";
  hidden: boolean;
};

export type EventListener = (event: RoomEvent) => void;

const listeners: Record<string, Record<string, EventListener>> = {};

export function getRoomListeners(roomId: string): EventListener[] {
  return Object.values(listeners[roomId] ?? {});
}

export function addRoomListener(
  roomId: string,
  userId: string,
  listener: EventListener,
) {
  if (!listeners[roomId]) {
    listeners[roomId] = {};
  }
  listeners[roomId][userId] = listener;
}

export function removeRoomListener(roomId: string, userId: string) {
  if (listeners[roomId]) {
    delete listeners[roomId][userId];
  }
}
