import React, { useState ,useEffect,Fragment,router} from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from 'react-router-dom';



//Card
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { cardTitle } from "assets/jss/material-kit-react.js";
import CardFooter from "components/Card/CardFooter.js";

//InfiniteScroll
import InfiniteScroll from 'react-infinite-scroll-component';
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
//Dict of different style classes

const styles =theme =>({
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
   textMuted: {
    color: "#6c757d"
  },
  toolbar: theme.mixins.toolbar,
})

const useStyles = makeStyles(styles);



export default function Cards(props) {
  document.body.style.background="#808080"
  const { ...rest } = props;
const [items, setitems] = useState([]);
const [allitems, setallitems] = useState([]);
const [hasMore, sethasMore] = useState(true);
const [maxEle, setMaxEle] = useState(50);
  const classes = useStyles();
  let callApi = async () => {
    let list=[]
    console.log(allitems,"dsds")
    if(allitems.length==0){
      const response = await fetch('/newsgrabber');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      let sourcemax=body.length
      for (let i=0;i<sourcemax;i++){
        let title=body[i]['title'];
        let link=body[i]['link'];
        let element=<a href={link}>{title}</a>
        list.push(element);
        console.log(i)
       }

    }
    setallitems(list)
}

function increaseMax(){
  let set=Math.min(maxEle+50,allitems.length)
  setMaxEle(set)
}

function increaseItems(){
  setitems(allitems.slice(0,maxEle))
}



  useEffect(() => {
   callApi()  
 }, [])


 useEffect(() => {
  increaseItems()
}, [maxEle])

useEffect(() => {
  let set=Math.min(50,maxEle)
  setitems(allitems.slice(0,set))
}, [allitems])



 const newsLink = React.forwardRef((props, ref) => (
   <RouterLink ref={ref} to="/news" style={{color:"White"}}{...props}  />
 ));
 const tablesLink = React.forwardRef((props, ref) => (
   <RouterLink ref={ref} to="/tables" style={{color:"White"}}{...props}  />
 ));
 const homeLink = React.forwardRef((props, ref) => (
   <RouterLink ref={ref} to="/" style={{color:"White"}}{...props}  />
 ));
  return (

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
<div style={{ width: '70%',marginLeft:'auto',marginRight:'auto', display:"block"}}>
    <InfiniteScroll
    dataLength={items.length}
    initialScrollY={40}
    next={increaseMax}
    hasMore={hasMore}
    loader={<h4>Loading....</h4>}
    endMessage={
    <p style={{ textAlign: 'center' }}>
    <b>No more results</b>
    </p>
    }

          >
          <Card style={{background:"white"}}>
          <CardHeader style={{background:"#203f00"}}><b style={{color:"white",fontSize:"25px"}}>News Stories</b></CardHeader>
          </Card>
          {items.map((value, index) => (
             <Card style={{background:"white"}}>
            <CardBody>
               <div key={index}> 
                #{index+1}  {value}
                </div>
                </CardBody>

       </Card>
       ))}
      
 











</InfiniteScroll>
</div>




      </Fragment>

  );
}
