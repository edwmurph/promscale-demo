const express = require('express');

const app = express();

const jitter = 20;

let triggerAlert = false;

setInterval( () => triggerAlert = !triggerAlert, 60e3 * 2 );

app.get('/metrics', ( req, res ) => {
  const slop = ( jitter / 2 ) - ( Math.random() * jitter );

  const metrics = [
    `custom_metric_scraped ${ 100 + slop + (triggerAlert ? 50 : -50 )}`
  ].join('\n');

  res.status( 200 ).send( metrics )
});

app.listen(3000);
