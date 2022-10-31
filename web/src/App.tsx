import Logo108 from "./assets/Bamza_108.png";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context";

import { api } from "./services/api";

import { VisualMode } from "./components/VisualMode";
import { TextMode } from "./components/TextMode";

type InformationResponse = {
  altitude: string;
  hsi: string;
  adi: string;
};

function App() {
  const [information, setInformation] = useState<InformationResponse>({
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
        const data: InformationResponse = JSON.parse(e.data);

        setInformation(data);
      });

      setListening(true);
    }
  }, [listening, information]);

  //if adi is 100  so the background is blue and if adi is -100 so the background is green and if adi is 0 so the background is half blue and half green

  return (
    <div className="App">
      <div className="bg-cyan-900 h-auto lg:h-screen w-screen flex items-center justify-center relative">
        <div className="absolute h-20 w-20 right-0 top-0 min-[450px]:z-10 m-8">
          <img src={Logo108} alt="logo" />
        </div>
        <div className="w-screen max-w-[1600px]  lg:h-4/5 bg-cyan-500 gap-10 mx-10 rounded-lg flex flex-col lg:flex-row justify-around items-center relative">
          <div className="flex gap-5 lg:absolute top-0 m-5 font-bold">
            <button
              onClick={() => setIsVisual(true)}
              className={`px-8 py-4 rounded-sm ${
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
            <VisualMode
              altitude={information.altitude}
              hsi={information.hsi}
              adi={information.adi}
            />
          ) : (
            <TextMode
              altitude={information.altitude}
              hsi={information.hsi}
              adi={information.adi}
            />
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
