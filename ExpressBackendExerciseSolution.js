const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-unfetch');
const port = 8000;

const server = express();
server.use(bodyParser.json({strict: false}));
server.use(bodyParser.urlencoded({extended: false}));

const SWAPI_URL = 'https://swapi.co/api';

/* Route Input:
 *  - Query Parameter: Integer
 *
 * Route Output:
 *  - Star Wars Character Profile corresponding to
 *    that integer
 */
server.get('/character/:id', (req, res, next) => {
  fetch(`${SWAPI_URL}/people/${req.params.id}`)
    .then(response => response.json())
    .then(data => {
      res.send(data);
    });
});

/*
 * Route Documentation
 */
server.get('/character/:id/vehicles', (req, res, next) => {
  fetch(`${SWAPI_URL}/people/${req.params.id}`)
    .then(response => response.json())
    .then(data => data.vehicles)
    .then(vehicles => {
      return Promise.all(
        vehicles.map(url => fetch(url))
      );
    })
    .then(responses => {
      return Promise.all(
        responses.map(res => res.json())
      );
    })
    .then(vehicles => {
      res.send(vehicles.map(vehicle => vehicle.name));
    });
});

/* Start server */
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
