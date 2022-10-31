import { AdiVisual } from "./AdiVisual";
import { AltitudeVisual } from "./AltitudeVisual";
import { HsiVisual } from "./HsiVisual";

interface VisualModeProps {
  altitude: string;
  hsi: string;
  adi: string;
}

export function VisualMode({ altitude, hsi, adi }: VisualModeProps) {
  return (
    <>
      <AltitudeVisual altitude={altitude} />
      <HsiVisual hsi={hsi} />
      <AdiVisual adi={adi} />
    </>
  );
}
