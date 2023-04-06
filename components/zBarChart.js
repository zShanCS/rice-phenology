import React, { useState, useEffect } from "react";
import { layersData } from "@/pages/api/alldata";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import axios from "axios";

const Barchart = ({width=600, layer='NDVI'}) => {
  const [data, setData] = useState([]);


  const genData = async (layer) => {
    
    console.log(layersData[layer]);
    setData(layersData[layer]);
  };


  useEffect(() => {
    console.log("useEffect");
    genData(layer);
  }, [layer]);

  return (
      <BarChart width={width} height={300} data={data}>
        <defs>
          <linearGradient id="bg-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CF9014" />
            <stop offset="100%" stopColor="#337D35" />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" tick={{fill:'white'}}  />
        <YAxis tick={{ fill: 'white' }} />
        <CartesianGrid strokeDasharray="3 3"  />
        <Tooltip cursor={{fill: 'transparent'}} />
        <Legend className="text-white" />
        <Bar dataKey={layer} fill="url(#bg-gradient)" />
      </BarChart>
  );
};

export default Barchart;
