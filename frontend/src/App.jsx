import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Charts from "./components/chart/Chart";
import Form from "./components/form/Form";

export const BASE_URL = {
  endPoint: "http://localhost:3000/api",
};
const App = () => {
  const [temperatures, setTemperatures] = useState([]);
  const [humitidies, setHumidities] = useState([]);


  const fetchedData = async () => {
    try {
      const response = await fetch(`${BASE_URL.endPoint}/devices-graph?device_uid=12345`);
      const data = await response.json();
      setHumidities(data.humidityReadings)
      setTemperatures(data.temperatureReadings)
    } catch (error) {
      console.error(error.message)
    }
  };

  useEffect(() => {
    fetchedData();
  }, []);

  return (
    <div>
      <Form />
      <Charts temperatures={temperatures} humitidies={humitidies} />
    </div>
  );
};

export default App;
