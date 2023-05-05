import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ImageOverlay, useMap, } from "react-leaflet";
import BaseLayout from '../../components/BaseLayout/BaseLayout';

import Sidebar from '../../components/zMapboxSidebar';
import { useRouter } from 'next/router'
import "leaflet/dist/leaflet.css";
import { latLng } from 'leaflet';

import { mosaic_data } from './api/alldata';


const Explore = () => {


    const [variant, setVariant] = useState('Kainat');
    const [date, setDate] = useState(Object.getOwnPropertyNames(mosaic_data[variant])[0]);
    const [filter, setFilter] = useState('NDVI');

    console.log(JSON.stringify({ variant, date, filter }))

    function MapFly({ overlayBounds }) {
        console.log(overlayBounds)
        const map = useMap();
        setTimeout(
            () => {
                // map.flyTo(latLng(overlayBounds[0][0], overlayBounds[0][1]), 18);
            }, 8000
        )
    }

    const center = [32.0835, 72.6715];

    const router = useRouter();


    let overlayBounds = [
        [32.339026750942125, 72.53446255340462],
        [32.34037087740836, 72.53530713261662],
    ];
    let overlayUrl = "mosaics/ndvi/220910.png";
    let opacity = '0.8';


    useEffect(
        () => {
            if (!mosaic_data[variant][date])
                setDate(Object.getOwnPropertyNames(mosaic_data[variant])[0]);
        },
        [variant]
    )
    useEffect(() => {

        // This function will be called every time the location changes
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

    return (
        <BaseLayout title={"Explore"} footer={false} allowFullScreen={true} showTopBar={false}>

            <MapContainer
                style={{ width: '100vw', height: '100vh' }}
                attributionControl={false}
                center={[32.33925700144764, 72.5339985983349]}
                zoom={13}
                zoomControl={false}
                scrollWheelZoom={true}
            >
                <TileLayer

                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                {overlayUrl && (
                    <>
                        <ImageOverlay
                            url={overlayUrl}
                            bounds={overlayBounds}
                            opacity={opacity}
                        />
                        <MapFly overlayBounds={overlayBounds} />
                    </>
                )}
            </MapContainer>

            <div className="non-map-body">
                <Sidebar variant={variant} setVariant={setVariant} date={date} setDate={setDate} filter={filter} setFilter={setFilter} variants={Object.getOwnPropertyNames(mosaic_data)} dates={Object.getOwnPropertyNames(mosaic_data[variant])} filters={['NDVI', 'SAVI', 'MSAVI']} onChange={onVariablesChange} />
            </div>
        </BaseLayout>

    );
}

export default Explore;