interface TextModeProps {
  altitude: string;
  hsi: string;
  adi: string;
}

export function TextMode({ altitude, hsi, adi }: TextModeProps) {
  return (
    <>
      <div className="bg-white font-bold rounded-sm py-4 px-8 text-center hover:bg-gray-200 transition-colors shadow">
        <h2>ALTITUDE:</h2>
        <p className="text-2xl">{altitude}</p>
      </div>
      <div className="bg-white font-bold rounded-sm py-4 px-8 text-center hover:bg-gray-200 transition-colors shadow">
        <h2>HSI:</h2>
        <p className="text-2xl">{hsi}</p>
      </div>
      <div className="bg-white font-bold rounded-sm py-4 px-8 text-center hover:bg-gray-200 transition-colors shadow">
        <h2>ADI:</h2>
        <p className="text-2xl">{adi}</p>
      </div>
    </>
  );
}
