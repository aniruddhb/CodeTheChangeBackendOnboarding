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
 * Route Documentation for Reference Solution
 *
 * Route Input:
 *  - Query Parameter: Integer representing a SW Character
 *
 * Route Output:
 * - List of strings, where each string represents the name of a vehicle used
 *   by the character given by the query parameter
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

/*
 * Route Documentation for Reference Solution
 *
 * Route Input:
 *  - Nothing
 *
 * Route Output:
 *  - List of strings, where each string represents the name of a SW character
 *
 */
server.get('/allcharacters', async (req, res, next) => {
  let url = `${SWAPI_URL}/people`;

  const people = [];
  while (url !== undefined && url !== null) {
    const response = await fetch(url);
    const data = await response.json();

    const characters = data.results;
    for (let i = 0; i < characters.length; i++) {
      people.push(characters[i].name);
    }

    url = data.next;
  }
  console.log(people.length);
  res.send(people);
});

/* Start server */
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
