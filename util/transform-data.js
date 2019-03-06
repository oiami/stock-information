const moment = require('moment');

function getSummary({ data }){
  const summary = data.map(sum => {
    return {
      date: moment(sum[0]).format('DD.MM.YY'),
      max: sum[2],
      min: sum[3],
      close: sum[4]
    };
  });
  return summary;
}

function calDrawdown(data) {
  const drawdown = data.map(item => {
    const dd = (item.max - item.min) / item.max;
    return Object.assign(item, { drawdown: (dd * 100).toFixed(1) });
  });
  
  const sorted = drawdown.sort((a, b) => {
    return Number.parseFloat(b.drawdown) - Number.parseFloat(a.drawdown);
  });
  
  return sorted;
}

function calReturn(data) {
  const first = data[0];
  const last =  data[data.length - 1];
  const percent = ((last.close - first.close) / first.close) * 100;
  

  
  const returnValue = {
    startDate: first.date,
    endDate: last.date,
    fromValue: first.close,
    toValue: last.close,
    rate: last.close - first.close,
    percent: addLeadingSign(percent)
  };
  
  return returnValue;
}

function addLeadingSign(number) {
  switch(Math.sign(number)) {
  case 1: return `+${number.toFixed(1)}`;
  case -1: return `-${number.toFixed(1)}`;
  case 0:
    return number.toFixed(1);
  }
}

module.exports = {
  getSummary,
  calDrawdown,
  calReturn
};