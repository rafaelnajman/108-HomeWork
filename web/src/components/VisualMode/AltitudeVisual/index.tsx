import { motion } from "framer-motion";
export function AltitudeVisual({ altitude }: { altitude: string }) {
  return (
    <div className="h-[440px] w-16 lg:ml-14 bg-gray-300 border-gray-500 border-4 text-black font-bold flex flex-col justify-between items-center relative">
      <p>3000</p>
      <p>2000</p>
      <p>1000</p>
      <p>0</p>
      <motion.span
        className={`h-2 w-full bg-black absolute`}
        style={{
          bottom: `${Number(altitude) / 30}%`,
        }}
        transition={{ type: "linear" }}
        animate={{ bottom: Number(altitude) / 7 }}
      />
    </div>
  );
}
