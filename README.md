# Weather Intelligence App

## Overview

The Weather Intelligence App is a responsive web application created using Google AI Studio App Build. It allows users to search for a city and retrieve current weather conditions and a seven-day weather forecast using the public Open-Meteo APIs.

## Features

* City search
* Current weather conditions
* Temperature and apparent temperature
* Relative humidity
* Wind speed
* Seven-day weather forecast
* Maximum and minimum daily temperatures
* Precipitation probability
* Weather forecast visualization
* Weather-based planning recommendations
* Invalid city and API error handling
* Responsive interface

## APIs Used

### Open-Meteo Geocoding API

The Geocoding API converts a city name into latitude and longitude coordinates.

Endpoint:

https://geocoding-api.open-meteo.com/v1/search

### Open-Meteo Forecast API

The Forecast API retrieves current weather conditions and forecast information.

Endpoint:

https://api.open-meteo.com/v1/forecast

No API keys or private credentials are required.

## Google AI Studio

The application was generated using Google AI Studio App Build.

The generated application was connected directly from Google AI Studio to an approved GitHub repository.

## Running the Application

Install dependencies:

```bash
npm install
```

Start the development environment:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

For a Vite application, the production files are generated in:

```text
dist
```

## GitHub Integration

The generated Google AI Studio application was connected directly to GitHub using the GitHub integration available in Google AI Studio.

The GitHub repository contains the application source code, package configuration, build configuration, and documentation.

## Cloudflare Pages Deployment

The GitHub repository was connected to Cloudflare Pages.

Cloudflare Pages configuration:

Build command:

```text
npm run build
```

Build output directory:

```text
dist
```

After the deployment completed successfully, the application was made available through a Cloudflare Pages `pages.dev` URL.

## Validation

The deployed application was tested using multiple cities.

Valid city tests included:

* Chennai
* London

The application successfully displayed location information, current weather, and the seven-day forecast.

An invalid city search was also tested to confirm that the application displays an appropriate error message.

## Security and Responsible AI

The application uses only public weather data from Open-Meteo.

No employee information, client information, customer information, Gemini API keys, private API keys, Firebase projects, Google Cloud billing resources, or other private credentials are used by the application.
