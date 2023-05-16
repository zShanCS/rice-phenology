import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, ImageOverlay, useMap, useMapEvents, Circle, } from "react-leaflet";
import BaseLayout from './BaseLayout/BaseLayout';

import Sidebar from './zMapboxSidebar';
import { useRouter } from 'next/router'
import "leaflet/dist/leaflet.css";
import { latLng } from 'leaflet';
import L from 'leaflet'
import { ideal_stages, mosaic_data } from '../src/pages/api/alldata';


import { WiHail } from 'react-icons/wi/';
import { BsArrowsFullscreen, BsFullscreenExit } from 'react-icons/bs/';

import { BsFire } from 'react-icons/bs';

import { GiSandsOfTime } from 'react-icons/gi';

import { TbDrone } from 'react-icons/tb';
import { BiMapPin, BiTimeFive } from 'react-icons/bi';
import Modal from './zModal';
import TimeComparisonChart from './zTimeComparisonChart';
import { generateTimeTakenData, generateFilterData } from '../utils/GenerateData';
import FilterComparisonChart from './zFilterComparisonChart';
import ImageGrid from './ImageGrid';
import { images_links } from '@/pages/api/images_links';
import { FaMountain } from 'react-icons/fa';
import { TbPlaneTilt, TbWorldLatitude, TbWorldLongitude, } from 'react-icons/tb';
import { GiLobArrow } from 'react-icons/gi';
import { image_details } from '@/pages/api/image_details';


function MapFly({ overlayBounds, overZoom = false }) {
    const map = useMap();
    map.flyTo(L.latLngBounds(overlayBounds).getCenter(), overZoom ? 19 : 18);
}


