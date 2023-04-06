import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { SK_line_data, Kainat_line_data } from "@/pages/api/alldata";

const Linechart = ({selectedCropType, selectedIndex}) => {
  // const data = [
  //   { name: "Jan", value: 200 },
  //   { name: "Feb", value: 100 },
  //   { name: "Mar", value: 300 },
  //   { name: "Apr", value: 278 },
  //   { name: "May", value: 189 },
  //   { name: "Jun", value: 239 },
  //   { name: "Jul", value: 249 },
  //   { name: "Aug", value: 221 },
  //   { name: "Sep", value: 400 },
  //   { name: "Oct", value: 400 },
  //   { name: "Nov", value: 120 },
  //   { name: "Dec", value: 283 },
  // ];
  const [data, setData] = useState([]);

 

  useEffect(
    ()=>{
      console.log(selectedCropType, selectedIndex)
      if (selectedCropType == 'SK'){
        //super kernel
        
        console.log(SK_line_data)
        setData(SK_line_data)
      }
      else {
        //kainat
        console.log(Kainat_line_data)
        setData(Kainat_line_data)
      }
    },
    [selectedCropType]
  )

  return (
    <LineChart width={500} height={300} data={data}>
      <defs>
      <linearGradient id="bg-gradient1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#833ab4" />
          <stop offset="100%" stopColor="#fd1d1d" />
        </linearGradient>
        <linearGradient id="bg-gradient2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEAC5E" />
          <stop offset="100%" stopColor="#C779D0" />
        </linearGradient>
        <linearGradient id="bg-gradient3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#43cea2" />
          <stop offset="100%" stopColor="#185a9d" />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" tick={{fill:"#fff"}} />
      <YAxis tick={{fill:"#fff"}} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey={'NDVI'}
        stroke="url(#bg-gradient1)"
        activeDot={{ r: 8 }}
        strokeWidth={5}
      />
      <Line
        type="monotone"
        dataKey={'SAVI'}
        stroke="url(#bg-gradient2)"
        activeDot={{ r: 8 }}
        strokeWidth={5}
      />
      <Line
        type="monotone"
        dataKey={'MSAVI'}
        stroke="url(#bg-gradient3)"
        activeDot={{ r: 8 }}
        strokeWidth={5}
      />
    </LineChart>
  );
};

export default Linechart;
