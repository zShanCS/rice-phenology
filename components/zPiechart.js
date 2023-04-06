import React, { useState, useEffect } from "react";
import { Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import axios from "axios";
import { stageData } from "@/pages/api/alldata";

const Piechart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios.post("/api/consumption_data", { val: "7 days" });
      setData(stageData);
    };

    fetchData();
  }, []);

  //colors
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042","#CB6042", 'purple'];

  return (
    <div className="flex-wrap">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={true}
          outerRadius={100}
          innerRadius={70}
          fill="#FFF"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="bottom"
          iconSize={16}
          payload={data.map((entry, index) => ({
            id: entry.name,
            type: "square",
            value: `${entry.name}`,
            color: COLORS[index % COLORS.length]
          }))}
        />
      </PieChart>
    </div>
  );
};

export default Piechart;
