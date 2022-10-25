import { useState } from "react";
import { api } from "./services/api";

type Response = {
  altitude: number;
  his: number;
  adi: number;
};

function App() {
  const [information, setInformation] = useState<Response>();

  api.get("/").then((response) => setInformation(response.data));
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
