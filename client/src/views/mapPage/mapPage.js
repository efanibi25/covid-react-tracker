// src/views/mapPage/mapPage.js

import React, { useState,useContext } from "react";
import { Box, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { useJsApiLoader } from '@react-google-maps/api'; // Keep loader here


// ✅ Import the CHILD components
import Map from '../../components/Map/Map.js';
import Infocard from '../../components/Map/Infocard.js';
import MenuBar from '../../components/Shared/Components/MenuBar.js';
import PlacesSearch from '../../components/Shared/PlaceSearch.js'; 
import { DataContext } from "../../index.js";


const theme = createTheme({
  palette: {
    background: {
      default: "#ececec"
    },
  },
});

export default function MapPage() {
  // ✅ This is the ONE and ONLY script loader for this pag
  let context = useContext(DataContext);




  // ✅ This check prevents child components from rendering too early, solving the bug
  if (!context.isLoaded) {
    return <div>Loading Map...</div>;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <MenuBar />
        <Box sx={{ ...theme.mixins.toolbar }} />

        <Box sx={{ position: 'relative', height: 'calc(100vh - 64px)' }}>
          <PlacesSearch sx={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(300px, 40vw, 500px)',
            zIndex: 10,
            backgroundColor: 'white'
          }} />

          <Map />
         
          {context.card && <Infocard />}
        </Box>
    </ThemeProvider>
  );
}