const Explore = () => {

    const router = useRouter();


    const [variant, setVariant] = useState(router.query['variant'] && mosaic_data[router.query['variant']] ? router.query['variant'] : 'Kainat');
    const [date, setDate] = useState(router.query['date'] ?? Object.getOwnPropertyNames(mosaic_data[variant])[0]);
    const [filter, setFilter] = useState(['NDVI', 'SAVI', 'MSAVI'].includes(router.query['filter']) ? router.query['filter'] : 'NDVI');

    const [modalState, setModalState] = useState({ isOpen: false, timeGraph: true });
    const [isAboutModalOpen, setAboutModalOpen] = useState(true);
    const [isExploreImagesModalOpen, setExploreImagesModalOpen] = useState(false);
    const [opacity, setOpacity] = useState(0.8);
    const [overZoom, setOverZoom] = useState(false);

    const [imageMarkers, setImageMarkers] = useState([]);

    function addImageMarker(newMarker) {
        console.log(imageMarkers);
        if (imageMarkers.filter(m => m.url == newMarker.url).length > 0) {
            console.log('Marker Already Present');
            isExploreImagesModalOpen ? setExploreImagesModalOpen(false) : {};
            return;
        }
        setImageMarkers([...imageMarkers, newMarker]);
        setExploreImagesModalOpen(false);
    }
    function handleOpacityChange(event) {
        setOpacity(event.target.value);
    }
    console.log(mosaic_data);
    console.log(JSON.stringify({ variant, date, filter }))

    function setModalOpen(state) {
        setModalState({ isOpen: state });
    }
    function getKey() {
        return Object.keys(image_details).filter(k => k.toLowerCase().includes(variant.replace(' ', '_').toLowerCase()) && k.includes(date))[0];
    }

    //if some date doesnt exists -> use first date
    useEffect(
        () => {
            if (!mosaic_data[variant][date])
                setDate(Object.getOwnPropertyNames(mosaic_data[variant])[1]);
        },
        [variant]
    );

    useEffect(() => {
        setImageMarkers([]);
        setOverZoom(false);
        onVariablesChange({ variant, date, filter })
    }, [variant, date, filter]);

    useEffect(() => {
        setOverZoom(false);
    }, [opacity]);
    function onVariablesChange({ variant, date, filter }) {

        // update the query params
        const query = {
            variant: variant,
            date: date,
            filter: filter,
        };
        router.push({
            pathname: '/',
            query: query,
        });

    }

    // function MapInteraction() {
    //     const map = useMapEvents({
    //         click: (e) => {
    //             // navigator.clipboard.writeText([...Object.values(e.latlng)]);
    //             console.log(Object.values(e.latlng));
    //             let isInside = L.latLngBounds(mosaic_data[variant][date]['mosaic']['overlayBounds']).overlaps(e.latlng.toBounds(0.0000000000001));
    //             // console.log('isInide', isInside);
    //             if (isInside) {
    //                 let distances = image_details[getKey()].map(k => { return { ...k, dist: e.latlng.distanceTo(L.latLng(k.Lat, k.Lon)) } });
    //                 // console.log({distances});
    //                 let sorted_distances = distances.sort((a, b) => a.dist - b.dist);
    //                 // console.log({sorted_distances});
    //                 console.log('closest image', sorted_distances[0]);
    //                 let closest = sorted_distances[0];
    //                 addImageMarker({ ...sorted_distances[0], url: `${variant.toLowerCase().replace(' ', '_')}/${date}/${closest['File Name']}` });
    //             }
    //             else{
    //                 setImageMarkers([]);
    //             }

    //         }
    //     })
    // }

    function timeDiff() {
        if (mosaic_data && mosaic_data[variant] && mosaic_data[variant][date]) {
            let diff = mosaic_data[variant][date]['timeTaken'] - ideal_stages.filter(x => x.name == mosaic_data[variant][date]['stage'])[0]?.ideal_days;
            if (diff > 0) {
                return diff + ' days more than';
            }
            else if (diff < 0) {
                return Math.abs(diff) + ' days less than';
            }
            return 'equal to';
        }
        else {
            return 0;
        }
    }
    return (
        <BaseLayout title={"Explore"} footer={false} allowFullScreen={true} showTopBar={false}>

            <MapContainer
                style={{ width: '100vw', height: '100vh' }}
                attributionControl={false}
                center={[32.33925700144764, 72.5339985983349]}
                zoom={16}
                zoomControl={false}
                markerZoomAnimation={true}
                maxZoom={18}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                // url='http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
                // url = 'https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}'
                // url='http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                // subdomains={["mt0", "mt1", "mt2", "mt3"]}
                // maxZoom={18}
                // tileSize={256}
                // maxZoom={20}
                // maxNativeZoom={20}
                />
                {mosaic_data[variant][date] && (
                    <>
                        <ImageOverlay
                            url={mosaic_data[variant][date]['mosaic'][`${filter.toLowerCase()}_src`]}
                            bounds={mosaic_data[variant][date]['mosaic']['overlayBounds']}
                            opacity={opacity}
                        />
                        <MapFly overZoom={overZoom} overlayBounds={mosaic_data[variant][date]['mosaic']['overlayBounds']} />


                        {mosaic_data[variant][date]['healthy']?.map(latLong => {
                            return (
                                <Marker
                                    key={latLong[0]}
                                    position={latLong}
                                    icon={L.icon({
                                        iconUrl: 'leaf-green.png',
                                        shadowUrl: 'leaf-shadow.png',


                                        iconSize: [38 / 2, 95 / 2], // size of the icon
                                        shadowSize: [50 / 2, 64 / 2], // size of the shadow
                                        iconAnchor: [22 / 2, 94 / 2], // point of the icon which will correspond to marker's location
                                        shadowAnchor: [4 / 2, 62 / 2],  // the same for the shadow
                                        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor

                                    })}>
                                    <Popup>
                                        <p>The NDVI value {(mosaic_data[variant][date]['NDVI'] + 0.1).toPrecision(3)} is greater than the overall average which is {mosaic_data[variant][date]['NDVI']}</p>
                                    </Popup>
                                    <Tooltip>This Region seems healthier than the average. <br></br> <span>Click the leaf see more information</span></Tooltip>
                                </Marker>
                            )
                        })}

                        {mosaic_data[variant][date]['unhealthy']?.map(latLong => {
                            return (
                                <Marker
                                    key={latLong[0]}
                                    position={latLong}
                                    icon={L.icon({
                                        iconUrl: 'leaf-red.png',
                                        shadowUrl: 'leaf-shadow.png',


                                        iconSize: [38 / 2, 95 / 2], // size of the icon
                                        shadowSize: [50 / 2, 64 / 2], // size of the shadow
                                        iconAnchor: [22 / 2, 94 / 2], // point of the icon which will correspond to marker's location
                                        shadowAnchor: [4 / 2, 62 / 2],  // the same for the shadow
                                        popupAnchor: [0, -0] // point from which the popup should open relative to the iconAnchor

                                    })}>

                                    <Popup>
                                        <p>The NDVI value is close to {(mosaic_data[variant][date]['NDVI'] - 0.2).toPrecision(3)} which is much lesser than the overall average which is {mosaic_data[variant][date]['NDVI']}</p>
                                    </Popup>
                                    <Tooltip>This Region seems to be suffering from stunted growth. <br></br> <span>Click the leaf see more information</span></Tooltip>
                                </Marker>
                            )
                        })}


                        {imageMarkers?.map(imgMarker => {
                            return (
                                <Marker
                                    key={imgMarker.Lat}
                                    position={[imgMarker.Lat, imgMarker.Lon]}
                                    icon={L.icon({
                                        iconUrl: imgMarker.url,
                                        className: 'rounded-full',
                                        // shadowUrl: 'leaf-shadow.png',
                                        iconSize: [30, 30], // size of the icon
                                        // shadowSize: [50 / 2, 64 / 2], // size of the shadow
                                        iconAnchor: [0, 0],
                                        // iconAnchor: [22 / 2, 94 / 2], // point of the icon which will correspond to marker's location
                                        // shadowAnchor: [4 / 2, 62 / 2],  // the same for the shadow
                                        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor

                                    })}>

                                    <Popup>
                                        <img src={imgMarker.url} className='rounded-xl w-[30vw]' />
                                        {/* <h2>{imgMarker['File Name']}</h2> */}
                                        <p className='text-xs flex justify-center gap-2 my-4'>
                                            <span className='flex items-center gap-1'>
                                                <TbWorldLatitude />
                                                Lat: {imgMarker.Lat}°
                                            </span>
                                            <span className='flex items-center gap-1'>
                                                <TbWorldLongitude />
                                                Lon: {imgMarker.Lon}°
                                            </span>


                                        </p>
                                        <p className='text-xs flex justify-evenly'>
                                            <span className='flex items-center gap-1'>
                                                <FaMountain /> Alt: {imgMarker.Alt}m
                                            </span>
                                            <span className='flex items-center gap-1'>
                                                <GiLobArrow />
                                                Roll: {imgMarker.Roll}°
                                            </span>
                                            <span className='flex items-center gap-1'>
                                                <TbPlaneTilt />
                                                Pitch: {imgMarker.Pitch}°
                                            </span>
                                        </p>


                                    </Popup>
                                    {/* <Tooltip>Click To View Image and Details</Tooltip> */}
                                </Marker>
                            )
                        })}
                    </>
                )
                }


                {/* <Marker
                    position={mylatLng}
                    icon={L.icon({
                        iconUrl: 'leaf-orange.png',
                        shadowUrl: 'leaf-shadow.png',


                        iconSize: [38 / 2, 95 / 2], // size of the icon
                        shadowSize: [50 / 2, 64 / 2], // size of the shadow
                        iconAnchor: [22 / 2, 94 / 2], // point of the icon which will correspond to marker's location
                        shadowAnchor: [4 / 2, 62 / 2],  // the same for the shadow
                        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor

                    })}>
                    <Tooltip>This Region is unknown</Tooltip>
                </Marker> */}

                {/* <MapInteraction /> */}
            </MapContainer>

            <div className="non-map-body">
                <Sidebar imagesLen={400} variant={variant} setVariant={setVariant} date={date} setDate={setDate} filter={filter} setFilter={setFilter} variants={Object.getOwnPropertyNames(mosaic_data)} dates={Object.getOwnPropertyNames(mosaic_data[variant])} filters={['NDVI', 'SAVI', 'MSAVI']} setExploreImagesModalOpen={setExploreImagesModalOpen} />

                <div className="fixed bottom-1 left-1 text-white underline hover:border-2 border-white rounded-lg px-1">
                    <a onClick={(e) => setAboutModalOpen(true)} href="#">About</a>
                </div>
                {
                    mosaic_data[variant][date] &&
                    <>
                        <div className="fixed top-2 left-2 rounded-xl text-xl text-white bg-black bg-opacity-30 backdrop-filter backdrop-blur-md px-3 py-3 z-20 ">
                            <h1>{variant} Rice, Sargodha, Pakistan</h1>

                            <p className='text-sm my-1'>{new Date(date).toDateString()}</p>
                            <div className="flex gap-6 mb-1">
                                <p className='text-sm flex flex-row items-center'><BsFire className='mr-1' /> {mosaic_data[variant][date]['temp']} °C</p>
                                <p className='text-sm flex flex-row items-center'><WiHail className='mr-1' /> {mosaic_data[variant][date]['prec']} cm</p>
                            </div>
                            <p className="text-xs">{mosaic_data[variant][date]['mosaic']['overlayBounds'][0].map(x => x.toPrecision(5)).join('°, ')}°</p>

                        </div>

                        <div className="fixed top-2 right-2 w-80 rounded-xl text-xl text-white bg-black bg-opacity-30 backdrop-filter backdrop-blur-md px-6 py-3 z-20 ">
                            <h1>Growth Stage: {mosaic_data[variant][date]['stage']}</h1>
                            <div className="text-xs">
                                <div className='mt-3 border-r-[1px] border-gray-100 border-opacity-50 pr-2'>
                                    <div className="flex justify-between text-base items-center ">
                                        <p>Indices at {mosaic_data[variant][date]['stage']} stage</p>
                                        <div onClick={(e) => { console.log(e); setModalState({ isOpen: true, timeGraph: false }); }} className='border-2 border-white rounded-full hover:bg-white hover:text-black cursor-pointer px-2 py-1 '>
                                            Compare
                                        </div>
                                    </div>
                                    <p className='flex align-middle items-center justify-start'>
                                        <img className='mr-2' height={20} width={20} src="xndvi.png" alt="NDVI" />
                                        NDVI: {mosaic_data[variant][date]['NDVI']}
                                    </p>

                                    <p className='flex align-middle items-center justify-start my-1'>
                                        <img className='mr-2' height={20} width={20} src="savi.png" alt="SAVI" />
                                        SAVI: {mosaic_data[variant][date]['SAVI']}
                                    </p>

                                    <p className='flex align-middle items-center justify-start my-1'>
                                        <img className='mr-2' height={20} width={20} src="msavi.png" alt="MSAVI" />
                                        MSAVI: {mosaic_data[variant][date]['MSAVI']}
                                    </p>
                                </div>


                                <div className='mt-6 border-r-[1px] border-gray-100 border-opacity-50 pr-2'>
                                    <div className="flex justify-between text-base items-center ">
                                        <p className='text-base'>Time Taken at this stage</p>
                                        <div onClick={(e) => { console.log(e); setModalState({ isOpen: true, timeGraph: true }); }} className='border-2 border-white rounded-full hover:bg-white hover:text-black cursor-pointer px-2 py-1 '>
                                            Compare
                                        </div>
                                    </div>

                                    <div className="flex gap-2 my-2">
                                        <p className='text-xs flex flex-row items-center mr-1'> <BiTimeFive /> Time Taken: {mosaic_data[variant][date]['timeTaken']} days</p>
                                        <p className='text-xs flex flex-row items-center mr-1'> <GiSandsOfTime /> Ideal Time: {ideal_stages.filter(x => x.name == mosaic_data[variant][date]['stage'])[0]?.ideal_days} days</p>
                                    </div>

                                    <div className='text-sm'>
                                        <h2> Analysis</h2>
                                        <p className='w-full text-left '>
                                            {timeDiff().includes('equal') ?
                                                ideal_stages.filter(x => x.name == mosaic_data[variant][date]['stage'])[0]?.analysis_equal
                                                :
                                                timeDiff().includes('more') ?
                                                    ideal_stages.filter(x => x.name == mosaic_data[variant][date]['stage'])[0]?.analysis_more
                                                    :
                                                    ideal_stages.filter(x => x.name == mosaic_data[variant][date]['stage'])[0]?.analysis_less
                                            }

                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className=" fixed top-8 left-1/2 -translate-x-1/2 text-white">
                            <div onClick={(e) => { let dates = Object.getOwnPropertyNames(mosaic_data[variant]); let curr = dates.indexOf(date); let next = dates[curr - 1]; if (next) { setDate(next) } }} className={` ${Object.getOwnPropertyNames(mosaic_data[variant]).indexOf(date) == 0 ? 'cursor-not-allowed text-gray-300 text-opacity-20' : 'cursor-pointer text-white'} select-none  absolute top-1/2 -left-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-40 px-3 py-2  backdrop-filter backdrop-blur-md `}>
                                ◀
                            </div>
                            <div onClick={(e) => { let dates = Object.getOwnPropertyNames(mosaic_data[variant]); let curr = dates.indexOf(date); let next = dates[curr + 1]; if (next) { setDate(next) } }} className={`  ${Object.getOwnPropertyNames(mosaic_data[variant]).indexOf(date) == Object.getOwnPropertyNames(mosaic_data[variant]).length - 1 ? 'cursor-not-allowed text-gray-300 text-opacity-20' : 'cursor-pointer text-white'} select-none absolute top-1/2 -right-16 -translate-x-1/2 rotate-180 -translate-y-1/2 rounded-full bg-black bg-opacity-40 px-3 py-2  backdrop-filter backdrop-blur-md `}>
                                ◀
                            </div>

                            <div onClick={() => { setOpacity(opacity + 0.01); }} className='absolute top-1/2 -right-32 -translate-x-1/2 cursor-pointer -translate-y-1/2 rounded-full bg-black bg-opacity-40 px-3 py-2  backdrop-filter backdrop-blur-md'>
                                <BiMapPin size={18} />
                            </div>

                            <div onClick={() => { setOverZoom(!overZoom); }} className='absolute top-1/2 -right-44 -translate-x-1/2 cursor-pointer -translate-y-1/2 rounded-full bg-black bg-opacity-40 px-3 py-2  backdrop-filter backdrop-blur-md'>
                                {overZoom? <BsFullscreenExit/> :  <BsArrowsFullscreen />}
                            </div>

                        </div>


                        <div className="fixed bottom-2 right-2 flex flex-col content-end items-end">
                            <div className="rounded-xl  mb-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md px-1 py-1 z-20 text-black">
                                <img className='h-[150px]' src={mosaic_data[variant][date]['mosaic'][`${filter.toLowerCase()}_legend`]} alt="" />
                            </div>

                            <div className="w-44 flex items-center justify-center rounded-lg  bg-black bg-opacity-30 backdrop-filter backdrop-blur-md px-5 py-1 z-20 text-black">
                                <label className='mr-2 mb-1 text-white'>Opacity </label>
                                <input
                                    type="range"
                                    min="0.0"
                                    max="1.0"
                                    step="0.01"
                                    value={opacity}
                                    onChange={handleOpacityChange}
                                    className="w-full bg-gradient-to-r from-black to-white bg-blur rounded-full h-2 appearance-none focus:outline-none"
                                />
                            </div>
                        </div>
                        <Modal isOpen={modalState.isOpen} setIsOpen={setModalOpen} title={`${modalState.timeGraph ? `Growth Time Analysis of ${variant}` : `Indices Comparison of ${variant} over time`}`}>
                            <div className="flex flex-col justify-center align-middle  items-center gap-3">
                                {/* <Sidebar showVariantOnly={true} absolutePosition={false} variant={variant} setVariant={setVariant} date={date} setDate={setDate} filter={filter} setFilter={setFilter} variants={Object.getOwnPropertyNames(mosaic_data)} dates={Object.getOwnPropertyNames(mosaic_data[variant])} filters={['NDVI', 'SAVI', 'MSAVI']} /> */}
                                <div className="mt-5"></div>
                                {modalState.timeGraph && <TimeComparisonChart data={generateTimeTakenData(mosaic_data, ideal_stages, variant)} />}
                                {!modalState.timeGraph && <FilterComparisonChart data={generateFilterData(mosaic_data, variant)} />}
                            </div>
                        </Modal>
                        <Modal isOpen={isAboutModalOpen} setIsOpen={setAboutModalOpen} title={''} closeText={'Start Exploring'}>
                            {/* <h1 className='text-center px-10 text-xl text-black'>Rice Phenology Project</h1> */}
                            <div class="text-gray py-10 px-4">
                                <div class="max-w-4xl mx-auto">
                                    <h1 class="text-4xl font-bold mb-8 text-center">Rice Phenology Estimation: Explore Dataset</h1>
                                    <div class="container">
                                        <p class="text-lg leading-8 mb-8">Our software is a web-based solution for rice phenology estimation from drone imagery. The purpose of the software is to help farmers monitor the growth stage of their rice crops, identify areas of the field that may require attention, and optimize their yields. The software will use multispectral images captured by a drone, along with machine learning algorithms, to predict the growth stage of the crops and provide valuable insights to farmers.</p>
                                        <p class="text-lg leading-8 mb-8">The benefits of this software include improved crop yields and reduced labor costs for farmers. By using the software to monitor the health of their crops, farmers can identify areas of the field that may require attention and take appropriate action to optimize their yields. The software will also provide a simple and intuitive user interface, making it easy for farmers to access and use the tool.</p>
                                        <h2 class="text-2xl font-bold mb-4">Corporate Goals and Business Strategies</h2>
                                        <p class="text-lg leading-8 mb-8">In terms of corporate goals and business strategies, this software aligns with the goal of providing innovative solutions that improve the efficiency and productivity of agriculture. By developing a tool that can help farmers monitor their crops and optimize their yields, the software will support the growth of the agriculture industry and contribute to the overall success of the company.</p>
                                        <h2 class="text-2xl font-bold mb-4">How It Works</h2>
                                        <p class="text-lg leading-8 mb-8">Our software uses machine learning algorithms to analyze multispectral images captured by a drone and predict the growth stage of rice crops. The software calculates indices such as NDVI and SAVI to estimate crop health and provides farmers with insights that can help them optimize their yields.</p>
                                        <h2 class="text-2xl font-bold mb-4">Key Features</h2>
                                        <ul class="list-disc list-inside mb-8">
                                            <li className='text-lg'>Web-based solution for rice phenology estimation</li>
                                            <li className='text-lg'>Uses multispectral images captured by a drone</li>
                                            <li className='text-lg'>Employs machine learning algorithms to predict growth stage of crops</li>
                                            <li className='text-lg'>Identifies areas of the field that require attention</li>
                                            <li className='text-lg'>Provides valuable insights to farmers</li>
                                            <li className='text-lg'>Improves crop yields and reduces labor costs for farmers</li>
                                            <li className='text-lg'>Simple and intuitive user interface</li>
                                            <li className='text-lg'>Supports the growth of the agriculture industry</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </Modal>
                        <Modal isOpen={isExploreImagesModalOpen} setIsOpen={setExploreImagesModalOpen} title={
                            <>

                                <h1 className='text-center text-3xl'>{variant} Rice</h1>
                                <div className='flex flex-wrap justify-between items-center'>
                                    <p className='text-lg'>Date : {date}</p>
                                    <p className='text-sm flex items-center gap-1'>
                                        <TbDrone /> Captured with DJI Phantom 4 UAV. Sentera Precision NDVI Single Sensor
                                    </p>
                                </div>
                                <p className="text-right text-xs">
                                    Altitude: 230m
                                </p>
                                <p className='text-xs text-gray-600 text-left'>Limited images are shown here in the frontend. For more images, contact developers.</p>
                            </>
                        }>
                            <ImageGrid addImageMarker={addImageMarker} date={date} variant={variant} images={images_links[variant.replace(' ', '_').toLowerCase()][date]['files']} />

                        </Modal>
                    </>

                }
            </div>

        </BaseLayout >

    );
}

export default Explore;
