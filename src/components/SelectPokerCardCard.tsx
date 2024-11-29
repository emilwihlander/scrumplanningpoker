import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import PokerCards from "./PokerCards";
import { roomClient } from "@/client/roomClient";

export type SelectPokerCardCardProps = {
  roomId: string;
  userId: string;
  userCard: string;
};

export function SelectPokerCardCard({
  roomId,
  userId,
  userCard,
}: SelectPokerCardCardProps) {
  return (
    <Card className={"my-4 pb-4" + (userCard == "-" ? " highlight" : "")}>
      <CardHeader>
        <CardTitle>Select a card</CardTitle>
        <CardDescription>
          If you change your mind, select a new one.
        </CardDescription>
      </CardHeader>
      <PokerCards
        onCardClick={(c) => roomClient.selectCard(roomId, userId, c)}
      />
    </Card>
  );
}
