import React , { useContext ,useState ,useEffect, Fragment}from "react";
import { Box } from '@mui/material'; // Import Box for modern styling

import Map from 'components/Map/Map.js';
import Places from 'components/Map/Places.js';
import Infocard from 'components/Map/Infocard.js';
//appbar
import MenuBar from 'views/Components/MenuBar';

// Note: The old `makeStyles` hook and the JSS style file have been removed.
// We will use the `sx` prop on components directly for styling.

export const dataContext = React.createContext();
document.body.style.background="#ececec"


function App() {
  const [address, setAddress] = useState({});
  const [location, setLocation] = useState({
    lat: 39.50,
    lng: -98.35
  });
  const [zoom, setZoom] = useState(5);
  const [card, setCard] = useState(false);
  let shared={address,setAddress,location,setLocation,zoom,setZoom,card,setCard}

  // NOTE: The link-forwarding functions (newsLink, etc.) were not used in the JSX and have been removed.

  return(
    <Fragment>
      <MenuBar/>
      {/* This Box component replaces the old div that used `classes.toolbar`. */}
      <Box sx={(theme) => ({
        ...theme.mixins.toolbar, // This applies the correct toolbar styles
      })} />
      <dataContext.Provider value={shared}>    
        <Places/>
        <Map/>
        {/* The style prop on Infocard has been converted to the modern sx prop. */}
        <Infocard sx={{
          width: '35%',
          top: '10%',
          position: 'absolute',
          left: '55%',
          backgroundColor: 'White'
        }} />
      </dataContext.Provider>
    </Fragment>
  )
}
export default App;
