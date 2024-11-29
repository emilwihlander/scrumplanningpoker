import { Member } from "@/services/rooms";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export type JoinRoomFormProps = {
  roomId: string;
  userId: string;
  owner: Member;
};

export function JoinRoomForm({ roomId, userId, owner }: JoinRoomFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to {owner.name}&apos;s room!</CardTitle>
        <CardDescription>Enter your name to enter the room.</CardDescription>
      </CardHeader>
      <form action={`/api/rooms/${roomId}/join`} method="GET">
        <CardContent>
          <input name="userId" type="hidden" value={userId} />
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Max Mustermann" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Join</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
