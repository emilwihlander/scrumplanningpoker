import { Member } from "@/services/rooms";
import { Badge, BadgeProps } from "../ui/badge";
import { getUserId } from "@/services/users";

export type ParticipantBadgeProps = {
  participant: Member;
};

export default function ParticipantBadge({
  participant,
}: ParticipantBadgeProps) {
  const userId = getUserId();

  const variant: BadgeProps["variant"] =
    participant.card == "-" ? "secondary" : "default";
  let backgroundColor = "";
  if (userId == participant.id) {
    if (participant.card == "-") {
      backgroundColor = "bg-cyan-100";
    } else {
      backgroundColor = "bg-cyan-600";
    }
  }
  return (
    <Badge className={backgroundColor} key={participant.id} variant={variant}>
      {participant.name}
    </Badge>
  );
}
