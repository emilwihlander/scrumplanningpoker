"use client";

import { CreateRoomForm } from "@/components/CreateRoomForm";
import { getUserId } from "@/services/users";

export default function Home() {
  const userId = getUserId();
  return (
    <div className="bg-slate-50 w-screen h-screen flex flex-col justify-center items-center">
      <CreateRoomForm userId={userId ?? ""} />
      <div className="pt-4 w-[340px]">
        <p className="text-sm text-muted-foreground">
          Created by Emil Wihlander.
        </p>
      </div>
    </div>
  );
}
