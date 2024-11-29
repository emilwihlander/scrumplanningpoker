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
import { useRef } from "react";

export type JoinRoomFormProps = {
  owner: Member;
  onSubmit: (name: string) => void;
};

export function JoinRoomForm({ owner, onSubmit }: JoinRoomFormProps) {
  const nameRef = useRef<HTMLInputElement>(null);

  async function onJoin() {
    const name = nameRef.current?.value;
    if (name) {
      onSubmit(name);
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to {owner.name}&apos;s room!</CardTitle>
        <CardDescription>Enter your name to enter the room.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" ref={nameRef} placeholder="Max Mustermann" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => onJoin()}>Join</Button>
      </CardFooter>
    </Card>
  );
}
