import { Member } from "@/services/rooms";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import PokerCard from "../PokerCard";
import { CARDS } from "../PokerCards";
import ParticipantBadge from "./ParticipantBadge";

export type ParticipantsShownProps = {
  participants: Member[];
};

export default function ParticipantsShown({
  participants,
}: ParticipantsShownProps) {
  return (
    <Table>
      <TableBody>
        {groupByCard(participants).map(([card, members]) =>
          getRow(card, members),
        )}
      </TableBody>
    </Table>
  );
}

function getRow(card: string, participants: Member[]) {
  if (participants.length == 0) return;

  return (
    <TableRow key={card}>
      <TableCell>
        <PokerCard small card={card} />
      </TableCell>
      <TableCell>
        <div className="flex gap-3">
          {participants.map((p) => (
            <ParticipantBadge key={p.id} participant={p} />
          ))}
        </div>
      </TableCell>
    </TableRow>
  );
}

function groupByCard(participants: Member[]): [string, Member[]][] {
  return CARDS.map((c) => [c, participants.filter((m) => m.card === c)]);
}
