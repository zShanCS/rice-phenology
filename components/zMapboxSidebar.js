import { useState } from "react";
import { mosaic_data } from "@/pages/api/alldata";
import { useRouter } from "next/router";

const Sidebar = ({ variant, setVariant, date, setDate, filter, setFilter, variants, dates, filters }) => {

  const handleVariantChange = (value) => {
    setVariant(value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return (
    // <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-md z-10">
    <div className="fixed left-2 top-1/2 -translate-y-1/2  w-64 rounded-xl bg-slate-800 bg-opacity-30 backdrop-filter backdrop-blur-md px-4 py-4 z-20 text-black">
      <h1 className="text-xl mb-8 text-white text-center p-3">Explore Rice Dataset</h1>
      <div className="mb-4">
        <label htmlFor="variant" className="block font-medium mb-2">
          Rice Category
        </label>
        <div className="flex gap-1 mt-2">
          {variants.map((v) => (
            <div key={v} onClick={(e) => { handleVariantChange(v) }} className={`${variant == v ? 'bg-gray-200 text-black' : 'border-2 border-gray-200 text-white'} cursor-pointer  hover:text-black hover:bg-gray-200 flex-1 text-sm text-center flex align-middle items-center justify-center h-10 rounded-md  `}>
              {v}
            </div>
          ))}
        </div>

      </div>
      {date && <div className="mb-4">
        <label htmlFor="date" className="block font-medium mb-2">
          Collection Date
        </label>
        <select
          name="date"
          id="date"
          className="w-full p-2 rounded border-gray-200 bg-white bg-opacity-70 backdrop-filter backdrop-blur-md "
          value={date}
          onChange={(e) => { handleDateChange(e.target.value) }}
        >
          {dates.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>}
      {filters && <div className="mb-4">
        <label htmlFor="filter" className="block font-medium mb-2">
          Vegetation Index
        </label>
        {/* <select
          name="filter"
          id="filter"
          className="w-full p-2 rounded border-gray-200 focus:outline-none focus:ring focus:ring-gray-400"
          value={filter}
          onChange={handleFilterChange}
        >
          {filters.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select> */}

        <div className="flex gap-1 mt-2">
          {filters.map((f) => (
            <div key={f} onClick={(e) => { handleFilterChange(f) }} className={`${filter == f ?'bg-gray-200 text-black' : 'border-2 border-gray-200 text-white'} cursor-pointer  hover:text-black hover:bg-gray-200 flex-1 text-sm text-center flex align-middle items-center justify-center h-10 rounded-md  `}>
              {f}
            </div>
          ))}
        </div>
      </div>

      }
    </div>
    // </div>
  );
};

export default Sidebar;
