import { useContext, useEffect, useState } from "react";
import {Context} from "./context";

type Response = {
  altitude: string;
  his: string;
  adi: string;
};

function App() {
  const [information, setInformation] = useState<Response>();
  const [listening, setListening] = useState(false);
  const {isVisual, setIsVisual} = useContext(Context);

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


  return (

    <div className="App">
      <div className="bg-cyan-900 h-screen w-screen flex items-center justify-center">
        <div className="w-screen h-4/5 bg-cyan-500 mx-10 rounded-lg flex justify-around items-center relative">
          <div className="flex flex-col absolute top-0 left-0 m-5 font-bold">
              <button 
                onClick={() => setIsVisual(true)}
                className={`px-8 py-4  rounded-sm mb-3 ${isVisual? "bg-white hover:bg-slate-400"  : "bg-slate-800 hover:bg-slate-600 text-white"} transition-colors` }>
                  Visual
              </button>
              <button 
                onClick={() => setIsVisual(false)}
                className={`px-8 py-4  rounded-sm ${!isVisual? "bg-white hover:bg-slate-400"  : "bg-slate-800 hover:bg-slate-600 text-white"} transition-colors` }>
                  Text
              </button>
          </div>
          
          <div>{information?.altitude}</div>
          <div>{information?.his}</div>
          <div>{information?.adi}</div>
  
          
        </div>
      </div>
    </div>
  );
}

export default App;
