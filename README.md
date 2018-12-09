# wunderground-client

[![Build Status](https://travis-ci.org/mhagrelius/wunderground-client.svg?branch=master)](https://travis-ci.org/mhagrelius/wunderground-client)

A weather underground (wunderground) client library written with typescript. This project was born out of some basic needs to periodically fetch key weather data for a given zip code.

## Installation Instructions

```
npm install wunderground-client
```

The code should work in browsers and node environments, but has been primarily tested using node.

PRs are welcome for expansion into API requests others need to have wrapped. Use the getCurrentConditions method as an example to build off of.

## Example Usage

```javascript
const weatherClient = new WundergroundClient('<api key goes here>')
const conditions = await weatherClient.getCurrentConditions('City', 'ST')
```
