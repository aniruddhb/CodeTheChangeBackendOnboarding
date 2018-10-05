# Backend Workshop - SWAPI

## Introduction
Welcome to the backend workshop! In this workshop, you'll be building out a
simple API that will query and return information from SWAPI (Star Wars API).

By the end of the workshop, hopefully you'll understand more about routing,
callbacks, asynchronism, and how to fetch and return data.

[Here](https://docs.google.com/presentation/d/1fmSMk9HNawVkeOOZpyVWI0jSdpABnYygmX3LPFENl_M/edit?usp=sharing) is a link to the slides accompanying this workshop.

## Prerequisites
Before this tutorial, be sure to have the following installed on your computer.

* [Homebrew](https://brew.sh/)
* [Node.js](https://nodejs.org/en/)/[NPM](https://www.npmjs.com/)
  * I recommend LTS or installing via `brew`
* [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
  * I recommend installing via `brew`
* [Postman](https://www.getpostman.com/) or [Insomnia](https://insomnia.rest/)
  * Both are free!

## Getting Started
1. Clone this repository (using `git clone`)
2. Run `yarn install` in the top-level directory of this repository

## `NodeSyncAsyncExample.js`
This file aims to take you through an example of what the word "asynchronism"
really means. You can run the contents of the file by navigating to the TLD of
this repository in Terminal and running `yarn async`.

The example operation we'll use here is reading from a file. `Sample.txt` is a
plain text file located in the TLD of this repository, containing the text "Gucci Gang". The Node.js `fs` API provides two ways to read this text from the file:
1. Synchronous
2. Asynchronous

With synchronous programming, the program will stop execution and wait until
the entire contents of the file are read. This is called "blocking" execution -
the program's execution is "blocked" by the reading of the file.

On the other hand, with asynchronous programming, the program will continue
executing without waiting for the entire contents of the file to be read. Instead, we provide a "callback" function that is executed once the file is read. This
is called "non-blocking" execution.

`content` is a Javascript variable that is set to `undefined` at the beginning
of this script, and `ASYNC` is a boolean flag that we use to toggle synchronous
and asynchronous execution of this script.

When run with `ASYNC=false`, readFileSync() will be called and `Sample.txt` will be loaded into the `content` variable, which will then be printed to console.

 However, when run with `ASYNC=true`, readFile() is used instead, which takes a callback that is used to handle the file data. However, readFile() executes asynchronously, so our script doesn't wait for the `Sample.txt` to be loaded into `content` before printing to console.

## `ExpressServerExample.js`
This file sets up a very simple Express web-server on your computer that can respond to user requests (namely, your own). To start up a web-server using this file, navigate to the TLD of this repository in Terminal and type `yarn start:example`.

In this file, you'll see a couple of HTTP GET and POST routes. Once you start
the server, you can query these routes using Postman or Insomnia. Understanding & playing around in this file will help you learn how to send and use URL query parameters and request bodies in your GET and POST requests.

## `ExpressBackendExercise.js`
This file also sets up a very simple Express web-server on your computer that can
respond to user requests (namely, your own). To start up a web-server using this file, navigate to the TLD of this repository in Terminal and type `yarn start:exercise`.

This file will contain the code you write for your SWAPI backend exercise! SWAPI
is a public Star Wars API that allows you to query for basic information about
various SW characters, vehicles, and more. It is a very well documented API, and
you can use the links below to dig deeper:
* [SWAPI Home](https://swapi.co/)
* [SWAPI Documentation](https://swapi.co/documentation)

This file already contains one GET route that takes an integer as a query parameter, and returns the character in the SWAPI database corresponding to the integer value.

For your exercise, you will be writing another route. A stub has been provided,
but you'll have to fill in the rest!

1. Given an integer `id` as a query parameter, create a route that returns the name of all vehicles that are used by the SW character corresponding to `id`
2. **Bonus Route**: Given a list of integers `ids` in the request body that corresponds to a list of SW characters, construct a route that returns a list of all unique vehicles
used by said characters
