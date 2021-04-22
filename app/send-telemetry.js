const axios = require('axios');

const jitter = 20;

const sendTelemetry = async() => {
  const slop = ( jitter / 2 ) - ( Math.random() * jitter );

  await axios({
    url: 'http://localhost:9201/write',
    method: 'post',
    data: {
      labels: {
        '__name__': 'custom_metric_pushed',
        test: 'a'
      },
      samples: [
        [ new Date().getTime(), 100 + slop ]
      ]
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

setInterval( sendTelemetry, 2000 );
