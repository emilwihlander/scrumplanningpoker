import { Member } from "@/services/rooms";
import ParticipantBadge from "./ParticipantBadge";
import { Fragment } from "react";

export type ParticipantsHiddenProps = {
  participants: Member[];
};

export default function ParticipantsHidden({
  participants,
}: ParticipantsHiddenProps) {
  const numberOfSelectedCards = participants.filter(
    (p) => p.card != "-",
  ).length;

  return (
    <Fragment>
      <div className="mx-12 flex flex-wrap justify-center gap-3">
        {participants.map((p) => (
          <ParticipantBadge participant={p} />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <p className="text-sm text-muted-foreground">
          {numberOfSelectedCards} / {participants.length}
        </p>
      </div>
    </Fragment>
  );
}
