function generateIdealTimeData(ideal_stages) {
    let data = ideal_stages.map(stage => {
        return {
            name: stage.name,
            ideal_days: stage.ideal_days
        }
    });
    return data;
}

function generateTimeTakenData(mosaic_data, ideal_stages, field) {
    let data = [];
    const myField = Object.keys(mosaic_data).filter(thisField => thisField == field)[0];
    console.log({ myField });
    Object.keys(mosaic_data[myField]).forEach(date => {
        console.log({ date });
        let timeTaken = mosaic_data[field][date].timeTaken;
        let stage = mosaic_data[field][date]['stage'];
        data.push({
            name: stage,
            actual: timeTaken,
            ideal: ideal_stages.filter(x => x.name == stage)[0].ideal_days
        });

    });
    return data;
}

function generateFilterData(mosaic_data, field) {
    let data = [];

    const myField = Object.keys(mosaic_data).filter(thisField => thisField == field)[0];
    console.log({ myField });

    Object.keys(mosaic_data[myField]).forEach(date => {
        let ndvi = mosaic_data[field][date]['NDVI'];
        let savi = mosaic_data[field][date]['SAVI'];
        let msavi = mosaic_data[field][date]['MSAVI'];
        data.push({
            date: date,
            NDVI: ndvi,
            SAVI: savi,
            MSAVI: msavi
        });
    });

    return data;
}

export { generateTimeTakenData, generateFilterData };
