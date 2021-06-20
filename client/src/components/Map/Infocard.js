
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";

import usePlacesAutocomplete, { getDetails,getGeocode, getLatLng } from "use-places-autocomplete";
import React , { useContext ,useState ,useEffect,Fragment,router, isValidElement,useRef}from "react";
import useIsMounted from 'ismounted';
import { SettingsInputAntenna } from '@material-ui/icons';
import GoogleMapReact from 'google-map-react';
import ScriptTag from 'react-script-tag';
import { dataContext } from "../../views/mapPage/mapPage.js";
//Card
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { cardTitle,cardLink } from "assets/jss/material-kit-react.js";
import CardFooter from "components/Card/CardFooter.js";
//icons
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
const styles = {
  cardTitle,
  cardLink,
};
const useStyles = makeStyles(styles);




export default function Infocard(props) {
  const [countyCases, setcountyCases] = useState([]);
  const [countyDeaths, setcountyDeaths] = useState([]);
  const [stateData, setstateData] = useState([]);
  const [county_pop, setCountyPop] = useState([]);
  const [state_pop, setStatePop] = useState([]);
  const [countyvacc, setCountyVacc] = useState([]);
  const [statevacc, setStateVacc] = useState([]);
  

  const context = useContext(dataContext);
  const classes = useStyles();
  const [box, _setBox] = useState("block");
  const boxRef = useRef(box)
  const setBox = data => {
    boxRef.current = data;
    _setBox(data);
  };


  const [icon, _setIcon] = useState(<RemoveIcon style={{marginLeft:"45px"}} onClick={handleclick}/>);
  const iconRef = useRef(icon)
  const setIcon = data => {
    iconRef.current = data;
    _setIcon(data);
  };

  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  today.toLocaleDateString('en-CA')
  yesterday.toLocaleDateString('en-CA')

  
  function handleclick(event){
    if (boxRef.current=="block"){
      setBox("none")
      setIcon(<AddIcon style={{marginLeft:"45px"}} onClick={handleclick}/>)
      return
    }
    setBox("block")
    setIcon(<RemoveIcon style={{marginLeft:"45px"}} onClick={handleclick}/>)


   
  }
    
    
   
  async function getcasesCounty(state,county){
    setcountyCases([])
    let cases_resp=await fetch(`/api/county_cases?start=${yesterday}&end=${today}&state=${state}&county=${county}`)
    if (cases_resp.status !== 200){
    setcountyCases(countyCases=>[...countyCases,<div><b style={{fontSize:"15px"}}>{"Error Retriving Case and Death Data for County:"}</b></div>])
    return
    } 
    let cases_dict = await cases_resp.json()
    if(cases_dict.length==0){
      setcountyCases(stateData=>[...stateData,<div><b style={{fontSize:"15px"}}>{"No Data on Cases Found"}</b></div>])
      return 
    }
    cases_dict=cases_dict[0]
    let today_cases=cases_dict["cases"]
    let today=cases_dict["date"]
    let change_cases=cases_dict["newcases"]
    setcountyCases(countyCases=>[...countyCases,<div><b style={{fontSize:"15px"}}>{"County Case Data Updated: "}</b>{today}</div>])
    setcountyCases(countyCases=>[...countyCases,<div><b style={{fontSize:"15px"}}>{"Lastest Case Count: "}</b>{today_cases}</div>])
    setcountyCases(countyCases=>[...countyCases,<div><b style={{fontSize:"15px"}}>{"One-Day Change in Cases: "}</b>{change_cases}</div>])

  }




  async function getdeathsCounty(state,county){
    setcountyDeaths([])     
    let death_resp=await fetch(`/api/county_deaths?start=${yesterday}&end=${today}&state=${state}&county=${county}`)
    if (death_resp.status !== 200){
      setcountyDeaths(countyCases=>[...countyCases,<div><b style={{fontSize:"15px"}}>{"Error Retriving Case and Death Data:"}</b></div>])
      return 
    }

    let death_dict = await death_resp.json()
    if(death_dict.length==0){
      setcountyDeaths(stateData=>[...stateData,<div><b style={{fontSize:"15px"}}>{"No Data on Deaths Found"}</b></div>])
      return 
    }
    death_dict=death_dict[0]
    let today_deaths=death_dict["deaths"]
    let today=death_dict["date"]
    let change_deaths=death_dict["newdeaths"]
    setcountyDeaths(deathCases=>[...deathCases,<div><b style={{fontSize:"15px"}}>{"County Death Data Updated: "}</b>{today}</div>])
    setcountyDeaths(deathCases=>[...deathCases,<div><b style={{fontSize:"15px"}}>{"Death Count: "}</b>{today_deaths}</div>])
    setcountyDeaths(deathCases=>[...deathCases,<div><b style={{fontSize:"15px"}}>{"One-Day Change in Deaths: "}</b>{change_deaths}</div>])

  }


  async function getstatedata(state){
    setstateData([])
    let state_resp=await fetch(`/api/state_data?start=${today}&state=${state}`)
    if (state_resp.status !== 200){
    setstateData(stateData=>[...stateData,<div><b style={{fontSize:"15px"}}>{"Error Retiving State Data"}</b></div>])
      return
    }
    let state_dict = await state_resp.json()
    if(Object.keys(state_dict).length==0){
      setstateData(stateData=>[...stateData,<div><b style={{fontSize:"15px"}}>{"No Data Found"}</b></div>])
      return 
    }
    let today=Object.keys(state_dict)[0]
    let data=state_dict[today]

    let today_deaths=data["tot_death"]
    let change_deaths=data["new_death"]
    let today_cases=data["tot_cases"]
    let change_cases=data["new_case"]
    setstateData(stateData=>[...stateData,<div><b style={{fontSize:"15px"}}>{"State Data Updated: "}</b>{today}</div>])
    setstateData(stateData=>[...stateData,<div><b style={{fontSize:"15px"}}>{"Case Count: "}</b>{today_cases}</div>])
    setstateData(stateData=>[...stateData,<div><b style={{fontSize:"15px"}}>{"One-Day Change in Cases: "}</b>{change_cases}</div>])
    setstateData(stateData=>[...stateData,<div><b style={{fontSize:"15px"}}>{"Death Count: "}</b>{today_deaths}</div>])
    setstateData(stateData=>[...stateData,<div><b style={{fontSize:"15px"}}>{"One-Day Change in Deaths: "}</b>{change_deaths}</div>])

  }



  async function getCountyPop(state,county){
    setCountyPop("")
    let pop_resp=await fetch(`/api/county_pop?&state=${state}&county=${county}`)
    if (pop_resp.status !== 200){
      setCountyPop("Error Getting Data")
      return
    }
    let pop = await pop_resp.json()
    if(pop.length==0){
      setCountyPop("No Data on Pop Found")
      return 
    }
    setCountyPop(pop[0])


  }

  async function getCountyVacc(county,state){
    setCountyVacc("")
    let county_resp=await fetch(`/api/county_vacc?county=${county}&state=${state}&today`)
    if (county_resp.status!== 200){
      setCountyVacc("Error Getting Data")
      return
    } 
    let county_vacc = await county_resp.json()
    if(county_vacc.length==0 || county_vacc[0]['error']){
      setCountyVacc("No Data on Vaccines Found")
      return 
    }
    setCountyVacc(county_vacc[0]["count"])
  }


  async function getStateVacc(state){
    setStateVacc("")
    let state_resp=await fetch(`/api/state_vacc?state=${state}&today`)
    if (state_resp.status!== 200){
      setStateVacc("Error Getting Data")
      return
    } 
    let state_vacc = await state_resp.json()

    if(state_vacc.length==0|| state_vacc[0]['error']){
      setStateVacc("No Data on Vaccinations Found")
      return 
    }
    let count=0
    for(let i=0;i<state_vacc.length;i++){
    count=count+state_vacc[i]["count"]
    }
    setStateVacc(count)
  }
  useEffect(() => {
    if (context.address["state"]==null || context.address["county"]==null){
      return
     }
      setBox("block")
      setIcon(<RemoveIcon style={{marginLeft:"45px"}} onClick={handleclick}/>)
      let state=context.address["state"]
      let county=context.address["county"]

      // getdeathsCounty(state,county)
      getcasesCounty(state,county)
      getCountyPop(state,county)
      getstatedata(state)
      getCountyVacc(county,state)
      getStateVacc(state)
  }, [context.address])



  

  if(!context.card) {
    return null;
  } else {
    return (
        <Card style={props.style}>
        <CardBody>
        <div className={classes.cardTitle} style={{fontSize:"22px"}}>{     
        "Covid Statistics"}
        {icon}
        </div>

     <div style={{display:box}}>
        <u><b style={{fontSize:"15px"}}>{context.address["county"]}</b></u>
        {<div><b style={{fontSize:"15px"}}>County Pop</b>:{county_pop}</div>}
        {countyCases.map((val,index) => (
         <div key={index}> 
         {val}
         </div>

        ))}
 <br></br>
{countyDeaths.map((val,index) => (
         <div key={index}> 
         {val}
         </div>

        ))}
        <br></br>
        {<div><b style={{fontSize:"15px"}}>County Vaccinations</b>:{countyvacc}</div>}
        <br></br>
        <u><b style={{fontSize:"15px"}}>{context.address["state"]}</b></u>
        {stateData.map((val,index) => (
         <div key={index}> 
         {val}
         </div>

        ))}
      {<div><b style={{fontSize:"15px"}}>State Vaccinations</b>:{statevacc}</div>}


</div>


        </CardBody>

        </Card>
    );
  }
}


