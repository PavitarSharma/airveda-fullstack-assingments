import { useState } from "react";
import Chart from "react-apexcharts";
import "./Chart.css"

const Charts = ({ humitidies, temperatures }) => {
  const [state, setState] = useState({
    options: {
      colors: ["#E91E63", "#FF9800"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: temperatures?.map(reading => reading.timestamp),
      },
      
    },
    series: [
      {
        name: 'Temperature',
        data: temperatures?.map(reading => reading.temperature),
      },
      {
        name: "Humidity",
        data: humitidies?.map(reading => reading.humidity),
      },
    ],
  });

  return (
    <div className="chart">
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        width="800"
        height= '500px' 
        
      />
     
    </div>
  );
};

export default Charts;
