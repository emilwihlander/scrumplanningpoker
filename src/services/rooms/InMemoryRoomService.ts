import { getRoomListeners, RoomEvent } from "../events";
import { Member, Room, RoomService } from ".";

const rooms: Record<string, Room> = {};

async function createRoom(userId: string, name: string): Promise<Room> {
  const owner: Member = {
    id: userId,
    name: name,
    card: "-",
  };
  const room = {
    id: generateRandomHexId(),
    hidden: true,
    owner: owner,
    members: { [userId]: owner },
  };

  rooms[room.id] = room;
  return room;
}

function generateRandomHexId(): string {
  const hexChars = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * hexChars.length);
    result += hexChars[randomIndex];
  }
  return result;
}

async function getRoom(roomId: string): Promise<Room | null> {
  return rooms[roomId];
}

async function setHidden(roomId: string, hidden: boolean) {
  const room = await getRoom(roomId);
  if (room) {
    room.hidden = hidden;
    sendEvent(roomId, { type: "HIDDEN", hidden });
  }
}

async function selectCard(roomId: string, userId: string, card: string) {
  const room = await getRoom(roomId);
  if (room?.members[userId]) {
    room.members[userId].card = card;
    sendEvent(roomId, {
      type: "CARD_SELECTED",
      by: room.members[userId],
      card: card,
    });
  }
}

async function joinRoom(roomId: string, userId: string, name: string) {
  if (!name || !userId) return;
  const room = await getRoom(roomId);
  if (room) {
    const member = {
      id: userId,
      name: name,
      card: "-",
    };
    room.members[userId] = member;
    sendEvent(roomId, { type: "JOINED", user: member });
  }
}

async function resetRoom(roomId: string) {
  const room = await getRoom(roomId);
  if (room) {
    Object.values(room.members).forEach((member) => (member.card = "-"));
    sendEvent(roomId, { type: "RESET" });
  }
}

export const repository: RoomService = {
  create: createRoom,
  get: getRoom,
  setHidden,
  selectCard,
  joinRoom,
  resetRoom,
};

function sendEvent(roomId: string, event: RoomEvent) {
  getRoomListeners(roomId).forEach((listener) => listener(event));
}
