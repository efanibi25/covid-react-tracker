import React, { Fragment} from 'react';

//appbar
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import { Link as RouterLink } from 'react-router-dom';
//Dict of different style classes





export default function MenuBar(props) {
 const newsLink = React.forwardRef((props, ref) => (
   <RouterLink ref={ref} to="/news" style={{color:"white"}}{...props}  />
 ));
 const tablesLink = React.forwardRef((props, ref) => (
   <RouterLink ref={ref} to="/tables" style={{color:"white"}}{...props}  />
 ));
 const homeLink = React.forwardRef((props, ref) => (
   <RouterLink ref={ref} to="/" style={{color:"white"}}{...props}  />
 ));
  return (
    <Fragment>
      <AppBar style={{background:"#00003f"}}>

      <Toolbar>
              <IconButton color="inherit" component={homeLink} to="/" size="large">
           Home
            </IconButton>
            <IconButton color="inherit" component={tablesLink} size="large">
         Data
            </IconButton>
            <IconButton color="inherit" component={newsLink} size="large">
          News
            </IconButton>


  </Toolbar>
  </AppBar>
    </Fragment>
  );
}
