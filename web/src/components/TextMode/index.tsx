interface TextModeProps {
  altitude: string;
  hsi: string;
  adi: string;
}

export function TextMode({ altitude, hsi, adi }: TextModeProps) {
  return (
    <>
      <div>{altitude}</div>
      <div>{hsi}</div>
      <div>{adi}</div>
    </>
  );
}
