


import React , { useContext ,useState ,useEffect,Fragment,router, isValidElement,useRef}from "react";
import { dataContext } from "../../views/tablePage/tablePage.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//icons
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root:{
  "grid-column-start":3,
  "grid-row-start":1,
  width:"40%",
  color:"white",
  "background-color":"#442bce"
  },
  label: {
    "font-size":"8px"
  },
});


export default function StateTable(props) {

  let context = useContext(dataContext);
 

  const today = new Date()
  const classes = useStyles();


  //useref
  const [table,_setTable] = useState(false);
  const [loaded,setLoaded] = useState(false);
  const tableRef = useRef(table)
  const setTable = data => {
    tableRef.current = data;
    _setTable(data);
  };

  const [button_text,_setButton_text] = useState("Switch to County");
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
    for(let i=keys.length-1;i>-1;i--){
      let key=keys[i]
      let data=state_dict[key] 
      let t=createData(key,data["tot_death"],data["new_death"],data["tot_cases"],data["new_case"])
        temp.push(t)
        
    }

    context.setStateData(temp)
   
  }



  async function getStateVacc(state){
    let statevacc_dict=[]
    let url=`/api/state_vacc?state=${state}&today`
    // console.log(url)
    let statevacc_resp=await fetch(url)
    if (statevacc_resp.status == 200){
      statevacc_dict = await statevacc_resp.json()
    } 
    let count=0
    // console.log(statevacc_dict)
    for(let i=0;i<statevacc_dict.length;i++){
      count=count+statevacc_dict[i]["count"]
      }
      // console.log(count)
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
  else {  
  
  return (
      <Fragment>
          <Grid container 
         justifyContent="center"
         justify="center"
        container
        direction="row"
          >
        
        <Hidden smDown>
              
              <Grid container item   xs={4} justify='center'>
  
    <b style={{fontSize:"40px","marginLeft":"20%"}}>{context.address["state"]} </b>
     
    </Grid>
    <Grid item>
    <Button 
  variant="contained" 
  onClick={handleclick}
  size="small"
classes={{
root: classes.root, // class name, e.g. `classes-nesting-root-x`
label: classes.label, // class name, e.g. `classes-nesting-label-x`
}}>
Switch to County
</Button>


    </Grid>

 



    <Grid item container  xs={10} justify='center'>
    <b style={{fontSize:"40px"}}>State Fully Vaccinated: {context.statevacc} </b>

      
    </Grid>    

      </Hidden>








            <Hidden mdUp>
              
                      <Grid container item   xs={4} justify='center'>
          
            <b style={{fontSize:"20px"}}>{context.address["state"]} </b>
             
            </Grid>
            <Grid item>
            <Button 
          variant="contained" 
          onClick={handleclick}
          size="small"
        classes={{
       root: classes.root, // class name, e.g. `classes-nesting-root-x`
      label: classes.label, // class name, e.g. `classes-nesting-label-x`
    }}>
Switch to County
</Button>


            </Grid>

         
  
         
   

            <Grid item container  xs={10} justify='center'>
            <b style={{fontSize:"20px"}}>State Fully Vaccinated: {context.statevacc} </b>

              
            </Grid>    
    
              </Hidden>
         


            <Grid item container justify='center' xs={8}>
            <TableContainer style={{"gridColumn":"2/2"}}>
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

              
            </Grid>   


         </Grid>
        </Fragment>
    

  )
  }
    

  
}
