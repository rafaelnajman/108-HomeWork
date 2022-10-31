import { Button } from "./Button";

export function Nav() {
  return (
    <div className="flex gap-5 lg:absolute top-0 m-5 font-bold">
      <Button>Visual</Button>
      <Button>Text</Button>
    </div>
  );
}
