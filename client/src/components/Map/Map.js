


import usePlacesAutocomplete from "use-places-autocomplete";
import React , { useContext ,useState ,useEffect,Fragment,router, isValidElement}from "react";
import GoogleMapReact from 'google-map-react';
import { dataContext } from "../../views/mapPage/mapPage.js";

export default function Maps(props) {
  const  context = useContext(dataContext);
  const [address, setAddress] = useState([]);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      types: ['(cities)'],
      componentRestrictions: { country: ["us"]},
    },
    debounce: 300,
  });
 

  return (
    <Fragment>
    <div style={{ height: '80vh', width: '100%' }}>
    <GoogleMapReact
    bootstrapURLKeys={{ key:"AIzaSyDHoseXyoZyn8G9Kq2DdW3E0XydPPd84S4" }}
    center={context.location}
    zoom={context.zoom}


  >
   </GoogleMapReact>
   </div>
    </Fragment>
  );
}

