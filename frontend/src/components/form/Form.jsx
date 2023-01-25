import { useState } from "react";
import { BASE_URL } from "../../App";
import "./Form.css";
import axios from "axios"

const Form = () => {
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name,
        uid,
        temperature,
        humidity,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };

      const response = await fetch(`${BASE_URL.endPoint}/devices`, requestOptions);
      // const data = await response.json();
      alert("Data submitted successfully")
      return response;
    } catch (error) {
      alert("Something went wrong")
      console.error(error.message);
    }
  };
  return (
    <div className="form__container">
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="name">Device Uid</label>
          <input
            type="text"
            name="uid"
            id="uid"
            value={uid}
            onChange={(event) => setUid(event.target.value)}
            placeholder="Enter device Uid"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Device Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter device name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="temperature">Device Temperature</label>
          <input
            type="number"
            name="temperature"
            id="temperature"
            value={temperature}
            onChange={(event) => setTemperature(event.target.value)}
            placeholder="Enter device temperature"
          />
        </div>

        <div className="form-group">
          <label htmlFor="humidity">Device Humidity</label>
          <input
            type="number"
            name="humidity"
            id="humidity"
            value={humidity}
            onChange={(event) => setHumidity(event.target.value)}
            placeholder="Enter device humidity"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
