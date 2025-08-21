import React, { useState, createContext } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useJsApiLoader } from '@react-google-maps/api';

// Pages
import NewsPage from "views/newsPage/newsPage.js";
import MapPage from "views/mapPage/mapPage.js";
import TablePage from "views/tablePage/tablePage.js";

export const DataContext = createContext();

const router = createBrowserRouter([
  { path: "/news", element: <NewsPage /> },
  { path: "/tables", element: <TablePage /> },
  { path: "/", element: <MapPage /> },
]);

// This is now the single source of truth for all shared state.
function App() {
  const [address, setAddress] = useState(null);
  const [location, setLocation] = useState({ lat: 39.50, lng: -98.35 });
  const [zoom, setZoom] = useState(5);
  const [card, setCard] = useState(false);
  
  const [show, setShow] = useState(null);
  const [statedata, setStateData] = useState([]);
  const [countydata, setCountyData] = useState([]);
  const [statevacc, setStateVacc] = useState(null);
  const [countyvacc, setCountyVacc] = useState(null);
  const [state_pop, setStatePop] = useState(null);
  const [county_pop, setCountyPop] = useState(null);
  const libraries = ['places', 'geocoding'];

  const { isLoaded } = useJsApiLoader({
      id: 'google-map-script', // IMPORTANT: A unique ID for the script tag
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: libraries,
    });

  // This one object now contains all shared data and functions.
  const sharedData = { 
    address, setAddress, 
    location, setLocation, 
    zoom, setZoom, 
    card, setCard,
    show, setShow,
    statedata, setStateData,
    countydata, setCountyData,
    statevacc, setStateVacc,
    countyvacc, setCountyVacc,
    state_pop, setStatePop,
    county_pop, setCountyPop,
    isLoaded
  };

  return (
    <DataContext.Provider value={sharedData}>
      <RouterProvider router={router} />
    </DataContext.Provider>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);