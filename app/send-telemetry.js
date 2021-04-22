const axios = require('axios');

let triggerAlert = true;

setInterval( () => triggerAlert = !triggerAlert, 60e3 * 2 );

const jitter = 20;

const promscales = [
  'http://localhost:9201/write',
  'http://localhost:9202/write'
];

const sendTelemetry = async() => {
  try {
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
            cluster: 'app',
            '__replica__': 'app1'
          },
          samples: [
            [ new Date().getTime(), 100 + slop + (triggerAlert ? 50 : -50) ]
          ]
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch ( ex ) {
    console.log( ex );
  }
};

setInterval( sendTelemetry, 2000 );
