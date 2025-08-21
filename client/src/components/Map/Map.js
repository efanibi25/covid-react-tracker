import React, { useContext, Fragment } from "react";
import GoogleMapReact from 'google-map-react';
import { DataContext } from "../../index.js";

export default function Maps(props) {
  const context = useContext(DataContext);

  // The Maps component now only cares about receiving location and zoom from the context.
  // All the search logic and state have been removed.

return (
  <div style={{ height: '100%', width: '100%' }}>
    <GoogleMapReact
      // bootstrapURLKeys prop has been REMOVED
      center={context.location}
      zoom={context.zoom}
    >
      {/* ... */}
    </GoogleMapReact>
  </div>
);
}

