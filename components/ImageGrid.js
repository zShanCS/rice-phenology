import React, { useState } from 'react';
import Modal from './zModal';
import { all_stages, mosaic_data } from '@/pages/api/alldata';
import { image_details } from '@/pages/api/image_details';
import { FaMountain } from 'react-icons/fa';
import { TbPlaneTilt, TbWorldLatitude, TbWorldLongitude, } from 'react-icons/tb';
import { GiLobArrow } from 'react-icons/gi';
const   ImageGrid = ({ images, variant, date, addImageMarker }) => {
    const [imageModalState, setImageModalState] = useState({ isOpen: false, imgLink: null });

    function handleImagaModelOpenState(state) {
        setImageModalState({ isOpen: state });
    }
    function getKey() {
        return Object.keys(image_details).filter(k => k.toLowerCase().includes(variant.replace(' ', '_').toLowerCase()) && k.includes(date))[0];
    }
    // console.log(getKey(), imageModalState?.imgLink?.split('/').pop());
    const imageDetails = image_details[getKey()].filter(i => i['File Name'].toLowerCase() == imageModalState?.imgLink?.split('/').pop().toLowerCase())[0];
    console.log(imageDetails);
    return (
        <div >
            <div className="h-[65vh] w-[70vw] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
                {images.map((image, index) => (
                    <img onClick={(e) => { setImageModalState({ isOpen: true, imgLink: image }) }} key={index} src={image} className="rounded-lg shadow-md cursor-pointer hover:scale-110 transition-all" />
                ))}
            </div>
            {
                imageModalState.imgLink &&
                <Modal isOpen={imageModalState.isOpen} setIsOpen={handleImagaModelOpenState} title={
                    imageDetails ? <div>
                        <h2>{imageDetails['File Name']}</h2>
                        <p className='text-xs flex justify-center gap-2 my-4'>
                            <span className='flex items-center gap-1'>
                                <TbWorldLatitude />
                                Lat: {imageDetails.Lat}°
                            </span>
                            <span className='flex items-center gap-1'>
                                <TbWorldLongitude />
                                Lon: {imageDetails.Lon}°
                            </span>


                        </p>
                        <p className='text-xs flex justify-evenly'>
                            <span className='flex items-center gap-1'>
                                <FaMountain /> Alt: {imageDetails.Alt}m
                            </span>
                            <span className='flex items-center gap-1'>
                                <GiLobArrow />
                                Roll: {imageDetails.Roll}°
                            </span>
                            <span className='flex items-center gap-1'>
                                <TbPlaneTilt />
                                Pitch: {imageDetails.Pitch}°
                            </span>
                        </p>
                        <button className='my-4 bg-gray-600 hover:bg-gray-900 text-white px-3 py-2 rounded-lg' onClick={(e)=>{console.log(e); addImageMarker({...imageDetails, url:imageModalState.imgLink})}}>
                            📌 View on Map
                        </button>
                    </div>
                        : 'Image Details'
                }>
                    <div className='flex flex-row flex-1 gap-6 justify-center items-center'>
                        <div className='text-lg'>
                            <p>Predicted Stage</p>
                            <p className='text-black'>{mosaic_data[variant][date]['stage']}</p>
                        </div>
                        <img src={imageModalState.imgLink} className='rounded-xl w-[30vw]' />
                    </div>


                </Modal>
            }
        </div>
    )
}

export default ImageGrid
