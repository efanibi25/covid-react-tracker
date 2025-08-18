import React, { useContext, useState, useEffect, Fragment } from "react";
import { dataContext } from "../../views/tablePage/tablePage.js";
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'; // Import Box for modern responsive styling

// Note: Removed the makeStyles import and hook

export default function StateTable(props) {
  let context = useContext(dataContext);

  const [table, setTable] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [buttonText, setButtonText] = useState("Switch to County");

  function createData(date, deaths, deathsone, cases, casesone, vaccine) {
    return { date, deaths, deathsone, cases, casesone, vaccine };
  }

  async function create_table(state, county) {
    let state_dict = [];
    let state_resp = await fetch(`/api/state_data?state=${state}&date=all`);

    if (state_resp.status == 200) {
      state_dict = await state_resp.json();
    }

    let keys = Object.keys(state_dict);
    keys = keys.sort();
    let temp = [];
    for (let i = keys.length - 1; i > -1; i--) {
      let key = keys[i];
      let data = state_dict[key];
      let t = createData(key, data["tot_death"], data["new_death"], data["tot_cases"], data["new_case"]);
      temp.push(t);
    }
    context.setStateData(temp);
  }

  async function getStateVacc(state) {
    let statevacc_dict = [];
    let url = `/api/state_vacc?state=${state}&today`;
    let statevacc_resp = await fetch(url);
    if (statevacc_resp.status == 200) {
      statevacc_dict = await statevacc_resp.json();
    }
    let count = 0;
    for (let i = 0; i < statevacc_dict.length; i++) {
      count = count + statevacc_dict[i]["count"];
    }
    context.setStateVacc(count);
  }

  function handleclick() {
    context.setShow("countyTable");
  }

  useEffect(() => {
    if (context.address["state"] == null || context.address["county"] == null) {
      return;
    }
    let state = context.address["state"];
    let county = context.address["county"];
    create_table(state, county);
    getStateVacc(state);
  }, []);

  useEffect(() => {
    if (context.statedata.length > 0 && context.statevacc)
      setLoaded(true);
  }, [context.statedata, context.state_pop, context.statevacc]);

  useEffect(() => {
    if (loaded) {
      setTable(true);
    }
  }, [loaded]);

  if (table == false) {
    return (
      <LinearProgress />
    );
  } else {
    return (
      <Fragment>
        <Grid container
          justifyContent="center"
          direction="row"
        >

          {/* This Box replaces the deprecated <Hidden mdDown> */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Grid container item xs={4} justifyContent='center'>
              <b style={{ fontSize: "40px", marginLeft: "20%" }}>{context.address["state"]} </b>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleclick}
                size="small"
                // The sx prop replaces the old classes prop
                sx={{
                  gridColumnStart: 3,
                  gridRowStart: 1,
                  width: "40%",
                  color: "white",
                  backgroundColor: "#442bce",
                  "& .MuiButton-label": { // Targets the inner label
                    fontSize: "8px"
                  }
                }}
              >
                Switch to County
              </Button>
            </Grid>
            <Grid item container xs={10} justifyContent='center'>
              <b style={{ fontSize: "40px" }}>State Fully Vaccinated: {context.statevacc} </b>
            </Grid>
          </Box>

          {/* This Box replaces the deprecated <Hidden mdUp> */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Grid container item xs={4} justifyContent='center'>
              <b style={{ fontSize: "20px" }}>{context.address["state"]} </b>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleclick}
                size="small"
                // The sx prop replaces the old classes prop
                sx={{
                  gridColumnStart: 3,
                  gridRowStart: 1,
                  width: "40%",
                  color: "white",
                  backgroundColor: "#442bce",
                  "& .MuiButton-label": {
                    fontSize: "8px"
                  }
                }}
              >
                Switch to County
              </Button>
            </Grid>
            <Grid item container xs={10} justifyContent='center'>
              <b style={{ fontSize: "20px" }}>State Fully Vaccinated: {context.statevacc} </b>
            </Grid>
          </Box>

          <Grid item container justifyContent='center' xs={8}>
            <TableContainer style={{ "gridColumn": "2/2" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="left">Deaths</TableCell>
                    <TableCell align="left">One-Day Change Deaths</TableCell>
                    <TableCell align="left">Cases</TableCell>
                    <TableCell align="left">One-Day Change Cases</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {context.statedata.map((val, index) => (
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