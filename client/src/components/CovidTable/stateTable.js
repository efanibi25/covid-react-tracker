import React, { useContext, useState, useEffect, Fragment } from "react";
import { DataContext } from "../../index.js";
import { styled, useTheme, useMediaQuery, Box, Button, Grid, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5400";

export default function StateTable(props) {
  const context = useContext(DataContext);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [loading, setLoading] = useState(true);

  // This function can stay as it is.
  function createData(date, deaths, deathsone, cases, casesone) {
    return { date, deaths, deathsone, cases, casesone };
  }
  
  // REVISED: Combined data fetching into a single, robust function.
  async function fetchData(state) {
    setLoading(true);
    try {
      // 1. Fetch the main aggregated table data
      const tableUrl = `${API_BASE_URL}/api/state_data_aggregated?state=${state}`;
      const tableResp = await fetch(tableUrl);
      if (!tableResp.ok) throw new Error('Failed to fetch state table data');
      
      const tableData = await tableResp.json();
      const formattedTableData = tableData.map(d => 
        createData(d.date, d.deaths, d.new_deaths, d.cases, d.new_cases)
      );
      context.setStateData(formattedTableData);

      // 2. Fetch the LATEST state vaccine total using the correct endpoint
      const vaccUrl = `${API_BASE_URL}/api/latest_state_vacc?state=${state}`;
      const vaccResp = await fetch(vaccUrl);
      if (!vaccResp.ok) throw new Error('Failed to fetch state vaccine data');
      
      const vaccData = await vaccResp.json();
      // The API now returns the final total directly, no calculation needed.
      context.setStateVacc(vaccData.total_vaccinations);

    } catch (error) {
      console.error("Error fetching state data:", error);
      // Set an error state or clear data on failure
      context.setStateData([]);
      context.setStateVacc(0);
    } finally {
      // This will run whether the fetch succeeds or fails.
      setLoading(false);
    }
  }

  function handleclick() {
    context.setShow("countyTable");
  }

  useEffect(() => {
    if (context.address?.state) {
      fetchData(context.address.state);
    }
  }, [context.address?.state]);
  

  if (loading) {
    return <LinearProgress />;
  } else {
    return (
      <Fragment>
        <Grid container justifyContent="center" direction="column" alignItems="center">
          <Box sx={{ width: '80%', textAlign: 'center' }}>
            {/* Using a single responsive header block */}
            <Typography variant={isMdUp ? "h4" : "h6"} gutterBottom>
              {context.address.state}
            </Typography>
            <Button
              variant="contained"
              onClick={handleclick}
              size={isMdUp ? "medium" : "small"}
              sx={{ mt: 1, mb: 2, backgroundColor: "#442bce", color: "white" }}
            >
              Switch to County
            </Button>
            <Typography variant={isMdUp ? "h5" : "subtitle1"} sx={{ mb: 2 }}>
              {/* Added number formatting for readability */}
              State Fully Vaccinated: {context.statevacc?.toLocaleString() || 'N/A'}
            </Typography>
          </Box>

          <Grid item xs={12} md={8}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="left">Total Deaths</TableCell>
                    <TableCell align="left">New Deaths</TableCell>
                    <TableCell align="left">Total Cases</TableCell>
                    <TableCell align="left">New Cases</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {context.statedata.map((val) => (
                    <TableRow key={val.date}>
                      <TableCell component="th" scope="row">{val.date}</TableCell>
                      <TableCell align="left">{val.deaths.toLocaleString()}</TableCell>
                      <TableCell align="left">{val.deathsone.toLocaleString()}</TableCell>
                      <TableCell align="left">{val.cases.toLocaleString()}</TableCell>
                      <TableCell align="left">{val.casesone.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}