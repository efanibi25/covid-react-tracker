import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../index.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/material';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5400";

// Helper function to format dates consistently
function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export default function Infocard(props) {
  // Use null as the initial state to clearly represent "loading"
  const [latestCountyCases, setLatestCountyCases] = useState(null);
  const [latestCountyDeaths, setLatestCountyDeaths] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [countyPopData, setCountyPopData] = useState(null);
  const [latestStateVacc, setLatestStateVacc] = useState(null);
  const [latestCountyVacc, setLatestCountyVacc] = useState(null);
  const [statePopData, setStatePopData] = useState(null);

  const context = useContext(DataContext);
  const [isExpanded, setIsExpanded] = useState(true);

  function handleclick() {
    setIsExpanded(!isExpanded);
  }

  // --- Data Fetching Functions ---
  
  async function getLatestCountyCases(state, county) {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/latest_county_cases?state=${state}&county=${county}`);
      if (!resp.ok) throw new Error("Network response failed");
      const data = await resp.json();
      setLatestCountyCases(Object.keys(data).length > 0 ? data : { error: "No Data" });
    } catch (error) {
      setLatestCountyCases({ error: "Fetch Error" });
    }
  }

  async function getLatestCountyDeaths(state, county) {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/latest_county_deaths?state=${state}&county=${county}`);
      if (!resp.ok) throw new Error("Network response failed");
      const data = await resp.json();
      setLatestCountyDeaths(Object.keys(data).length > 0 ? data : { error: "No Data" });
    } catch (error) {
      setLatestCountyDeaths({ error: "Fetch Error" });
    }
  }
  
  async function getLatestStateVacc(state) {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/latest_state_vacc?state=${state}`);
      if (!resp.ok) throw new Error("Network response failed");
      const data = await resp.json();
      setLatestStateVacc(data);
    } catch (error) {
      setLatestStateVacc({ error: "Fetch Error" });
    }
  }

  async function getLatestCountyVacc(county, state) {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/latest_county_vacc?state=${state}&county=${county}`);
      if (!resp.ok) throw new Error("Network response failed");
      const data = await resp.json();
      setLatestCountyVacc(Object.keys(data).length > 0 ? data : { error: "No Data" });
    } catch (error) {
      setLatestCountyVacc({ error: "Fetch Error" });
    }
  }

  async function getStateData(state) {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/state_data?state=${state}`);
      if (!resp.ok) throw new Error("Network response failed");
      const data = await resp.json();
      setStateData(Object.keys(data).length > 0 ? data : { error: "No Data" });
    } catch (error) {
      setStateData({ error: "Fetch Error" });
    }
  }

  async function getCountyPop(state, county) {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/county_pop?state=${state}&county=${county}`);
      if (!resp.ok) throw new Error("Network response failed");
      const data = await resp.json();
      setCountyPopData(Object.keys(data).length > 0 ? data : { error: "No Data" });
    } catch (error) {
      setCountyPopData({ error: "Fetch Error" });
    }
  }

  async function getStatePop(state) {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/state_pop?state=${state}`);
      if (!resp.ok) throw new Error("Network response failed");
      const data = await resp.json();
      setStatePopData(data);
    } catch (error) {
      setStatePopData({ error: "Fetch Error" });
    }
  }

  useEffect(() => {
    (async () => {
      if (!context.address || !context.address.state || !context.address.county) {
        return;
      }
      // Reset all states to null on new address to show loading indicators
      setLatestCountyCases(null);
      setLatestCountyDeaths(null);
      setStateData(null);
      setCountyPopData(null);
      setLatestStateVacc(null);
      setLatestCountyVacc(null);
      setStatePopData(null);
      setIsExpanded(true);

      const { state, county } = context.address;
      
      // Fire all API calls
      getLatestCountyCases(state, county);
      getLatestCountyDeaths(state, county);
      getCountyPop(state, county);
      getLatestCountyVacc(county, state);
      getStateData(state);
      getLatestStateVacc(state);
      getStatePop(state);
    })();
  }, [context.address]);

  if (!context.card) {
    return null;
  } else {
    return (
      <Card style={props.style}>
        <CardBody>
          <Box sx={{ fontSize: "22px" }}>
            <b>{"Covid Statistics"}</b>
            <Box component="span" sx={{ marginLeft: "45px" }} onClick={handleclick}>
              {isExpanded ? <RemoveIcon /> : <AddIcon />}
            </Box>
          </Box>
          <Box sx={{ display: isExpanded ? "block" : "none" }}>
            <u><b style={{ fontSize: "15px" }}>County: {countyPopData?.county_name || context.address.county}</b></u>
            <Box>
              <b style={{ fontSize: "15px" }}>County Pop</b>: 
              {countyPopData === null ? " Loading..." : countyPopData.error ? ` ${countyPopData.error}` : ` ${countyPopData.population?.toLocaleString()}`}
            </Box>
            <Box>
              {latestCountyCases === null ? " Loading..." : latestCountyCases.error ? ` Cases: ${latestCountyCases.error}` : (
                <>
                  <div><b style={{ fontSize: "15px" }}>{"Cases (As of): "}</b>{formatDate(latestCountyCases.date)}</div>
                  <div><b style={{ fontSize: "15px" }}>{"Total Cases: "}</b>{latestCountyCases.cases?.toLocaleString()}</div>
                </>
              )}
            </Box>
            <Box>
              {latestCountyDeaths === null ? " Loading..." : latestCountyDeaths.error ? ` Deaths: ${latestCountyDeaths.error}` : (
                <>
                  <div><b style={{ fontSize: "15px" }}>{"Deaths (As of): "}</b>{formatDate(latestCountyDeaths.date)}</div>
                  <div><b style={{ fontSize: "15px" }}>{"Total Deaths: "}</b>{latestCountyDeaths.deaths?.toLocaleString()}</div>
                </>
              )}
            </Box>
            <Box>
              <b style={{ fontSize: "15px" }}>County Vaccinations</b>: 
              {latestCountyVacc === null ? " Loading..." : latestCountyVacc.error ? ` ${latestCountyVacc.error}`: ` ${latestCountyVacc.count?.toLocaleString()}`}
            </Box>
            <br />
            <u><b style={{ fontSize: "15px" }}>State: {statePopData?._id || context.address.state}</b></u>
            <Box>
              <b style={{ fontSize: "15px" }}>State Pop</b>: 
              {statePopData === null ? " Loading..." : statePopData.error ? ` ${statePopData.error}` : ` ${statePopData.total_population?.toLocaleString()}`}
            </Box>
            {stateData === null ? " Loading..." : stateData.error ? ` State Data: ${stateData.error}` : (
              <>
                <div><b style={{ fontSize: "15px" }}>{"State Data (Weekly): "}</b>{formatDate(stateData.end_date)}</div>
                <div><b style={{ fontSize: "15px" }}>{"Total Cases: "}</b>{stateData.tot_cases?.toLocaleString()}</div>
                <div><b style={{ fontSize: "15px" }}>{"Total Deaths: "}</b>{stateData.tot_death?.toLocaleString()}</div>
              </>
            )}
            <Box>
              <b style={{ fontSize: "15px" }}>State Vaccinations</b>: 
              {latestStateVacc === null ? " Loading..." : latestStateVacc.error ? ` ${latestStateVacc.error}` : ` ${latestStateVacc.total_vaccinations?.toLocaleString()}`}
            </Box>
          </Box>
        </CardBody>
      </Card>
    );
  }
}