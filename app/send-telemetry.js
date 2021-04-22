const axios = require('axios');

const jitter = 20;

const promscales = [
  'http://localhost:9201/write',
  'http://localhost:9202/write'
];

const sendTelemetry = async() => {
  const slop = ( jitter / 2 ) - ( Math.random() * jitter );

  // send telemetry to all promscale instances but it's only written to postgres once.
  // we could create an elb that forwards to all promscale instances so we only have to
  // send to a single endpoint
  for ( const url of promscales ) {
    await axios({
      url,
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
  }
};

setInterval( sendTelemetry, 2000 );
