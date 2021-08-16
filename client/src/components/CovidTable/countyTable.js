


import React , { useContext ,useState ,useEffect,Fragment,router, isValidElement,useRef}from "react";
import { dataContext } from "../../views/tablePage/tablePage.js";
import LinearProgress from '@material-ui/core/LinearProgress';
//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//icons
import Button from '@material-ui/core/Button';





export default function CountyTable(props) {

  let context = useContext(dataContext);
 

  const today = new Date()


  //useref
  const [table,_setTable] = useState(false);
  const [loaded,setLoaded] = useState(false);
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
    let cases_dict=[]


    let cases_resp=await fetch(`/api/county_cases?state=${state}&county=${county}`)
    let deaths_resp=await fetch(`/api/county_deaths?state=${state}&county=${county}`)
    if (cases_resp.status == 200){

      cases_dict = await cases_resp.json()
    } 

    if (deaths_resp.status == 200) {
      deaths_dict = await deaths_resp.json()
    }
 
  
    let temp=[]
    for(let i=0;i<deaths_dict.length;i++){
        
        let t=createData(deaths_dict[i]["date"],deaths_dict[i]["deaths"],deaths_dict[i]["newdeaths"],cases_dict[i]["cases"],cases_dict[i]["newcases"])
        temp.push(t)
    }
    console.log("what",temp)
    context.setCountyData(temp)
  }

  async function getCountyPop(state,county){
    context.setCountyPop("")
    let pop_resp=await fetch(`/api/county_pop?&state=${state}&county=${county}`)
    if (pop_resp.status !== 200) throw Error(pop_resp.message);
    let pop = await pop_resp.json()
    if(pop.length==0){
      context.setCountyPop("No Data on Pop Found")
      return 
    }
    context.setCountyPop(pop[0])

  }

  async function getCountyVacc(state,county){
    context.setCountyVacc("")
    let countyvacc_dict=[]
    let countyvacc_resp=await fetch(`/api/county_vacc?county=${county}&state=${state}&today`)
    if (countyvacc_resp.status == 200){
      countyvacc_dict = await countyvacc_resp.json()
    } 

    context.setCountyVacc(countyvacc_dict[0]["count"]||"No Data")
  }


    
  function handleclick(){
      context.setShow("stateTable")
  }
 
    
  useEffect(() => {
    if (context.address["state"]==null || context.address["county"]==null){
        return
    }

    let state=context.address["state"]
    let county=context.address["county"]
     create_table(state,county)
     getCountyVacc(state,county)  
     getCountyPop(state,county)    
}, [])
 
  useEffect(() => {
    console.log(context.countydata.length)
    if(context.countydata.length>0&&context.countyvacc)
    setLoaded(true)
  },[context.countydata,context.county_pop, context.countyvacc]);

  useEffect(() => {
    if(loaded){
      setTable(true)
    }
    
  },[loaded]);





  

  if(table==false) {
    return (
      <LinearProgress />
    )
   
  } 
    return (
<div style={{display: "grid",gridTemplateColumns:"5vw 70vw auto",gridTemplateRows:"5vh 5vh 5vh auto"}}>
<b style={{fontSize:"40px",gridColumnStart:"2",gridRowStart:"1",margin:"auto"}}>{context.address["county"]} </b>
<Button variant="contained" color="primary" style={{gridColumnStart:"3",gridRowStart:"1",width:"40%"}} onClick={handleclick}>
{"Switch to State"}
</Button>
<b style={{fontSize:"40px",gridColumnStart:"2",gridRowStart:"2",margin:"auto"}}>County Population: {context.county_pop} </b>
<b style={{fontSize:"40px",gridColumnStart:"2",gridRowStart:"3",margin:"auto"}}>County Fully Vaccinated: {context.countyvacc} </b>
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
  {context.countydata.map((val,index) => (
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


