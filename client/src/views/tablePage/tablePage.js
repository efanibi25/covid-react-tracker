import React , { useContext ,useState ,useEffect,Fragment,router, isValidElement}from "react";
import Search from 'components/CovidTable/search.js';
import CovidTable from 'components/CovidTable/table.js';
import { makeStyles } from "@material-ui/core/styles";

//appbar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';


//Links
import { Link as RouterLink } from 'react-router-dom';


export const dataContext = React.createContext();

const styles =theme =>({
  textCenter: {
    textAlign: "center"
  },
   textMuted: {
    color: "#6c757d"
  },
  toolbar: theme.mixins.toolbar,
})

const useStyles = makeStyles(styles);

function App() {
  const classes = useStyles();
  const [address, setAddress] = useState({});
  const [location, setLocation] = useState({});



  let shared={address,setAddress,location,setLocation}
  const newsLink = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/news" style={{color:"White"}}{...props}  />
  ));
  const tablesLink = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/tables" style={{color:"White"}}{...props}  />
  ));
  const homeLink = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/" style={{color:"White"}}{...props}  />
  ));
  let props = {
    style: {backgroundColor:"White",width:"80%",marginBottom:"5%"} ,
    }
  return(
    <Fragment>
    <AppBar style={{background:"#00003f"}}>
    <Toolbar>
            <IconButton color="inherit" component={homeLink} to="/">
         Home
          </IconButton>
          <IconButton color="inherit" component={tablesLink}>
        Tables
          </IconButton>
          <IconButton color="inherit" component={newsLink}>
        News
          </IconButton>


</Toolbar>
</AppBar>
    <div className={classes.toolbar} />
    <dataContext.Provider value={shared}>    
    <Search {...props}/>
    <CovidTable/>
    </dataContext.Provider>
    </Fragment>
  )
}
export default App;