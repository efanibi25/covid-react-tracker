import React, { Fragment} from 'react';

//appbar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

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
            <IconButton color="inherit" component={homeLink} to="/">
         Home
          </IconButton>
          <IconButton color="inherit" component={tablesLink}>
       Data
          </IconButton>
          <IconButton color="inherit" component={newsLink}>
        News
          </IconButton>


</Toolbar>
</AppBar>
      </Fragment>

  );
}
