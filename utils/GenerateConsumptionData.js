function generateFourMonthsData() {
    let today = new Date();
    let temp_data = [];
    const max = 957 * 1.3 + 50;
    const min = 957 * 1.3 - 50;

    for (let i = 2; i >= 0; i--) {
        let monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - i);
        let daysInMonth = new Date(monthAgo.getFullYear(), monthAgo.getMonth() + 1, 0).getDate();
        for (let j = 1; j <= daysInMonth; j++) {
            let date = new Date(monthAgo.getFullYear(), monthAgo.getMonth(), j);
            let consumption = 0;

            let dateString = date.getDate().toString().padStart(2, "0") + "/" + (date.getMonth() + 1).toString().padStart(2, "0");


            if (date < today) {
                if (date.getDay() == 0 || date.getDay() == 6) {
                    consumption = Math.floor(Math.random() * 10);
                } else if (date.getDay() == 5) {
                    consumption = Math.floor(Math.random() * (max - min + 1) + min) - 300;
                } else if (date.getDay() == 3) {
                    consumption = Math.floor(Math.random() * (max - min + 1) + min) - 150;
                }
                else {
                    consumption = Math.floor(Math.random() * (max - min + 1) + min);
                }
            } else {
                consumption = 3;
            }

            temp_data.push({ date: dateString, consommation: consumption });
        }
    }

    return temp_data;
}

function generateSevenDaysData() {
    let today = new Date();
    let temp_data = [];
    const max = 957 * 1.3 + 50;
    const min = 957 * 1.3 - 50;

    for (let i = 7; i >= 0; i--) {
        let dayAgo = new Date();
        dayAgo.setDate(today.getDate() - i);
        let consumption = 0;

        let dateString = dayAgo.getDate().toString().padStart(2, "0") + "/" + (dayAgo.getMonth() + 1).toString().padStart(2, "0");

        if (dayAgo < today) {
            if (dayAgo.getDay() == 0 || dayAgo.getDay() == 6) {
                consumption = Math.floor(Math.random() * 10);
            } else if (dayAgo.getDay() == 5) {
                consumption = Math.floor(Math.random() * (max - min + 1) + min) - 300;
            } else if (dayAgo.getDay() == 3) {
                consumption = Math.floor(Math.random() * (max - min + 1) + min) - 150;
            }
            else {
                consumption = Math.floor(Math.random() * (max - min + 1) + min);
            }
        } else {
            consumption = 3;
        }

        temp_data.push({ date: dateString, consommation: consumption });
    }

    return temp_data;
}

function generateOneMonthData(){
    let today = new Date();
    let temp_data = [];
    const max = 957 * 1.3 + 50;
    const min = 957 * 1.3 - 50;

    for (let i = 30; i >= 0; i--) {
        let dayAgo = new Date();
        dayAgo.setDate(today.getDate() - i);
        let consumption = 0;

        let dateString = dayAgo.getDate().toString().padStart(2, "0") + "/" + (dayAgo.getMonth() + 1).toString().padStart(2, "0");

        if (dayAgo < today) {
            if (dayAgo.getDay() == 0 || dayAgo.getDay() == 6) {
                consumption = Math.floor(Math.random() * 10);
            } else if (dayAgo.getDay() == 5) {
                consumption = Math.floor(Math.random() * (max - min + 1) + min) - 300;
            } else if (dayAgo.getDay() == 3) {
                consumption = Math.floor(Math.random() * (max - min + 1) + min) - 150;
            }
            else {
                consumption = Math.floor(Math.random() * (max - min + 1) + min);
            }
        } else {
            consumption = 3;
        }

        temp_data.push({ date: dateString, consommation: consumption });
    }

    return temp_data;
}




// export { generateFourMonthsData, generateSevenDaysData, generateOneMonthData };
module.exports = { generateFourMonthsData, generateSevenDaysData, generateOneMonthData };
