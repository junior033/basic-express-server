'use strict';

const errorHandler = require('./error-handlers/500');
const express = require('express');
const stamper = require('./middleware/stamper');

const PORT = process.env.PORT || 3002;

const app = express();

app.get('/', (req, res) => {
  const msg = `hello world`;
  res.status(200).send(msg);
})

app.get('/person', stamper, (req, res, next)=> {

  console.log(req.time);

  if(!req.query.name){
    next();
  }
 const msg = `hello ${req.query.name} `;
 const output = {msg};

  // res.status(200).send(msg);
  res.status(200).json(output);

})

function start(){
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

app.use(errorHandler); 

module.exports = {app, start};