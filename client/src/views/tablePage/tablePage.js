import React , { useContext ,useState ,useEffect,Fragment,router, isValidElement}from "react";
import Search from 'components/CovidTable/search.js';
import StateTable from 'components/CovidTable/stateTable.js';
import CountyTable from 'components/CovidTable/countyTable.js';
import { makeStyles } from "@material-ui/core/styles";
//appbar
import MenuBar from "views/Components/MenuBar";
//Card
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
//Loading



export const dataContext = React.createContext();
document.body.style.background="#ececec"
const styles =theme =>({
  root: {
    width:"40%",
    right: "50%",
    backgroundColor:"#ececec",
    marginRight:"2%",
  },
  toolbar: theme.mixins.toolbar,
})

const useStyles = makeStyles(styles);

function App() {
  const classes = useStyles();
  const [address, setAddress] = useState({});
  const [location, setLocation] = useState({});
  const [show, setShow] = useState(null);
  const [countydata, setCountyData] = useState([])
  const [statedata, setStateData] = useState([])
  const [county_pop, setCountyPop] = useState(null);
  const [state_pop, setStatePop] = useState(null);
  const [statevacc, setStateVacc] = useState([]);
  const [countyvacc, setCountyVacc] = useState([]);


  let shared={
    address,setAddress,
    location,setLocation,
    setShow,
    countydata,setCountyData,
    statedata,setStateData,
    county_pop,setCountyPop,
    state_pop,setStatePop,
    statevacc,setStateVacc,
    countyvacc,setCountyVacc
  }
  let props = {
    style: {backgroundColor:"White",width:"80%",marginBottom:"5%"} ,
    }
    useEffect(() => {
      console.log(show,"this variable has changed")
    },[show]);
  
  if(show==null){
    return ( 
      <Fragment>
        <MenuBar/>
    <div className={classes.toolbar} />
    <dataContext.Provider value={shared}>  
        <Search {...props}/>    
    </dataContext.Provider>
    <Box  display="flex" color="text.primary" flexDirection="row" justifyContent="center">
    <Card p={1} className={classes.root} style={{backgroundColor:"white"}}>
   <CardContent>
   <h4 style={{fontFamily: "Roboto"}}>How to Use?</h4>
    Search for a city by Name
    <br></br>
    <br></br>
    This will Load Vaccine, Death, and Case Data for the county, that the city resides.
    <br></br>
    Afterwards, you can also view state Data by Click Switch to State
   </CardContent>
    </Card >
</Box>
 

    </Fragment>
    )
  }

  if(show=="countyTable"){
  return(
    <Fragment>
<MenuBar/>
    <div className={classes.toolbar} />
    <dataContext.Provider value={shared}>    
    <Search {...props}/>
    <CountyTable/>
    </dataContext.Provider>
    </Fragment>
  )
  }

  if(show=="stateTable"){
    return(
      <Fragment>
  <MenuBar/>
      <div className={classes.toolbar} />
      <dataContext.Provider value={shared}>    
      <Search {...props}/>
      <StateTable/>
      </dataContext.Provider>
      </Fragment>
    )
    }

}
export default App;