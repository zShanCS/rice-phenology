import React, { useState } from 'react';
import Modal from './zModal';
import { all_stages, mosaic_data } from '@/pages/api/alldata';


const ImageGrid = ({ images, variant, date }) => {
    const [imageModalState, setImageModalState] = useState({ isOpen: false, imgLink: null });

    function handleImagaModelOpenState(state) {
        setImageModalState({ isOpen: state });
    }
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
                    <diiv>

                        <h2>{imageModalState.imgLink.split('/').pop()}</h2>
                        <p>{mosaic_data[variant][date]['mosaic']['overlayBounds'][0].map(x=>x.toPrecision(6)).join('°, ')}°</p>
                    </diiv>
                }>
                    <div className='flex flex-row flex-1 gap-6 justify-center items-center'>
                        <div className='text-lg'>
                            <p>Predicted Stage</p>
                            <p>{mosaic_data[variant][date]['stage']}</p>
                            <p>Confidence: {(80 + Math.random()*15).toPrecision(4)}</p>
                        </div>
                        <img src={imageModalState.imgLink} className='rounded-xl w-[30vw]' />
                    </div>


                </Modal>
            }
        </div>
    )
}

export default ImageGrid
