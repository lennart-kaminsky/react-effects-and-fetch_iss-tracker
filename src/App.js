import { useState, useEffect } from "react";
import Controls from "./components/Controls";
import Map from "./components/Map";
import "./styles.css";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

export default function App() {
  const [coords, setCoords] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => getISSCoords(), 5000);
    console.log("timer installed");

    return () => {
      console.log("ID: ", timer);
      clearInterval(timer);
    };
  }, []);

  async function getISSCoords() {
    const response = await fetch(URL);
    const data = await response.json();

    setCoords({ longitude: data.longitude, latitude: data.latitude });
    console.log("getISSCoords ausgeführt");
  }

  return (
    <main>
      <Map longitude={coords.longitude} latitude={coords.latitude} />
      <Controls
        longitude={coords.longitude}
        latitude={coords.latitude}
        onRefresh={getISSCoords}
      />
    </main>
  );
}
