import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export default function LoadingCard() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="h-6 w-1/3 bg-slate-200 rounded"></div>
        <div className="h-5 w-2/3 bg-slate-200 rounded"></div>
      </CardHeader>
      <CardContent>
        <div className="h-16 w-full bg-slate-200 rounded"></div>
      </CardContent>
      <CardFooter className="justify-end">
        <div className="h-10 w-20 bg-slate-200 rounded"></div>
      </CardFooter>
    </Card>
  );
}
