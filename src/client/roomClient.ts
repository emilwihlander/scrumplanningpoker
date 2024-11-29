import { RoomEvent } from "@/services/events";
import { Room, RoomService } from "@/services/rooms";

async function create(userId: string, name: string): Promise<Room> {
  const res = await fetch("/api/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, name }),
  });

  return res.json();
}

async function joinRoom(
  roomId: string,
  userId: string,
  name: string,
): Promise<void> {
  await fetch(`/api/rooms/${roomId}/join`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, name }),
  });
}

async function get(roomId: string): Promise<Room | null> {
  if (!roomId) return null;
  const res = await fetch(`/api/rooms/${roomId}`);
  if (res.status != 200) {
    throw new Error("No response");
  } else {
    const room: Room = await res.json();
    return room;
  }
}

async function selectCard(roomId: string, userId: string, card: string) {
  await fetch(`/api/rooms/${roomId}/select_card`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, card }),
  });
}

async function resetRoom(roomId: string) {
  await fetch(`/api/rooms/${roomId}/reset`, { method: "PUT" });
}

async function setHidden(roomId: string, hidden: boolean) {
  await fetch(`/api/rooms/${roomId}/set_hidden`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hidden }),
  });
}

function registerListener(
  roomId: string,
  userId: string,
  handleEvent: (event: RoomEvent) => void,
): EventSource {
  const url = `/api/rooms/${roomId}/events?userId=${userId}`;
  const eventSource = new EventSource(url);
  eventSource.onmessage = (e: MessageEvent) => {
    const event = JSON.parse(e.data) as RoomEvent;
    handleEvent(event);
  };
  return eventSource;
}

export type RoomClient = RoomService & {
  registerListener: (
    roomId: string,
    userId: string,
    handleEvent: (event: RoomEvent) => void,
  ) => EventSource;
};

export const roomClient: RoomClient = {
  create,
  get,
  selectCard,
  joinRoom,
  resetRoom,
  setHidden,
  registerListener,
};
