const express = require('express');
const bodyParser = require('body-parser');
const port = 8000;

const server = express();
server.use(bodyParser.json({strict: false}));
server.use(bodyParser.urlencoded({extended: false}));

/* GET */
server.get('/', (req, res, next) => {
  res.send('Hello World!');
})

server.get('/api/health(a+)', (req, res, next) => {
  res.sendStatus(200);
});

server.get('/api/io/:input', (req, res, next) => {
  res.send(req.params.input);
});

/* POST */
server.post('/api/io', (req, res, next) => {
  res.send(req.body);
});

server.post('/api/io1', (req, res, next) => {
  if (!req.body.key1 || !req.body.key2) {
    res.sendStatus(400);
  } else {
    res.send(`${req.body.key1} and ${req.body.key2}`);
  }
});

/* Start server */
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
