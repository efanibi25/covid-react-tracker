
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";

import usePlacesAutocomplete, { getDetails,getGeocode, getLatLng } from "use-places-autocomplete";
import React , { useContext ,useState ,useEffect,Fragment,router, isValidElement,useRef}from "react";
import useIsMounted from 'ismounted';
import { SettingsInputAntenna } from '@material-ui/icons';
import GoogleMapReact from 'google-map-react';
import ScriptTag from 'react-script-tag';
import { dataContext } from "../../views/tablePage/tablePage.js";
//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//icons
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';





export default function CovidTable(props) {

  let context = useContext(dataContext);
 

  const today = new Date()
  const [countydata, setCountyData] = useState([])
  const [statedata, setStateData] = useState([])
  const [county_pop, setCountyPop] = useState([]);
  const [state_pop, setStatePop] = useState([]);
  const [statevacc, setStateVacc] = useState([]);
  const [countyvacc, setCountyVacc] = useState([]);

  //useref
  const [table,_setTable] = useState(false);
  const tableRef = useRef(table)
  const setTable = data => {
    tableRef.current = data;
    _setTable(data);
  };

  const [button_text,_setButton_text] = useState("Switch to State");
  const buttonRef = useRef(button_text)
  const setButton_text = data => {
    buttonRef.current = data;
    _setButton_text(data);
  };

  function createData(date, deaths, deathsone, cases, casesone,vaccine) {
    return { date, deaths, deathsone, cases, casesone,vaccine};
  }

  async function create_table(state,county){
    let deaths_dict=[]
    let state_dict=[]
    let cases_dict=[]


    let cases_resp=await fetch(`/county_cases?state=${state}&county=${county}`)
    let deaths_resp=await fetch(`/county_deaths?state=${state}&county=${county}`)
    let state_resp=await fetch(`/state_data?state=${state}&date=all`)
    if (cases_resp.status == 200){

      cases_dict = await cases_resp.json()
    } 

    if (deaths_resp.status == 200) {
      deaths_dict = await deaths_resp.json()
    }
 
    if (state_resp.status == 200){

      state_dict = await state_resp.json()
    } 

  

    let temp=[]
    for(let i=0;i<deaths_dict.length;i++){
        
        let t=createData(deaths_dict[i]["date"],deaths_dict[i]["deaths"],deaths_dict[i]["newdeaths"],cases_dict[i]["cases"],cases_dict[i]["newcases"])
        temp.push(t)
    }
    setCountyData(temp)
    let keys=Object.keys(state_dict)
    keys=keys.sort()
    let temp2=[]
    for(let i=0;i<keys.length;i++){
      let key=keys[i]
      let data=state_dict[key] 
      let t=createData(key,data["tot_death"],data["new_death"],data["tot_cases"],data["new_case"])
        temp2.push(t)
        
    }

    setStateData(temp2)
    setTable("county")

  }

  async function getCountyPop(state,county){
    setCountyPop("")
    let pop_resp=await fetch(`/county_pop?&state=${state}&county=${county}`)
    if (pop_resp.status !== 200) throw Error(pop_resp.message);
    let pop = await pop_resp.json()
    if(pop.length==0){
      setCountyPop("No Data on Pop Found")
      return 
    }
    setCountyPop(pop[0])

  }

  async function getCountyVacc(state,county){
    setCountyVacc("")
    let countyvacc_dict=[]
    let countyvacc_resp=await fetch(`/county_vacc?county=${county}&state=${state}&today`)
    if (countyvacc_resp.status == 200){
      countyvacc_dict = await countyvacc_resp.json()
    } 

    setCountyVacc(countyvacc_dict[0]["count"]||"No Data")
  }

  async function getStateVacc(state){
    let statevacc_dict=[]
    setStateVacc("")
    let statevacc_resp=await fetch(`/state_vacc?state=${state}&today`)
    if (statevacc_resp.status == 200){
      statevacc_dict = await statevacc_resp.json()
    } 
    let count=0
    for(let i=0;i<statevacc_dict.length;i++){
      count=count+statevacc_dict[i]["count"]
      }
      console.log(statevacc_dict,count)
      setStateVacc(count)
  }

    
  function handleclick(){
      if(tableRef.current=="state"){
          setTable("county")
          return
      }
      setTable("state")
  }
 
    

 
  useEffect(() => {
      if (context.address["state"]==null || context.address["county"]==null){
          return
      }
      let state=context.address["state"]
      let county=context.address["county"]
      create_table(state,county)
      getCountyPop(state,county)
      getCountyVacc(state,county)
      getStateVacc(state)
    
  }, [context.address])





  

  if(table==false) {
    return null;
  } 
  if(table=="county")
  {
    return (
<div style={{display: "grid",gridTemplateColumns:"5vw 70vw auto",gridTemplateRows:"5vh 5vh 5vh auto"}}>
<b style={{fontSize:"40px",gridColumnStart:"2",gridRowStart:"1",margin:"auto"}}>{context.address["county"]} </b>
<Button variant="contained" color="primary" style={{gridColumnStart:"3",gridRowStart:"1",width:"40%"}} onClick={handleclick}>
{"Switch to State"}
</Button>
<b style={{fontSize:"40px",gridColumnStart:"2",gridRowStart:"2",margin:"auto"}}>County Population: {county_pop} </b>
<b style={{fontSize:"40px",gridColumnStart:"2",gridRowStart:"3",margin:"auto"}}>County Fully Vaccinated: {countyvacc} </b>
<TableContainer style={{gridColumnStart:"2",gridRowStart:"4",gridRowEnd:"6"}}>
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
  {countydata.map((val,index) => (
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
    </div>
    )

  }
  if(table=="state")
  {
    return (
<div style={{display: "grid",gridTemplateColumns:"5vw 70vw auto",gridTemplateRows:"5vh 5vh auto"}}>
<b style={{fontSize:"40px",gridColumnStart:"2",gridRowStart:"1",margin:"auto"}}>{context.address["state"]} </b>
<Button variant="contained" color="primary" style={{gridColumnStart:"3",gridRowStart:"1",width:"40%"}} onClick={handleclick}>
{"Switch to County"}
</Button>
<b style={{fontSize:"40px",gridColumnStart:"2",gridRowStart:"2",margin:"auto"}}>State Fully Vaccinated: {statevacc} </b>
<TableContainer style={{gridColumnStart:"2",gridRowStart:"3",gridRowEnd:"5"}}>
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
  {statedata.map((val,index) => (
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
    </div>
    )

  }


  
}


