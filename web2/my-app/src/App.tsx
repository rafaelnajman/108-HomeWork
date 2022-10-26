import { useEffect, useState } from "react";

type Response = {
  altitude: string;
  his: string;
  adi: string;
};

function App() {
  const [information, setInformation] = useState<Response>();
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource("http://localhost:3000/");
      events.addEventListener("open", () => {
        console.log("Connection opened");
      });

      events.onerror = (error) => {
        console.log("Error", error);
      };

      events.onmessage = (e) => {
        console.log(e.data);
        const data: Response = JSON.parse(e.data);

        setInformation(data);
      };

      setListening(true);
    }
  }, [listening, information]);
  return (
    <div className="App">
      <ul>
        <li>Altitude: {information?.altitude}</li>
        <li>HIS: {information?.his}</li>
        <li>ADI: {information?.adi}</li>
      </ul>
    </div>
  );
}

export default App;
