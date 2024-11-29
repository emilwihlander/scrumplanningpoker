import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";

export function CreateRoomForm(props: { onSubmit: (name: string) => void }) {
  const nameRef = useRef<HTMLInputElement>(null);

  async function onSubmit() {
    const name = nameRef.current?.value;
    if (name) {
      props.onSubmit(name);
    }
  }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Scrum Poker room</CardTitle>
        <CardDescription>
          Allow your team to easily align on estimation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Max Mustermann"
              ref={nameRef}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => onSubmit()}>Create</Button>
      </CardFooter>
    </Card>
  );
}
