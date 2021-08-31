


import React , { useContext ,useState ,useEffect,Fragment,router, isValidElement,useRef}from "react";
import { dataContext } from "../../views/tablePage/tablePage.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
  color:"white",
  "background-color":"#442bce"
  },
  label: {
    textTransform: 'capitalize',
    height:"100%",
    width:"100%"
  },
});



export default function CountyTable(props) {

  let context = useContext(dataContext);
  const classes = useStyles();

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

    let url1=`/api/county_cases?state=${state}&county=${county}`
    let url2=`/api/county_deaths?state=${state}&county=${county}`
    // console.log(url1,url2)


    let cases_resp=await fetch(url1)
    let deaths_resp=await fetch(url2 )
    if (cases_resp.status == 200){
      cases_dict = await cases_resp.json()
    } 

    if (deaths_resp.status == 200) {
      deaths_dict = await deaths_resp.json()
    }
    console.log(deaths_dict,cases_dict)
  
    let temp=[]
    for(let i=deaths_dict.length-1;i>0;i--){
        
        let t=createData(deaths_dict[i]["date"],deaths_dict[i]["deaths"],deaths_dict[i]["newdeaths"],cases_dict[i]["cases"],cases_dict[i]["newcases"])
        temp.push(t)
    }
    context.setCountyData(temp)
  }

  async function getCountyPop(state,county){
    context.setCountyPop("")
    let url=`/api/county_pop?&state=${state}&county=${county}`
    // console.log(url)
    let pop_resp=await fetch(url)
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
    let url=`/api/county_vacc?county=${county}&state=${state}&today`
    console.log(url)
    let countyvacc_resp=await fetch(url)
    if (countyvacc_resp.status == 200){
      countyvacc_dict = await countyvacc_resp.json()
    } 
    // console.log(countyvacc_dict)
  

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
}, [context.address])
 
  useEffect(() => {
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
  
    <b style={{fontSize:"40px","marginLeft":"20%"}}>{context.address["county"]} </b>
     
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
Switch to State
</Button>


    </Grid>

 

 
    <Grid container  item xs={10} justify='center'> 
    <b style={{fontSize:"40px"}}>County Population: {context.county_pop} </b>

      
    </Grid>     

    <Grid item container  xs={10} justify='center'>
    <b style={{fontSize:"40px"}}>County Fully Vaccinated: {context.countyvacc} </b>

      
    </Grid>    

      </Hidden>








            <Hidden mdUp>
              
              <Grid container item   xs={4} justify='center'>
          
            <b style={{fontSize:"20px"}}>{context.address["county"]} </b>
             
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
Switch to State
</Button>


            </Grid>

         
  
         
            <Grid container  item xs={10} justify='center'> 
            <b style={{fontSize:"20px"}}>County Population: {context.county_pop} </b>

              
            </Grid>     

            <Grid item container  xs={10} justify='center'>
            <b style={{fontSize:"20px"}}>County Fully Vaccinated: {context.countyvacc} </b>

              
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

              
            </Grid>   


         </Grid>
        </Fragment>
    

  )
  }
    

  
}


