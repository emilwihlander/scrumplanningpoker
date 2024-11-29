import PokerCard from "./PokerCard";

export const CARDS = [
  "?",
  "0",
  "0.5",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "20",
  "40",
  "100",
];
export default function PokerCards(props: {
  onCardClick: (card: string) => void;
}) {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {CARDS.map((c) => {
        return (
          <PokerCard key={c} card={c} onClick={() => props.onCardClick(c)} />
        );
      })}
    </div>
  );
}
