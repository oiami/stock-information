'use strict';
const request = require('./util/request');
const transformer = require('./util/transform-data');
const slack = require('./util/slack-post-message');

const usage =
  'export API_KEY=apikey && node index.js [stockSymbol] [MMM] [DD] [YYYY] - [MMM] [DD] [YYYY]';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.log('Environment variable API_KEY is required');
  process.exit(1);
}

const SLACK_PATH = process.env.SLACK_PATH;
if (!SLACK_PATH) {
  console.log('Environment variable SLACK_PATH is required to push message to Slack format: T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX');
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


const main = async () => {

  try {
    const { dataset } = await request.get(API_KEY, stock, [fd, fm, fy, ...args]);
    
    if (dataset.data.length === 0) {
      console.log('No available data on specified period');
      process.exit(1);
    }
  
    const summary = transformer.getSummary(dataset);
  
    const drawdown = transformer.calDrawdown(summary);
  
    const ret = transformer.calReturn(summary);
  
    if (SLACK_PATH) {
      await slack.sendMessage(SLACK_PATH, dataset.name, summary, drawdown.slice(0, 3), ret);
    }
    
    console.log('Done!');
  } catch (e) {
    console.log('Cannot query data');
  }
};

main();

module.exports = main;