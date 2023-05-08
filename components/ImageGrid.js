import React from 'react'
import { TbH1 } from 'react-icons/tb'

const ImageGrid = ({ images, variant, date }) => {
    return (
        <div >
            <div className="h-[65vh] w-[70vw] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
                {images.map((image, index) => (
                    <img key={index} src={image} className="rounded-lg shadow-md" />
                ))}
            </div>
        </div>
    )
}

export default ImageGrid
