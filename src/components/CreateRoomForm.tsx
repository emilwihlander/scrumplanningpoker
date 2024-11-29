import * as React from "react";

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

export function CreateRoomForm(props: { userId: string }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Scrum Poker room</CardTitle>
        <CardDescription>
          Allow your team to easily align on estimation.
        </CardDescription>
      </CardHeader>
      <form action="/api/rooms" method="POST">
        <CardContent>
          <input name="userId" type="hidden" value={props.userId} />
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Max Mustermann" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Create</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
