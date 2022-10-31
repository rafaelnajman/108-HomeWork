export function AdiVisual({ adi }: { adi: string }) {
  function calculateBackgroundColor() {
    if (adi == "100") {
      return "blue";
    } else if (adi == "-100") {
      return "green";
    } else {
      return "blue";
    }
  }
  return (
    <div
      className="h-[340px] w-[340px] border-gray-500 border-4 rounded-full max-lg:mb-10 "
      //if adi is 100  so the background is blue and if adi is -100 so the background is green and if adi is 0 so the background is half blue and half green
      style={{
        backgroundColor: calculateBackgroundColor(),
        backgroundImage:
          adi == "0"
            ? "linear-gradient(blue 0%, blue 50%, green 50%,green 100%)"
            : "none",
      }}
    />
  );
}
