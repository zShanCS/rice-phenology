import Head from "next/head";
import Map from "../../components/Home";
import React, { useState } from "react";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import dynamic from "next/dynamic";
import { FaChartBar, FaChartPie } from "react-icons/fa";
import Card from "../../components/card";
import Barchart from "../../components/zBarChart";

const DynamicPieChart = dynamic(
  () => import("../../components/Charts/PieChart"),
  { ssr: false }
);
const DynamicBarChart = dynamic(
  () => import("../../components/Charts/BarChart"),
  { ssr: false }
);

const Index = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [selectedDate, setSelectedDate] = useState("2022-06-25");
  const [selectedCropType, setSelectedCropType] = useState("");

  const handleRadioChange = (event) => {
    setSelectedIndex(Number(event.target.value));
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedCropType("");
    if(event.target.value === "2022-07-19") {
      setSelectedCropType("SK");
    }
  };

  const handleCropTypeChange = (event) => {
    setSelectedCropType(event.target.value);
  };

  const layers = [
    { name: "NDVI", layer: "NDVI" },
    { name: "SAVI", layer: "SAVI" },
    { name: "AVI", layer: "AVI" },
  ];
  const dates = [
    { date: "2022-06-25" },
    { date: "2022-07-06" },
    { date: "2022-07-19" },
    { date: "2022-08-27" },
    { date: "2022-09-10" },
  ];
  const cropTypes = [{ name: "" }, { name: "SK" }];

  return (
    <BaseLayout title="Home" footer={false}>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="w-full md:w-2/3">
          <div className="w-full flex space-x-9">
            <Card title={"Fields"} number={11} />
            <Card title={"Jobs active"} number={76} icon="fire" />
            <Card title={"Jobs due"} number={17} icon="time" />
            <Card title={"Jobs done"} number={12} icon="done" />
          </div>
          <div className=" bg-white shadow-lg h-full">
            <Map
              selectedLayer={layers[selectedIndex].layer}
              date={selectedDate}
              cropType={selectedCropType}
            />
          </div>
          <div className="bg-black font-sans  bg-opacity-25 mt-5 pt-5  shadow-lg px-6 mb-6 md:ml-6">
            <h3 className="text-xl font-bold mb-5 flex items-center text-white ">
              <FaChartBar className="inline-block mr-2" />
              Crop Growth (Change of {layers[selectedIndex].name} over time)
            </h3>
            <Barchart layer={layers[selectedIndex].name}/>
          </div>
        </div>
        <div className="flex flex-col font-sans w-1/3">
        <div className="bg-black bg-opacity-50 text-white shadow-lg px-6 md:ml-6 mt-5">
            <div className="border-black border-dotted p-4 mt-4">
              <h3 className="text-lg font-bold mb-2 ">Select layer:</h3>
              {layers.map((layer, index) => (
                <div key={index} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="layer"
                      value={index}
                      checked={selectedIndex === index}
                      onChange={handleRadioChange}
                      className="form-radio h-5 w-5 text-green-500"
                    />
                    <span className="ml-2 text-slate-200">{layer.name}</span>
                  </label>
                </div>
              ))}
              <h3 className="text-lg font-bold my-2 ">Select date:</h3>
              <div className="relative">
                <select
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="block appearance-none w-full bg-white border text-black border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  {dates.map((date, index) => (
                    <option key={index} value={date.date}>
                      {date.date}
                    </option>
                  ))}
                </select>
              </div>
              <h3 className="text-lg font-bold my-2 ">Crop Type</h3>
              <div className="relative">
                <select
                  value={selectedCropType}
                  onChange={handleCropTypeChange}
                  className="block appearance-none w-full text-black bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline disabled:bg-gray-200 disabled:text-black"
                  disabled={selectedDate === "2022-06-25"||selectedDate === "2022-09-10"||selectedDate === "2022-07-19"?true:false}
                >
                  {cropTypes.map((cropType, index) => (
                    <option key={index} value={cropType.name}>
                      {cropType.name==="SK"?"Super Kernel":"None"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="bg-black bg-opacity-25 shadow-lg px-6 md:ml-6 mt-5">
            <h3 className="text-2xl mt-5 font-bold mb-2 text-white flex items-center">
              <FaChartPie className="inline-block mr-2" />
              Crop Distribution
            </h3>
            <DynamicPieChart />
          </div>

        </div>
      </div>
    </BaseLayout>
  );
};

export default Index;
