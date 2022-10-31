import { motion } from "framer-motion";
import { ArrowUp } from "phosphor-react";

export function HsiVisual({ hsi }: { hsi: string }) {
  return (
    <div className="relative">
      <ArrowUp
        size={42}
        color="#000"
        weight="bold"
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10"
      />
      <motion.div
        className={`h-[340px] w-[340px] bg-gray-300 border-gray-500 border-4 rounded-full flex items-center justify-center relative font-bold rot`}
        transition={{ type: "linear" }}
        style={{
          transform: `rotate(${Number(hsi)}deg)`,
        }}
        animate={{ rotate: -Number(hsi) }}
      >
        <p className="absolute top-0">0</p>
        <p className="absolute bottom-0">180</p>
        <p className="absolute right-1">90</p>
        <p className="absolute left-1">270</p>
      </motion.div>
    </div>
  );
}
