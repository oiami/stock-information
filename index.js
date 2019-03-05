'use strict';

const usage =
  'export API_KEY=apikey && node index.js [stockSymbol] [MMM] [DD] [YYYY] - [MMM] [DD] [YYYY]';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.log('Environment variable API_KEY is required');
  process.exit(1);
}

const [stock, fm, fd, fy, ...args] = process.argv.slice(2);

if (!stock) {
  console.log(`Stock symbol is required example usage: ${usage}`);
  process.exit(1);
}

if (!fm && !fd && !fy) {
  console.log('Start date is required example: Jan 1 2018');
  process.exit(1);
}
