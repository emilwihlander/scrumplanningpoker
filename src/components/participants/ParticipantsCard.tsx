import { Member } from "@/services/rooms";
import ParticipantsHidden from "./ParticipantsHidden";
import ParticipantsShown from "./ParticipantsShown";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Actions from "./Actions";

export type ParticipantsCardProps = {
  participants: Member[];
  hidden: boolean;
  onShow: () => void;
  onHide: () => void;
  onReset: () => void;
};

export default function ParticipantsCard({
  participants,
  hidden,
  onShow,
  onHide,
  onReset,
  ...cardProps
}: ParticipantsCardProps & React.HTMLAttributes<HTMLDivElement>) {
  function getContent() {
    if (hidden) {
      return <ParticipantsHidden participants={participants} />;
    } else {
      return <ParticipantsShown participants={participants} />;
    }
  }

  return (
    <Card {...cardProps}>
      <CardHeader>
        <CardTitle>Participants</CardTitle>
        <CardDescription>
          Anyone that is gray has not chosen a card yet.
        </CardDescription>
      </CardHeader>
      <CardContent>{getContent()}</CardContent>
      <CardFooter className="flex justify-end">
        <Actions
          onReset={onReset}
          hidden={hidden}
          onShow={onShow}
          onHide={onHide}
        />
      </CardFooter>
    </Card>
  );
}
