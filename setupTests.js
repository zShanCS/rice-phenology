const { generateFourMonthsData, generateSevenDaysData, generateOneMonthData } = require('./utils/GenerateConsumptionData'); // replace 'yourFile' with the actual file name


describe('Data generation functions', () => {
  it('generateFourMonthsData should return an array with the length equal to the number of days in the last three months', () => {
    const result = generateFourMonthsData();
    let date = new Date();
    let daysInLastThreeMonths = 0;
    for (let i = 2; i >= 0; i--) {
      let monthAgo = new Date();
      monthAgo.setMonth(date.getMonth() - i);
      daysInLastThreeMonths += new Date(monthAgo.getFullYear(), monthAgo.getMonth() + 1, 0).getDate();
    }
    expect(result).toHaveLength(daysInLastThreeMonths);
  });

  it('generateSevenDaysData should return an array with 8 elements', () => {
    const result = generateSevenDaysData();
    expect(result).toHaveLength(8);
  });

  it('generateOneMonthData should return an array with 31 elements', () => {
    const result = generateOneMonthData();
    expect(result).toHaveLength(31);
  });

  it('all functions should return an array of objects with date and consommation properties', () => {
    const functions = [generateFourMonthsData, generateSevenDaysData, generateOneMonthData];
    functions.forEach((func) => {
      const result = func();
      result.forEach((item) => {
        expect(item).toHaveProperty('date');
        expect(item).toHaveProperty('consommation');
      });
    });
  });
});
