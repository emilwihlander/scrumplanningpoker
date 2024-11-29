import { MongoClient, ObjectId, WithId } from "mongodb";
import { getRoomListeners, RoomEvent } from "../events";
import { Member, Room, RoomService } from ".";

export type MongoRoom = {
  _id?: ObjectId;
  hidden: boolean;
  owner: Member;
  members: Record<string, Member>;
};

const mongodbUri = "mongodb://localhost:27017/scrum-poker";

const client = new MongoClient(mongodbUri);
const rooms = client.db().collection<MongoRoom>("rooms");

async function createRoom(userId: string, name: string): Promise<Room> {
  const owner: Member = {
    id: userId,
    name: name,
    card: "-",
  };
  const room: MongoRoom = {
    hidden: true,
    owner: owner,
    members: { [userId]: owner },
  };
  const savedRoom = await rooms.insertOne(room);
  return {
    id: savedRoom.insertedId.toHexString(),
    ...room,
  };
}

async function getRoom(roomId: string): Promise<Room | null> {
  const room = await rooms.findOne(getQuery(roomId));
  return toDomain(room);
}

async function setHidden(roomId: string, hidden: boolean) {
  const room = await getRoom(roomId);
  if (room) {
    room.hidden = hidden;
    await rooms.replaceOne(getQuery(roomId), room);
    sendEvent(roomId, { type: "HIDDEN", hidden });
  }
}

async function selectCard(roomId: string, userId: string, card: string) {
  const room = await getRoom(roomId);
  if (room?.members[userId]) {
    room.members[userId].card = card;
    await rooms.replaceOne(getQuery(roomId), room);
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
    await rooms.replaceOne(getQuery(roomId), room);
    sendEvent(roomId, { type: "JOINED", user: member });
  }
}

async function resetRoom(roomId: string) {
  const room = await getRoom(roomId);
  if (room) {
    Object.values(room.members).forEach((member) => (member.card = "-"));
    await rooms.replaceOne(getQuery(roomId), room);
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

function getQuery(roomId: string) {
  return {
    _id: new ObjectId(roomId),
  };
}

function sendEvent(roomId: string, event: RoomEvent) {
  getRoomListeners(roomId).forEach((listener) => listener(event));
}

function toDomain(room: WithId<MongoRoom> | null): Room | null {
  if (!room) return null;
  return {
    ...room,
    id: room._id.toHexString(),
  };
}
