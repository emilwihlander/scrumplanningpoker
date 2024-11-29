"use client";

import "@/app/globals.css";
import { roomClient } from "@/client/roomClient";
import { JoinRoomForm } from "@/components/JoinRoomCard";
import LoadingCard from "@/components/LoadingCard";
import ParticipantsCard from "@/components/participants/ParticipantsCard";
import { SelectPokerCardCard } from "@/components/SelectPokerCardCard";
import { RoomEvent } from "@/services/events";
import { Member } from "@/services/rooms";
import { getUserId } from "@/services/users";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ScrumPoker() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [listener, setListener] = useState<EventSource | null>(null);
  const { members, setMembers, addMember } = useMembers();
  const [owner, setOwner] = useState<Member | null>(null);

  const roomId = router.query.id as string;
  const userId = getUserId();

  const needToJoin = !Object.keys(members).includes(userId ?? "");

  const ready = !loading && userId && owner;

  async function fetchRoom(roomId: string) {
    try {
      const room = await roomClient.get(roomId);
      if (room) {
        setMembers(room.members);
        setOwner(room.owner);
      }
      setLoading(false);
    } catch {
      return await router.push("/");
    }
  }

  function handleEvent(event: RoomEvent) {
    switch (event.type) {
      case "CARD_SELECTED":
        addMember(event.by);
        break;
      case "RESET":
        fetchRoom(roomId);
        break;
      case "JOINED":
        addMember(event.user);
        break;
      case "HIDDEN":
        setHidden(event.hidden);
        break;
    }
  }

  useEffect(() => {
    if (!roomId || !userId || listener) return;
    const eventSource = roomClient.registerListener(roomId, userId, (e) =>
      handleEvent(e),
    );
    setListener(eventSource);
  }, [roomId]);

  useEffect(() => {
    fetchRoom(roomId);
  }, [roomId]);

  return (
    <div className="pt-8 bg-slate-50 w-screen min-h-screen flex flex-col items-center">
      <div className="max-w-xl">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Scrum Planning Poker
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Not used to Scrum Planning Poker or want to refresh your memory on
          certain aspects? No worries, get information{" "}
          <a
            className="text-emerald-600"
            href="https://www.atlassian.com/blog/platform/scrum-poker-for-agile-projects"
          >
            here
          </a>
          .
        </p>
        <div className="mt-4">
          {!ready && <LoadingCard />}
          {ready && !needToJoin && (
            <ParticipantsCard
              participants={Object.values(members)}
              hidden={hidden}
              onReset={() => roomClient.resetRoom(roomId)}
              onHide={() => roomClient.setHidden(roomId, true)}
              onShow={() => roomClient.setHidden(roomId, false)}
            />
          )}
          {ready && needToJoin && (
            <JoinRoomForm roomId={roomId} userId={userId} owner={owner} />
          )}
        </div>
        {ready && !needToJoin && (
          <SelectPokerCardCard
            roomId={roomId}
            userId={userId}
            userCard={members[userId]?.card}
          />
        )}
      </div>
    </div>
  );
}

function useMembers() {
  const [members, setMembers] = useState<Record<string, Member>>({});
  function addMember(member: Member) {
    setMembers((prev) => ({
      ...prev,
      [member.id]: member,
    }));
  }

  return {
    members,
    setMembers,
    addMember,
  };
}
