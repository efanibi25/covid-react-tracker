import React , { useContext ,useState ,useEffect,Fragment,router, isValidElement}from "react";
import Map from 'components/Map/Map.js';
import Places from 'components/Map/Places.js';
import Infocard from 'components/Map/Infocard.js';
import { makeStyles } from "@material-ui/core/styles";

//appbar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

//Links
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import classNames from "classnames";

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
  const [location, setLocation] = useState({
    lat: 39.50,
    lng: -98.35
  });
  const [zoom, setZoom] = useState(5);
  const [card, setCard] = useState(false);
   let shared={address,setAddress,location,setLocation,zoom,setZoom,card,setCard}
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
    style: {width: '35%',top:"10%",position: "absolute",left:"55%"} ,
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
</AppBar >
    <div className={classes.toolbar} />
    <dataContext.Provider value={shared}>    
    <Places/>
      <Map/>
      <Infocard {...props} />
    </dataContext.Provider>
    </Fragment>
  )
}
export default App;