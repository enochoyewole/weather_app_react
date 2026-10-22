Weather App — React

A responsive weather application built with React and Vite. It allows users to search for locations, view current weather conditions, and explore hourly and daily forecasts through a simple, user-friendly interface.

Features

* Location search: Search for a city or location to retrieve its weather information.
* Location suggestions: Get suggestions while typing a location into the search field.
* Current weather: View important weather details, including temperature, feels-like temperature, humidity, wind speed, and precipitation.
* Hourly forecast: Explore upcoming hourly weather conditions.
* 7-day forecast: Check daily weather predictions, including high and low temperatures.
* Geolocation: Use your device’s location to retrieve local weather when location access is available.
* Unit preferences: Switch between supported measurement systems.
* Loading and error states: Receive feedback while weather information loads or when a request fails.
* Responsive interface: Access the application on supported desktop and mobile screen sizes.

Technology Stack

* React 18 — Builds the user interface using reusable components.
* Vite 5 — Provides the development server and production build tools.
* JavaScript — Handles application logic and interactions.
* Axios — Makes HTTP requests to external APIs.
* CSS — Styles the application interface and components.
* Open-Meteo API — Provides weather information and forecasts.
* OpenStreetMap Nominatim — Supports location search and geocoding.

Getting Started

Follow these steps to run the project locally.

Prerequisites

Make sure you have the following installed:

* Node.js — preferably a version compatible with the project’s Vite setup.
* npm — included with Node.js.
* Git — for cloning the repository.
* A modern web browser.

Installation

1. Clone the repository

git clone https://github.com/enochoyewole/weather_app_react.git

2. Navigate to the project directory

cd weather_app_react

3. Install the dependencies

npm install

4. Start the development server

npm run dev

Open the local URL displayed in your terminal to view the application in your browser. Vite commonly uses http://localhost:5173, but use the URL printed by your terminal.

Available Scripts

Run these commands from the project directory.

Command	Description
npm run dev	Starts the local development server.
npm run build	Creates an optimized production build.
npm run preview	Previews the production build locally.

How to Use the Application

1. Open the application in your browser.
2. Allow location access if you want to use your current location and the application requests permission.
3. Alternatively, enter a city or location in the search field.
4. Select an appropriate suggestion or submit the search.
5. Review the current weather conditions and forecast information.
6. Explore the hourly and daily forecasts where available.
7. Change the measurement preferences to view weather values in your preferred units.

Weather information depends on network connectivity and the availability of the external services used by the application.

API Services

Open-Meteo

The application uses Open-Meteo to retrieve weather data, including current conditions, hourly forecasts, and daily forecasts.

Website: https://open-meteo.com/

OpenStreetMap Nominatim

The application uses Nominatim for location search and geocoding. These services help translate location names into coordinates and can support reverse geocoding from coordinates to a location name.

Website: https://nominatim.org/

Open-Meteo and OpenStreetMap Nominatim have their own usage policies and service limits. Applications using these services should follow their respective terms and attribution requirements.

Project Structure

The project is organized into components, a custom weather hook, and utility modules. The outline below is illustrative; update it to match the exact files and folders in your repository.

weather_app_react/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── LoadingState.jsx
│   │   ├── ErrorState.jsx
│   │   └── WeatherContent.jsx
│   ├── hooks/
│   │   └── useWeather.js
│   ├── utils/
│   │   ├── api.js
│   │   ├── formatters.js
│   │   └── weatherIcons.js
│   ├── App.jsx
│   ├── App.module.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js

Key Application Modules

* App.jsx — Connects the main application interface with the weather hook and UI components.
* hooks/useWeather.js — Manages weather-related state, location searches, loading and error states, and forecast interactions.
* utils/api.js — Handles requests to the weather and geocoding services.
* components/ — Contains reusable interface components for navigation, search, loading, errors, and weather information.
* App.module.css — Contains styles for the main application component.

Troubleshooting

The application does not start

Confirm that Node.js and npm are installed, then run:

npm install
npm run dev

Weather information does not load

* Check your internet connection.
* Retry the request after a short wait.
* Confirm that the external API services are available.
* Check the browser console for errors.

Location detection does not work

* Make sure location services are enabled on your device.
* Allow location permission in your browser.
* If location detection remains unavailable, search for a location manually.

The production build fails

Run:

npm run build

Read the error message in the terminal and resolve the reported issue before building again.

Location search returns no results

* Check the spelling of the location.
* Try a more specific city or place name.
* Check your internet connection and the availability of the geocoding service.

Development

To work on the project locally:

1. Clone the repository and install its dependencies.
2. Start the development server with npm run dev.
3. Make changes to the relevant React components, hooks, utility modules, or styles.
4. Verify the changes in the browser.
5. Run npm run build to check that the project builds successfully.

Acknowledgements

* React for the user interface library.
* Vite for the development and build tooling.
* Axios for HTTP requests.
* Open-Meteo for weather data.
* OpenStreetMap Nominatim for geocoding services.

⸻

Built with React and Vite.