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
 * This way of writing this route uses the old, Promise-based JS syntax.
 * Notice how much extra code/funk we need compared to the solution below,
 * which uses async/await syntax.
 *
 * Route Documentation for Reference Solution to Route 1
 *
 * Route Input:
 *  - Query Parameter: Integer representing a SW Character
 *
 * Route Output:
 * - List of strings, where each string represents the name of a vehicle used
 *   by the character given by the query parameter
 */
server.get('/old/character/:id/vehicles', (req, res, next) => {
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
 * This way of writing the route uses new async/await syntax. Notice
 * how both fetch() and .json() function calls are async. This means
 * that fetching data over the network AND extracting a JSON from the
 * server response are BOTH asynchronous operations.
 *
 * Route Documentation for Reference Solution to Route 1
 *
 * Route Input:
 *  - Query Parameter: Integer representing a SW Character
 *
 * Route Output:
 * - List of strings, where each string represents the name of a vehicle used
 *   by the character given by the query parameter
 */
server.get('/new/character/:id/vehicles', async (req, res, next) => {
  const personResponse = await fetch(`${SWAPI_URL}/people/${req.params.id}`);
  const personJson = await personResponse.json();

  const vehicles = personJson.vehicles;
  const vehicleNames = [];
  for (let i = 0; i < vehicles.length; i++) {
    const vehicleResponse = await fetch(vehicles[i]);
    const vehicleJson = await vehicleResponse.json();
    vehicleNames.push(vehicleJson.name);
  }

  res.send(vehicleNames);
});

/*
 * Route Documentation for Reference Solution to Bonus Route 2
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
  res.send(people);
});

/*
 * Since the route is supposed to extract a request body, we should make it
 * a PUT route. Although it might make more sense to make it a GET, since we're
 * "getting" a resource from the server, requests with bodies are traditionally
 * crafted as POST routes.
 *
 * Route Documentation for Reference Solution to Bonus Route 3
 *
 * Route Input:
 *  - List of integer ids corresponding to SW characters
 *
 * Route Output:
 *  - List of strings corresponding to the unique vehicles used by requested
 *    SW characters
 *
 */
server.post('/uniquevehicles', async (req, res, next) => {
  const resultObj = {};

  /* Make list of all vehicle URLs to query for */
  const vehicleUrlMap = {};
  for (const id of req.body.ids) {
    const personResponse = await fetch(`${SWAPI_URL}/people/${id}`);
    const personJson = await personResponse.json();

    for (const vehicle of personJson.vehicles) {
      if (vehicleUrlMap[vehicle] !== true) {
        vehicleUrlMap[vehicle] = true;
      }
    }
  }

  /* Iterate through map and obtain name using fetch */
  const vehicleNames = [];
  for (const vehicleUrl in vehicleUrlMap) {
    const vehicleResponse = await fetch(vehicleUrl);
    const vehicleJson = await vehicleResponse.json();
    vehicleNames.push(vehicleJson.name);
  }

  res.send(vehicleNames);
});

/* Start server */
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
