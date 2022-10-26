import Logo108 from "./assets/Bamza_108.png";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { motion } from "framer-motion";
import { api } from "./services/api";
import { ArrowUp } from "phosphor-react";

type Response = {
  altitude: string;
  hsi: string;
  adi: string;
};

function App() {
  const [information, setInformation] = useState<Response>({
    altitude: "0",
    hsi: "0",
    adi: "0",
  });
  const [listening, setListening] = useState(false);
  const { isVisual, setIsVisual } = useContext(Context);

  useEffect(() => {
    api.get("/last").then((response) => {
      console.log(response.data);
      setInformation(response.data);
    });
  }, []);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource("http://localhost:3000/");
      events.addEventListener("open", () => {
        console.log("Connection opened");
      });

      events.onerror = (error) => {
        console.log("Error", error);
      };

      events.addEventListener("message", (e) => {
        console.log(e.data);
        const data: Response = JSON.parse(e.data);

        setInformation(data);
      });

      setListening(true);
    }
  }, [listening, information]);

  //if adi is 100  so the background is blue and if adi is -100 so the background is green and if adi is 0 so the background is half blue and half green
  function calculateBackgroundColor() {
    if (information.adi == "100") {
      return "blue";
    } else if (information.adi == "-100") {
      return "green";
    } else {
      return "blue";
    }
  }

  return (
    <div className="App">
      <div className="bg-cyan-900 h-screen w-screen flex items-center justify-center relative">
        <div className="absolute h-20 w-20 right-0 top-0 z-10 m-8">
          <img src={Logo108} alt="logo" />
        </div>
        <div className="w-screen h-4/5 bg-cyan-500 mx-10 rounded-lg flex justify-around items-center relative">
          <div className="flex flex-col absolute top-0 left-0 m-5 font-bold">
            <button
              onClick={() => setIsVisual(true)}
              className={`px-8 py-4  rounded-sm mb-3 ${
                isVisual
                  ? "bg-slate-800 hover:bg-slate-600 text-white"
                  : "bg-white hover:bg-slate-400"
              } transition-colors`}
            >
              Visual
            </button>
            <button
              onClick={() => setIsVisual(false)}
              className={`px-8 py-4  rounded-sm ${
                !isVisual
                  ? "bg-slate-800 hover:bg-slate-600 text-white"
                  : "bg-white hover:bg-slate-400"
              } transition-colors`}
            >
              Text
            </button>
          </div>
          {isVisual ? (
            <>
              <div className="h-[440px] w-16 ml-14 bg-gray-300 border-gray-500 border-4 text-black font-bold flex flex-col justify-between items-center relative">
                <p>3000</p>
                <p>2000</p>
                <p>1000</p>
                <p>0</p>
                <motion.span
                  className={`h-2 w-full bg-black absolute`}
                  style={{
                    bottom: `${Number(information.altitude) / 30}%`,
                  }}
                  transition={{ type: "linear" }}
                  animate={{ bottom: Number(information.altitude) / 7 }}
                />
              </div>
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
                    transform: `rotate(${Number(information.hsi)}deg)`,
                  }}
                  animate={{ rotate: -Number(information.hsi) }}
                >
                  <p className="absolute top-0">0</p>
                  <p className="absolute bottom-0">180</p>
                  <p className="absolute right-1">90</p>
                  <p className="absolute left-1">270</p>
                </motion.div>
              </div>
              <div
                className="h-[340px] w-[340px] border-gray-500 border-4 rounded-full"
                //if adi is 100  so the background is blue and if adi is -100 so the background is green and if adi is 0 so the background is half blue and half green
                style={{
                  backgroundColor: calculateBackgroundColor(),
                  backgroundImage:
                    information.adi == "0"
                      ? "linear-gradient(blue 0%, blue 50%, green 50%,green 100%)"
                      : "none",
                }}
              />
            </>
          ) : (
            <>
              <div>{information?.altitude}</div>
              <div>{information?.hsi}</div>
              <div>{information?.adi}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
// style={{ bottom : `${altitudePlace}%`}}
//style={{
//transform: `rotate(${Number(information  hsi)}deg)`,
//}}
