import React , { useContext ,useState ,useEffect,Fragment,router, isValidElement}from "react";
import Map from 'components/Map/Map.js';
import Places from 'components/Map/Places.js';
import Infocard from 'components/Map/Infocard.js';
import { makeStyles } from "@material-ui/core/styles";

//appbar
import MenuBar from 'views/Components/MenuBar';

//Links
import { Link as RouterLink } from 'react-router-dom';


export const dataContext = React.createContext();
document.body.style.background="#ececec"
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
    style: {width: '35%',top:"10%",position: "absolute",left:"55%",backgroundColor:"White"} ,
    }
  return(
    <Fragment>
<MenuBar/>
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