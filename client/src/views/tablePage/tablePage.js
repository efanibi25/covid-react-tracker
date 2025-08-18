import React , { useContext ,useState ,useEffect, Fragment}from "react";
import Search from 'components/CovidTable/search.js';
import StateTable from 'components/CovidTable/stateTable.js';
import CountyTable from 'components/CovidTable/countyTable.js';
//appbar
import MenuBar from "views/Components/MenuBar";
//Card
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// Note: The old `makeStyles` hook has been removed.

export const dataContext = React.createContext();
document.body.style.background="#ececec"

function App() {
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
  
  useEffect(() => {
    console.log(show,"this variable has changed")
  },[show]);
  
  if(show==null){
    return ( 
      <Fragment>
        <MenuBar/>
        {/* The Box component below replaces the old div with classes.toolbar */}
        <Box sx={(theme) => ({...theme.mixins.toolbar})} />
        <dataContext.Provider value={shared}>  
          <Search sx={{backgroundColor:"White", width:"80%", marginBottom:"5%"}}/>
        </dataContext.Provider>
        <Box display="flex" color="text.primary" flexDirection="row" justifyContent="center">
          <Card 
            sx={{
              p:1,
              width: "40%",
              marginRight: "2%",
              backgroundColor: "white"
            }}
          >
            <CardContent>
              <h4 style={{fontFamily: "Roboto"}}>How to Use?</h4>
              Search for a city by Name
              <br></br>
              <br></br>
              This will Load Vaccine, Death, and Case Data for the county, that the city resides.
              <br></br>
              Afterwards, you can also view state Data by Click Switch to State
            </CardContent>
          </Card>
        </Box>
      </Fragment>
    )
  }

  if(show=="countyTable"){
    return(
      <Fragment>
        <MenuBar/>
        {/* The Box component below replaces the old div with classes.toolbar */}
        <Box sx={(theme) => ({...theme.mixins.toolbar})} />
        <dataContext.Provider value={shared}>    
          <Search sx={{backgroundColor:"White", width:"80%", marginBottom:"5%"}}/>
          <CountyTable/>
        </dataContext.Provider>
      </Fragment>
    )
  }

  if(show=="stateTable"){
    return(
      <Fragment>
        <MenuBar/>
        {/* The Box component below replaces the old div with classes.toolbar */}
        <Box sx={(theme) => ({...theme.mixins.toolbar})} />
        <dataContext.Provider value={shared}>    
          <Search sx={{backgroundColor:"White", width:"80%", marginBottom:"5%"}}/>
          <StateTable/>
        </dataContext.Provider>
      </Fragment>
    )
  }
}
export default App;
