import { Button } from "../ui/button";

export default function Actions(props: {
  onReset: () => void;
  hidden: boolean;
  onShow: () => void;
  onHide: () => void;
}) {
  return (
    <div className="flex gap-4">
      <Button variant="outline" onClick={props.onReset}>
        Reset
      </Button>
      {props.hidden ? (
        <Button variant="default" onClick={props.onShow}>
          Show
        </Button>
      ) : (
        <Button variant="default" onClick={props.onHide}>
          Hide
        </Button>
      )}
    </div>
  );
}
