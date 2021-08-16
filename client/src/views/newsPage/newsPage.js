import React, { Fragment,useState,useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';

//Card
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import { cardTitle } from "assets/jss/material-kit-react.js";


//InfiniteScroll
import InfiniteScroll from 'react-infinite-scroll-component';
//appbar
import MenuBar from 'views/Components/MenuBar';

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
  document.body.style.background="#ececec"
  const { ...rest } = props;
const [items, setitems] = useState([]);
const [allitems, setallitems] = useState([]);
const [hasMore, sethasMore] = useState(true);
const [maxEle, setMaxEle] = useState(50);
  const classes = useStyles();
  let callApi = async () => {
    let list=[]
    if(allitems.length==0){
      const response = await fetch('/api/newsgrabber');
      const body = await response.json();
      console.log(body)
      if (response.status !== 200) throw Error(body.message);
      let sourcemax=body.length
      for (let i=0;i<sourcemax;i++){
        let title=body[i]['title'];
        let link=body[i]['link'];
        let element=
        <Link href={link}  color="inherit">
        {title}
      </Link>
        list.push(element);
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
   <Link ref={ref} to="/news" style={{color:"black"}}{...props}  />
 ));
 const tablesLink = React.forwardRef((props, ref) => (
   <Link ref={ref} to="/tables" style={{color:"black"}}{...props}  />
 ));
 const homeLink = React.forwardRef((props, ref) => (
   <Link ref={ref} to="/" style={{color:"black"}}{...props}  />
 ));
  return (

    <Fragment>
<MenuBar/>
    <div className={classes.toolbar} />
<div style={{ width: '70%',marginLeft:'auto',marginRight:'auto', display:"block"}}>
<h1 style={{textAlign: "center"}}>Covid-19 News Feed </h1>
<h3 style={{textAlign: "center"}}>Updated Daily </h3>

    <InfiniteScroll
    dataLength={items.length}
    initialScrollY={40}
    next={increaseMax}
    hasMore={hasMore}
    loader={<LinearProgress></LinearProgress>}
    endMessage={
    <p style={{ textAlign: 'center' }}>
    <b>No more results</b>
    </p>
    }

          >
         
          {items.map((value, index) => (
             <Card style={{background:"white"}} key={index}>
            <CardBody>
               <div key={index}> 
                 {value}
                </div>
                </CardBody>

       </Card>
       ))}
      
 

</InfiniteScroll>
</div>




      </Fragment>

  );
}
