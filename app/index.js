const express = require('express');

const app = express();

const jitter = 20;

app.get('/metrics', ( req, res ) => {
  const slop = ( jitter / 2 ) - ( Math.random() * jitter )

  const metrics = [
    `custom_metric_scraped ${ 100 + slop }`
  ].join('\n');

  res.status( 200 ).send( metrics )
});

app.listen(3000);
