import React, { useContext, useEffect, Fragment } from "react";
import PlacesSearch from 'components/Shared/PlaceSearch.js';
import StateTable from 'components/CovidTable/stateTable.js';
import CountyTable from 'components/CovidTable/countyTable.js';
import MenuBar from "components/Shared/Components/MenuBar";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { DataContext } from "../../index.js";
import { useJsApiLoader } from '@react-google-maps/api';

document.body.style.background = "#ececec";
function TablePage() {

  let context = useContext(DataContext);
  

  useEffect(() => {
    console.log(`Displaying: ${context.show}`);
  }, [context.show]);

  // Conditional return statement for the loading state
  if (!context.isLoaded) {
    return <div>Loading...</div>;
  }

  // The main JSX to be returned
  return (
    <Fragment>
      <MenuBar />
      <Box sx={{ mt: 8 }} />
      
      <PlacesSearch sx={{ backgroundColor: "White", width: "80%", margin: "auto", marginBottom: "2rem" }} />

      {context.show === null && (
        <Box display="flex" justifyContent="center">
          <Card sx={{ p: 1, width: "40%", backgroundColor: "white" }}>
            <CardContent>
              <Typography variant="h5" component="h4" style={{ fontFamily: "Roboto" }}>
                How to Use?
              </Typography>
              <Typography variant="body1">
                Search for a city by name.
                <br /><br />
                This will load vaccine, death, and case data for the county that the city resides in.
                <br /><br />
                Afterwards, you can also view state data by clicking "Switch to State".
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {context.show === "countyTable" && <CountyTable />}
      {context.show === "stateTable" && <StateTable />}
      
    </Fragment>
  );
}

export default TablePage;