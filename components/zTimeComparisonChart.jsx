
import React from 'react';

import { LineChart as ChartLineChart, Line as ChartLine, XAxis as ChartXAxis, YAxis as ChartYAxis, CartesianGrid as ChartCartesianGrid, Tooltip as ChartTooltip, Legend as ChartLegend } from 'recharts';
// const data = [
//     {
//         name: 'Germination & Seedling',
//         ideal: 10,
//         actual: 12,
//     },
//     {
//         name: 'Tillering',
//         ideal: 15,
//         actual: 17,
//     },
//     {
//         name: 'Max Booting',
//         ideal: 25,
//         actual: 28,
//     },
//     {
//         name: 'Flowering',
//         ideal: 35,
//         actual: 40,
//     },
//     {
//         name: 'Grain Filling & Ripening',
//         ideal: 45,
//         actual: 50,
//     },
// ];

function TimeComparisonChart({ data }) {
    console.log('data', data);
    return (

        <>
            <ChartLineChart
                width={700}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <ChartCartesianGrid strokeDasharray="3 3" />
                <ChartXAxis dataKey="name" />
                <ChartYAxis  />
                <ChartTooltip />
                <ChartLegend />
                <ChartLine type="monotone" dataKey="ideal" stroke="#8884d8" activeDot={{ r: 4 }} />
                <ChartLine type="monotone" dataKey="actual" stroke="#82ca9d" activeDot={{ r: 4 }} />
            </ChartLineChart>

            <p className='w-full text-center'>X-Axis: Stage, Y-axis: Days</p>
        </>
    );
}

export default TimeComparisonChart;;