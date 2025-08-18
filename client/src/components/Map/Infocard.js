import React , { useContext ,useState ,useEffect,Fragment}from "react";
import { dataContext } from "../../views/mapPage/mapPage.js";
//Card (Assuming these have been refactored to use modern MUI)
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
//icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/material';

// Note: Removed the old makeStyles import and the styles object.

export default function Infocard(props) {
  const [countyCases, setCountyCases] = useState({});
  const [countyDeaths, setCountyDeaths] = useState({});
  const [stateData, setStateData] = useState({});
  const [countyPop, setCountyPop] = useState("");
  const [stateVacc, setStateVacc] = useState("");
  const [countyVacc, setCountyVacc] = useState("");

  const context = useContext(dataContext);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  today.toLocaleDateString('en-CA');
  yesterday.toLocaleDateString('en-CA');
  
  const [isExpanded, setIsExpanded] = useState(true);

  function handleclick(event){
    setIsExpanded(!isExpanded);
  }
    
  async function getCasesCounty(state,county){
    const cases_resp=await fetch(`/api/county_cases?start=${yesterday}&end=${today}&state=${state}&county=${county}`);
    if (cases_resp.status !== 200){
      setCountyCases({ error: "Error Retriving Case Data for County" });
      return;
    }
    const cases_dict = await cases_resp.json();
    if(cases_dict.length === 0){
      setCountyCases({ error: "No Data on Cases Found" });
      return;
    }
    setCountyCases(cases_dict[0]);
  }

  async function getDeathsCounty(state,county){
    const death_resp=await fetch(`/api/county_deaths?start=${yesterday}&end=${today}&state=${state}&county=${county}`);
    if (death_resp.status !== 200){
      setCountyDeaths({ error: "Error Retriving Death Data for County" });
      return;
    }
    const death_dict = await death_resp.json();
    if(death_dict.length === 0){
      setCountyDeaths({ error: "No Data on Deaths Found" });
      return;
    }
    setCountyDeaths(death_dict[0]);
  }

  async function getstatedata(state){
    const state_resp=await fetch(`/api/state_data?start=${today}&state=${state}`);
    if (state_resp.status !== 200){
      setStateData({ error: "Error Retriving State Data" });
      return;
    }
    const state_dict = await state_resp.json();
    if(Object.keys(state_dict).length === 0){
      setStateData({ error: "No Data Found" });
      return;
    }
    setStateData(state_dict[Object.keys(state_dict)[0]]);
  }

  async function getCountyPop(state,county){
    const pop_resp=await fetch(`/api/county_pop?&state=${state}&county=${county}`);
    if (pop_resp.status !== 200){
      setCountyPop("Error Getting Data");
      return;
    }
    const pop = await pop_resp.json();
    if(pop.length === 0){
      setCountyPop("No Data on Pop Found");
      return;
    }
    setCountyPop(pop[0]);
  }

  async function getCountyVacc(county,state){
    const county_resp=await fetch(`/api/county_vacc?county=${county}&state=${state}&today`);
    if (county_resp.status!== 200){
      setCountyVacc("Error Getting Data");
      return;
    }
    const county_vacc = await county_resp.json();
    if(county_vacc.length === 0 || county_vacc[0]['error']){
      setCountyVacc("No Data on Vaccines Found");
      return;
    }
    setCountyVacc(county_vacc[0]["count"]);
  }

  async function getStateVacc(state){
    const state_resp=await fetch(`/api/state_vacc?state=${state}&today`);
    if (state_resp.status!== 200){
      setStateVacc("Error Getting Data");
      return;
    }
    const state_vacc = await state_resp.json();
    if(state_vacc.length === 0 || state_vacc[0]['error']){
      setStateVacc("No Data on Vaccinations Found");
      return;
    }
    let count=0;
    for(let i=0;i<state_vacc.length;i++){
      count=count+state_vacc[i]["count"];
    }
    setStateVacc(count);
  }

  useEffect(() => {
    if (context.address["state"]==null || context.address["county"]==null){
      return;
    }
    setIsExpanded(true);
    let state=context.address["state"];
    let county=context.address["county"];

    getDeathsCounty(state,county);
    getCasesCounty(state,county);
    getCountyPop(state,county);
    getstatedata(state);
    getCountyVacc(county,state);
    getStateVacc(state);
  }, [context.address]);

  if(!context.card) {
    return null;
  } else {
    return (
      <Card style={props.style}>
        <CardBody>
          <Box sx={{ fontSize: "22px" }}>
            <b>{"Covid Statistics"}</b>
            <Box 
              component="span"
              sx={{ marginLeft:"45px" }}
              onClick={handleclick}
            >
              {isExpanded ? <RemoveIcon /> : <AddIcon />}
            </Box>
          </Box>
          <Box sx={{ display: isExpanded ? "block" : "none" }}>
            <u><b style={{ fontSize: "15px" }}>{context.address["county"]}</b></u>
            <Box>
              <b style={{ fontSize: "15px" }}>County Pop</b>:{countyPop}
            </Box>
            <Box>
              {countyCases.error ? <div><b style={{fontSize:"15px"}}>{countyCases.error}</b></div> : (
                <>
                  <div><b style={{ fontSize: "15px" }}>{"County Case Data Updated: "}</b>{countyCases.date}</div>
                  <div><b style={{ fontSize: "15px" }}>{"Latest Case Count: "}</b>{countyCases.cases}</div>
                  <div><b style={{ fontSize: "15px" }}>{"One-Day Change in Cases: "}</b>{countyCases.newcases}</div>
                </>
              )}
            </Box>
            <br />
            {countyDeaths.error ? <div><b style={{fontSize:"15px"}}>{countyDeaths.error}</b></div> : (
              <>
                <div><b style={{ fontSize: "15px" }}>{"County Death Data Updated: "}</b>{countyDeaths.date}</div>
                <div><b style={{ fontSize: "15px" }}>{"Death Count: "}</b>{countyDeaths.deaths}</div>
                <div><b style={{ fontSize: "15px" }}>{"One-Day Change in Deaths: "}</b>{countyDeaths.newdeaths}</div>
              </>
            )}
            <br />
            <Box>
              <b style={{ fontSize: "15px" }}>County Vaccinations</b>:{countyVacc}
            </Box>
            <br />
            <u><b style={{ fontSize: "15px" }}>{context.address["state"]}</b></u>
            {stateData.error ? <div><b style={{fontSize:"15px"}}>{stateData.error}</b></div> : (
              <>
                <div><b style={{ fontSize: "15px" }}>{"State Data Updated: "}</b>{Object.keys(stateData)[0]}</div>
                <div><b style={{ fontSize: "15px" }}>{"Case Count: "}</b>{stateData["tot_cases"]}</div>
                <div><b style={{ fontSize: "15px" }}>{"One-Day Change in Cases: "}</b>{stateData["new_case"]}</div>
                <div><b style={{ fontSize: "15px" }}>{"Death Count: "}</b>{stateData["tot_death"]}</div>
                <div><b style={{ fontSize: "15px" }}>{"One-Day Change in Deaths: "}</b>{stateData["new_death"]}</div>
              </>
            )}
            <Box>
              <b style={{ fontSize: "15px" }}>State Vaccinations</b>:{stateVacc}
            </Box>
          </Box>
        </CardBody>
      </Card>
    );
  }
}