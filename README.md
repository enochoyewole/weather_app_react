Weather App React

A responsive waether application built with React and Vite. Weather App React helps users explore current weather conditions and forecasts for locations around the world through a clean, interactive interface.

The application can use the browser's location permission to identify the user's approximate location, or users can search for a place by name. It retrieves weather information from the open-Meteo API and uses OpenstreetMap's Nominatim service to find and identify locations.

Features

-Current weather: View the selcted location, current temperature,apparent temperature, humidity, wind speed, and precipitation.

-Location search: Search for places by name and select from matching suggestions.
-Hourly forecast: Explore houly weather information, including temperature,conditions, and precipitation.
- Daily forecast: View daily forecast information, including weather conditions, high and low temperatures, and precipitation.
-Flexible measurement units: choose celsius or fahrenheit, kilometres per hour or miles per hour, and millimeteres or inches.
-Loading and error feedback: The interface provides loading and error states and allows users to retry after a weather request fails.
- Responsive Interface; The application seaperate its interface inti reusuable  React components and CSS Modules for component-level styling.

Technologies Used

-React : Builds interactive user interface using reusuable components and react hooks.
_ Vite: Provides the development server and production build tooling.

-Javascript: Implement the application's behaviour and seperates functionality into modules.
-Axios: Sends HTTP requests to the weather and geocoding services.
-Open-Mateo API; Supplies current weather, hourly forecast, daily forecast data.
-CSS Modules: Keeps components styles organised and scoped to individual components.

Prerequisites

Before running the project, install:
- Node.js, using version compatible with's Vite setup.
-Yarn, if you intend to use Yarn to install dependencies.
-Git, If you want to clone the repository.

You will also need n internet connection to retrieve weather and location data from the external services.

Getting Started 

1. Clone repository
  open a terminal and run:
  git clone https://github.com/enochoyewole/weather_app_react.git

2. Enter the project directory
  cd weather_app_react

3. install dependencies
  Using Yarn, run:
  yarn install

 this installs the dependencies declared in package.json.

4. Start the development server 
  yarn dev
