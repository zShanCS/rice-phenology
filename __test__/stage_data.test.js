const { addValue, subtractValue, multiplyValue, divideValue, modValue, minValue, maxValue, absValue, ceilValue, floorValue } = require('../utils/util_functions');

describe('Data manipulation functions', () => {
  const mockData = [
    { name: 'Item 1', value: 10 },
    { name: 'Item 2', value: 20 },
  ];

  it('each function should return an array with the same length as the input array', () => {
    const functions = [addValue, subtractValue, multiplyValue, divideValue, modValue, minValue, maxValue, absValue, ceilValue, floorValue];
    const operationValue = 5;
    functions.forEach(func => {
      const result = func(mockData, operationValue);
      expect(result).toHaveLength(mockData.length);
    });
  });

  it('all functions should return an array of objects', () => {
    const functions = [addValue, subtractValue, multiplyValue, divideValue, modValue, minValue, maxValue, absValue, ceilValue, floorValue];
    const operationValue = 5;
    functions.forEach(func => {
      const result = func(mockData, operationValue);
      result.forEach(item => {
        expect(item).toBeInstanceOf(Object);
      });
    });
  });
});
