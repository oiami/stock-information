const axios = require('axios');

function summaryContent(name, data) {
  const title = `*Stock report for ${name} from ${data[0].date} - ${data[data.length - 1].date}*`;
  const titleSection = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: title
    }
  };
  
  let text = '';
  data.forEach(item => {
    text += `${item.date}: Closed at ${item.close} (${item.min} ~ ${item.max})\n`;
  });
  
  const contentSection = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: text
    }
  };
  
  return [titleSection, contentSection];
}

function drawdownContent(data) {
  const titleSection = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'First 3 Drawdowns:'
    }
  };
  
  let text = '';
  data.forEach(item => {
    text += `-${item.drawdown}% (${item.max} on ${item.date} -> ${item.min} on ${item.date})\n`;
  });
  
  const contentSection = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: text
    }
  };
  
  const [max] = data;
  const maxDrawdone = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `Maximum drawdown: -${max.drawdown}% (${max.max} on ${max.date} -> ${max.min} on ${max.date})`
    }
  };
  return [titleSection, contentSection, maxDrawdone];
}

function returnContent(data) {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `Return: ${data.rate} [${data.percent}%] (${data.fromValue} on ${data.startDate} -> ${data.toValue} on ${data.endDate})`
    }
  };
}

async function sendMessage(slackPath, name, summary, drawdown, ret) {
  const sumSection = await summaryContent(name, summary);
  
  const drawdownSection = await drawdownContent(drawdown);
  
  const returnSection = await returnContent(ret);
  
  try {
    const blocks = [...sumSection, ...drawdownSection, returnSection];
    const message = {
      text: 'Stock Report',
      'blocks': blocks
    };
    
    const result = await axios.post(`https://hooks.slack.com/services/${slackPath}`,
      message,
      {
        headers: {
          'Content-type': 'application/json'
        }
      });
    
    return result;
  } catch (err) {
    throw new Error('Cannot post message to Slack');
  }
  
}

module.exports = {
  sendMessage,
  summaryContent,
  drawdownContent,
  returnContent
};