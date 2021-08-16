


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





export default function StateTable(props) {

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
    let state_dict=[]

    let state_resp=await fetch(`/api/state_data?state=${state}&date=all`)

    if (state_resp.status == 200){

      state_dict = await state_resp.json()
    } 

  
    let keys=Object.keys(state_dict)
    keys=keys.sort()
    let temp=[]
    for(let i=0;i<keys.length;i++){
      let key=keys[i]
      let data=state_dict[key] 
      let t=createData(key,data["tot_death"],data["new_death"],data["tot_cases"],data["new_case"])
        temp.push(t)
        
    }

    context.setStateData(temp)
   
  }



  async function getStateVacc(state){
    let statevacc_dict=[]
    context.setStateVacc("")
    let statevacc_resp=await fetch(`/api/state_vacc?state=${state}&today`)
    if (statevacc_resp.status == 200){
      statevacc_dict = await statevacc_resp.json()
    } 
    let count=0
    for(let i=0;i<statevacc_dict.length;i++){
      count=count+statevacc_dict[i]["count"]
      }
      context.setStateVacc(count)
  }

    
  function handleclick(){
    context.setShow("countyTable")
}

 
    

 
  useEffect(() => {
      if (context.address["state"]==null || context.address["county"]==null){
          return
      }

      let state=context.address["state"]
      let county=context.address["county"]
       create_table(state,county)
       getStateVacc(state)     
  }, [])

  useEffect(() => {
    console.log(context.state_pop)
    if(context.statedata.length>0&&context.statevacc)
    setLoaded(true)
  },[context.statedata,context.state_pop, context.statevacc]);

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
<div style={{display: "grid",gridTemplateColumns:"5vw 70vw auto",gridTemplateRows:"5vh 5vh auto"}}>
<b style={{fontSize:"40px",gridColumnStart:"2",gridRowStart:"1",margin:"auto"}}>{context.address["state"]} </b>
<Button variant="contained" color="primary" style={{gridColumnStart:"3",gridRowStart:"1",width:"40%"}} onClick={handleclick}>
{"Switch to County"}
</Button>
<b style={{fontSize:"40px",gridColumnStart:"2",gridRowStart:"2",margin:"auto"}}>State Fully Vaccinated: {context.statevacc} </b>
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
  {context.statedata.map((val,index) => (
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


