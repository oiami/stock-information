const axios = require('axios');

function get_end_date(args) {
  const [hyphen, ed, em, ey] = args;
  if (hyphen && (ed && em && ey)) {
    
    const endDate = new Date(`${ed} ${em} ${ey} UTC`);
    
    if (endDate instanceof Date && !isNaN(endDate)) {
      return endDate;
    } else {
      return new Date();
    }
  }
  
  return new Date();
}

async function get(API_KEY, stock, args) {
  const [fd, fm, fy, ...rest] = args;
  const startDate = new Date(`${fd} ${fm} ${fy} UTC`);
  const endDate = get_end_date(rest);

  const result = await axios.get( `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json`, {
    params: {
      api_key: API_KEY,
      start_date: startDate.toISOString(), // YYYY-MM-DD
      end_date: endDate.toISOString(), // YYYY-MM-DD
      order: 'asc'
    }
  });
  return result;
}

module.exports = {
  get_end_date,
  get
};