import React, { useState, useEffect } from "react";
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
    
    const jsonData = {

        'NDVI': [
            {
                "date": "07/03",
                "NDVI": 0.1
            },
            {
                "date": "08/03",
                "NDVI": 0.3
            },
            {
                "date": "09/03",
                "NDVI": 0.6
            },
            {
                "date": "10/03",
                "NDVI": 0.8
            }
        ],
        
        'SAVI': [
            {
                "date": "07/03",
                "SAVI": 0.3
            },
            {
                "date": "08/03",
                "SAVI": 0.4
            },
            {
                "date": "09/03",
                "SAVI": 0.5
            },
            {
                "date": "10/03",
                "SAVI": 0.7
            }
        ],
        
        'AVI': [
            {
                "date": "07/03",
                "AVI": 0.1
            },
            {
                "date": "08/03",
                "AVI": 0.2
            },
            {
                "date": "09/03",
                "AVI": 0.3
            },
            {
                "date": "10/03",
                "AVI": 0.3
            }
        ]
    };
    console.log(jsonData[layer]);
    setData(jsonData[layer]);
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
