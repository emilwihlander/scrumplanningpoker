"use client";

import { roomClient } from "@/client/roomClient";
import { CreateRoomForm } from "@/components/CreateRoomForm";
import { getUserId } from "@/services/users";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const userId = getUserId();

  async function onSubmit(name: string) {
    const room = await roomClient.create(userId ?? "", name);
    router.push("/rooms/" + room.id);
  }
  return (
    <div className="bg-slate-50 w-screen h-screen flex flex-col justify-center items-center">
      <CreateRoomForm onSubmit={(name) => onSubmit(name)} />
      <div className="pt-4 w-[340px]">
        <p className="text-sm text-muted-foreground">
          Created by Emil Wihlander.
        </p>
      </div>
    </div>
  );
}
