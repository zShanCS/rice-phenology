import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, ImageOverlay, useMap, useMapEvents, Circle, } from "react-leaflet";
import BaseLayout from '../../components/BaseLayout/BaseLayout';

import Sidebar from '../../components/zMapboxSidebar';
import { useRouter } from 'next/router'
import "leaflet/dist/leaflet.css";
import { latLng } from 'leaflet';
import L from 'leaflet'
import { mosaic_data } from './api/alldata';


const Explore = () => {

    const router = useRouter();


    const [variant, setVariant] = useState(router.query['variant'] && mosaic_data[router.query['variant']] ? router.query['variant'] : 'Kainat');
    const [date, setDate] = useState(router.query['date'] ?? Object.getOwnPropertyNames(mosaic_data[variant])[0]);
    const [filter, setFilter] = useState(['NDVI', 'SAVI', 'MSAVI'].includes(router.query['filter']) ? router.query['filter'] : 'NDVI');


    const [opacity, setOpacity] = useState(0.8);

    function handleOpacityChange(event) {
        setOpacity(event.target.value);
    }

    console.log(JSON.stringify({ variant, date, filter }))

    function MapFly({ overlayBounds }) {
        const map = useMap();
        map.flyTo(latLng(overlayBounds[0][0], overlayBounds[0][1]), 18);

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
        onVariablesChange({ variant, date, filter })
    }, [variant, date, filter]);


    function onVariablesChange({ variant, date, filter }) {

        // update the query params
        const query = {
            variant: variant,
            date: date,
            filter: filter,
        };
        router.push({
            pathname: '/explore',
            query: query,
        });

    }
    
    const [mylatLng, setLatLng] = useState([32.33994977092287, 72.53458678722383]);

    function Location() {

        const map = useMapEvents({
            click: (e) => { navigator.clipboard.writeText([...Object.values(e.latlng)]); console.log(Object.values(e.latlng)); setLatLng([e.latlng.lat, e.latlng.lng]) }
        })
    }

    return (
        <BaseLayout title={"Explore"} footer={false} allowFullScreen={true} showTopBar={false}>

            <MapContainer
                style={{ width: '100vw', height: '100vh' }}
                attributionControl={false}
                center={[32.33925700144764, 72.5339985983349]}
                zoom={16}
                zoomControl={false}
                scrollWheelZoom={true}
            >
                <TileLayer

                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                {mosaic_data[variant][date] && (
                    <>
                        <ImageOverlay
                            url={mosaic_data[variant][date]['mosaic'][`${filter.toLowerCase()}_src`]}
                            bounds={mosaic_data[variant][date]['mosaic']['overlayBounds']}
                            opacity={opacity}
                        />
                        <MapFly overlayBounds={mosaic_data[variant][date]['mosaic']['overlayBounds']} />


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
                                        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor

                                    })}>
                                    <Tooltip>This Region seems healtheir than the average</Tooltip>
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
                                        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor

                                    })}>
                                    <Tooltip>This Region seems to be suffering from stunted growth</Tooltip>
                                </Marker>
                            )
                        })}
                    </>
                )
                }


                <Marker
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
                </Marker>

                <Location />
            </MapContainer>

            <div className="non-map-body">
                <Sidebar variant={variant} setVariant={setVariant} date={date} setDate={setDate} filter={filter} setFilter={setFilter} variants={Object.getOwnPropertyNames(mosaic_data)} dates={Object.getOwnPropertyNames(mosaic_data[variant])} filters={['NDVI', 'SAVI', 'MSAVI']} />

                {
                    mosaic_data[variant][date] &&
                    <>
                        <div className="fixed top-2 left-1/2 -translate-x-1/2 rounded-xl text-xl text-white bg-black bg-opacity-30 backdrop-filter backdrop-blur-md px-3 py-3 z-20 ">
                            <h1>Growth Stage: {mosaic_data[variant][date]['stage']}</h1>
                            <div onClick={(e) => { let dates = Object.getOwnPropertyNames(mosaic_data[variant]); let curr = dates.indexOf(date); let next = dates[curr - 1]; if (next) { setDate(next) } }} className={` ${Object.getOwnPropertyNames(mosaic_data[variant]).indexOf(date) == 0 ? 'hidden' : 'cursor-pointer'}  absolute top-1/2 -left-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-40 px-3 py-2  backdrop-filter backdrop-blur-md `}>
                                ◀
                            </div>
                            <div onClick={(e) => { let dates = Object.getOwnPropertyNames(mosaic_data[variant]); let curr = dates.indexOf(date); let next = dates[curr + 1]; if (next) { setDate(next) } }} className={`  ${Object.getOwnPropertyNames(mosaic_data[variant]).indexOf(date) == Object.getOwnPropertyNames(mosaic_data[variant]).length - 1 ? 'hidden' : 'cursor-pointer'} cursor-pointer absolute top-1/2 -right-16 -translate-x-1/2 rotate-180 -translate-y-1/2 rounded-full bg-black bg-opacity-40 px-3 py-2  backdrop-filter backdrop-blur-md `}>
                                ◀
                            </div>
                        </div>

                        <div className="fixed top-2 right-2  rounded-xl bg-gray-100 bg-opacity-30 backdrop-filter backdrop-blur-md px-1 py-1 z-20 text-black">
                            <img src={mosaic_data[variant][date]['mosaic'][`${filter.toLowerCase()}_legend`]} alt="" srcset="" />
                        </div>

                        <div className="fixed bottom-2  left-1/2 -translate-x-1/2  w-50 flex items-center justify-center rounded-lg  bg-gray-100 bg-opacity-30 backdrop-filter backdrop-blur-md px-5 py-1 z-20 text-black">
                            <label className='mr-2 mb-1'>Opacity </label>
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
                    </>

                }
            </div>
        </BaseLayout >

    );
}

export default Explore;