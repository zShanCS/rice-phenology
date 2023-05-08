import { useState } from "react";
import { mosaic_data } from "@/pages/api/alldata";
import { useRouter } from "next/router";

import { TbDrone } from 'react-icons/tb';
import { mosaic_images_used } from "@/pages/api/alldata";

const Sidebar = ({ variant, setVariant, date, setDate, filter, setFilter, variants, dates, filters, absolutePosition = true, showVariantOnly = false, setExploreImagesModalOpen }) => {

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
    <div className={`${absolutePosition ? 'fixed left-2 top-1/2 -translate-y-1/2' : ''}   w-72 rounded-xl bg-black bg-opacity-30 backdrop-filter backdrop-blur-md px-4 py-4 z-20 text-black`}>

      {!showVariantOnly &&
        <div className="flex justify-center items-center w-full border-b-2 mb-3 p-3">
          <h1 className="text-lg text-white text-center">Explore Rice Dataset</h1>
        </div>
      }
      <div className="mb-4">
        <label htmlFor="variant" className="block font-medium mb-2 text-white">
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
      {!showVariantOnly && date && <div className="mb-4">
        <label htmlFor="date" className="block font-medium mb-2 text-white">
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
      {!showVariantOnly && filters && <div className="mb-4">
        <label htmlFor="filter" className="block font-medium mb-2 text-white">
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
            <div key={f} onClick={(e) => { handleFilterChange(f) }} className={`${filter == f ? 'bg-gray-200 text-black' : 'border-2 border-gray-200 text-white'} cursor-pointer  hover:text-black hover:bg-gray-200 flex-1 text-sm text-center flex align-middle items-center justify-center h-10 rounded-md  `}>
              {f}
            </div>
          ))}
        </div>

        <div className="mt-2 text-white text-sm">
          <p className="flex align-middle items-center">

          </p>
        </div>


        <div className="flex justify-between text-base items-center text-white mt-1">
          <p className="flex align-middle items-center">
            Made with {mosaic_images_used[variant][date]}  <TbDrone className="mx-1" color="white" /> images
          </p>
          <div onClick={(e) => { console.log(e); setExploreImagesModalOpen(true); }} className='border-2 border-white rounded-full hover:bg-white hover:text-black cursor-pointer px-2 py-1 '>
            Explore
          </div>
        </div>
      </div>


      }
    </div>
    // </div>
  );
};

export default Sidebar;
