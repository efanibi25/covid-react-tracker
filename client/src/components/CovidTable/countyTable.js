import React, { useContext, useState, useEffect, Fragment } from "react";
import { DataContext } from "../../index.js";
import { styled, useTheme, useMediaQuery, Box, Button, Grid, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5400";

export default function CountyTable(props) {
  const context = useContext(DataContext);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [loading, setLoading] = useState(true);

  function createData(date, deaths, deathsone, cases, casesone) {
    return { date, deaths, deathsone, cases, casesone };
  }

  async function getCountyPop(state, county) {
    try {
      const popResp = await fetch(`${API_BASE_URL}/api/county_pop?state=${state}&county=${county}`);
      if (!popResp.ok) throw new Error(`HTTP error! status: ${popResp.status}`);
      const pop = await popResp.json();
      context.setCountyPop(pop.length > 0 ? pop[0] : "No Data on Pop Found");
    } catch (error) {
      console.error("Error fetching county population:", error);
      context.setCountyPop("Error Getting Data");
    }
  }

  async function getCountyVacc(state, county) {
    try {
      const vaccResp = await fetch(`${API_BASE_URL}/api/county_vacc?county=${county}&state=${state}&today`);
      if (!vaccResp.ok) throw new Error(`HTTP error! status: ${vaccResp.status}`);
      const vaccDict = await vaccResp.json();
      context.setCountyVacc(vaccDict.length > 0 ? vaccDict[0]["count"] : "No Data");
    } catch (error) {
      console.error("Error fetching county vaccinations:", error);
      context.setCountyVacc("Error Getting Data");
    }
  }

  async function createTable(state, county) {
    try {
      const [casesResp, deathsResp] = await Promise.all([
        fetch(`${API_BASE_URL}/api/county_cases?state=${state}&county=${county}`),
        fetch(`${API_BASE_URL}/api/county_deaths?state=${state}&county=${county}`)
      ]);
      
      const casesDict = casesResp.ok ? await casesResp.json() : [];
      const deathsDict = deathsResp.ok ? await deathsResp.json() : [];

      const combinedData = casesDict.map((caseData, index) => {
        const deathData = deathsDict[index];
        return createData(
          caseData.date,
          deathData.deaths,
          deathData.newdeaths,
          caseData.cases,
          caseData.newcases
        );
      });
      context.setCountyData(combinedData);
    } catch (error) {
      console.error("Error fetching county data:", error);
    }
  }

  function handleclick() {
    context.setShow("stateTable");
  }

  useEffect(() => {
    if (context.address?.state && context.address?.county) {
      setLoading(true);
      const { state, county } = context.address;
      createTable(state, county);
      getCountyPop(state, county);
      getCountyVacc(state, county);
    }
  }, [context.address?.state, context.address?.county]);

  useEffect(() => {
    if (context.countydata.length > 0 && context.countyvacc !== "") {
      setLoading(false);
    }
  }, [context.countydata, context.countyvacc]);

  if (loading) {
    return <LinearProgress />;
  } else {
    return (
      <Fragment>
        <Grid container justifyContent="center" direction="column" alignItems="center">
          {/* Responsive header for medium screens and up */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography variant="h4" gutterBottom>
              {context.address.county}
            </Typography>
            <Button
              variant="contained"
              onClick={handleclick}
              sx={{ mt: 2, mb: 2, backgroundColor: "#442bce", color: "white" }}
            >
              Switch to State
            </Button>
            <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
              County Population: {context.county_pop}
            </Typography>
            <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
              County Fully Vaccinated: {context.countyvacc}
            </Typography>
          </Box>
          {/* Responsive header for small screens */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Typography variant="h6" gutterBottom>
              {context.address.county}
            </Typography>
            <Button
              variant="contained"
              onClick={handleclick}
              size="small"
              sx={{ mt: 1, mb: 1, backgroundColor: "#442bce", color: "white" }}
            >
              Switch to State
            </Button>
            <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
              County Population: {context.county_pop}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
              County Fully Vaccinated: {context.countyvacc}
            </Typography>
          </Box>
          
          <Grid item xs={12} md={8}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="left">Total Deaths</TableCell>
                    <TableCell align="left">One-Day Change Deaths</TableCell>
                    <TableCell align="left">Total Cases</TableCell>
                    <TableCell align="left">One-Day Change Cases</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {context.countydata.map((val, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {val.date}
                      </TableCell>
                      <TableCell align="left">{val.deaths}</TableCell>
                      <TableCell align="left">{val.deathsone}</TableCell>
                      <TableCell align="left">{val.cases}</TableCell>
                      <TableCell align="left">{val.casesone}</TableCell>
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
