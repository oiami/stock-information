const moment = require('moment');

function getSummary({ data }){
  const summary = data.map(sum => {
    return {
      date: moment(sum[0]).format('DD.MM.YY'),
      max: sum[2],
      min: sum[3],
      close: sum[4]
    }
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
  const first = data.shift();
  const last =  data.pop();
  const percent = ((last.close - first.close) / first.close) * 100;
  
  const returnValue = {
    fromDate: first.date,
    toDate: last.date,
    fromValue: first.close,
    toValue: last.close,
    rate: last.close - first.close,
    percent: percent.toFixed(1)
  };
  
  return returnValue;
}

module.exports = {
  getSummary,
  calDrawdown,
  calReturn
};