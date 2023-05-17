function addValue(data, valueToAdd) {
    return data.map(item => ({ ...item, value: item.value + valueToAdd }));
  }
  
  function subtractValue(data, valueToSubtract) {
    return data.map(item => ({ ...item, value: item.value - valueToSubtract }));
  }
  
  function multiplyValue(data, valueToMultiply) {
    return data.map(item => ({ ...item, value: item.value * valueToMultiply }));
  }
  
  function divideValue(data, valueToDivide) {
    return data.map(item => ({ ...item, value: item.value / valueToDivide }));
  }
  
  function modValue(data, valueToMod) {
    return data.map(item => ({ ...item, value: item.value % valueToMod }));
  }
  
  function minValue(data) {
    return data.map(item => ({ ...item, value: Math.min(item.value, 50) }));
  }
  
  function maxValue(data) {
    return data.map(item => ({ ...item, value: Math.max(item.value, 50) }));
  }
  
  function absValue(data) {
    return data.map(item => ({ ...item, value: Math.abs(item.value) }));
  }
  
  function ceilValue(data) {
    return data.map(item => ({ ...item, value: Math.ceil(item.value) }));
  }
  
  function floorValue(data) {
    return data.map(item => ({ ...item, value: Math.floor(item.value) }));
  }
  
  module.exports = { addValue, subtractValue, multiplyValue, divideValue, modValue, minValue, maxValue, absValue, ceilValue, floorValue };
  