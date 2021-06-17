const express = require('express');
const router=express.Router()
const fetch = require('node-fetch')
const currentdate = new Date().toLocaleDateString('en-CA')
const covidstart="2020-01-22"
router.get('/county_deaths',function(req,res){
confirmedUSA(res,req)
})

router.get('/county_cases',function(req,res){
  casesUSA(res,req)
  })

router.get('/county_pop',function(req,res){
  getPop(res,req)
  })  


  router.get('/state_data',function(req,res){
   

    stateData(req).then(function (val) {
      res.send(val)

  })
      .catch(function (val) {
        console.log(val)
        res.send([])
    })
    
  })

    async function stateData(req){
      const today = new Date()



      if(req.query.state==null){
        return Promise.reject("No State")
      }
      state=req.query.state
      date=req.query.date||today.toLocaleDateString('en-CA')
      let data=[]
      let i=1
      while(data.length==0){
        if (date=="2021-06-13"){
        break
        }
        let url=null
        if(req.query.date=="all"){
          url=`https://data.cdc.gov/resource/9mfq-cb36.json?state=${state}`
        }
        else{
          url=`https://data.cdc.gov/resource/9mfq-cb36.json?state=${state}&submission_date=${date}`
        }
        console.log(url)
        let resp=await fetch(url)
        data=await resp.json()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - i)
        date=yesterday.toLocaleDateString('en-CA')
        i=i+1

      }
      let output={}
      for(let i=0;i<data.length;i++){
        let date=new Date(data[i]["submission_date"]).toLocaleDateString('en-CA')
        data[i]["submission_date"]=date
        output[date]= data[i]
      }    
       return output

      }
    


     
    
     
    




function confirmedUSA(res,req){
  state=req.query.state||""
  county=req.query.county||""
  startDate=req.query.start|| covidstart
  endDate= req.query.end || currentdate
  col2.find({"County Name":`${county} `,"State":state}).project({ _id: 0 ,stateFIPS:0,countyFIPS:0}).toArray(function(err,results){
    if(err){
      console.log("Issue Getting Cases Data")
      return
    }
    if (results.length==0){
     res.send([])
     return
    }
   

      let startdex=Math.max(getDateLimit(results[0],"low",startDate),4)
      let endex=getDateLimit(results[0],"high",endDate)
      keys=Object.keys(results[0])
      let out=[]
      for(let i=startdex;i<endex+1;i++){
        let oldkey=keys[i-1]
        let currkey=keys[i]
        let olddeaths=results[0][oldkey]
        let currdeaths=results[0][currkey]
        out.push({"date":currkey,"deaths":currdeaths,"newdeaths":currdeaths-olddeaths})
      }
      res.send(out)

  })
  
}



function casesUSA(res,req){
  state=req.query.state||""
  county=req.query.county||""
  startDate=req.query.start || covidstart
  endDate= req.query.end || currentdate
  col.find({"County Name":`${county} `,"State":state}).project({ _id: 0 ,stateFIPS:0,countyFIPS:0}).toArray(function(err,results){
    if(err){
      console.log("Issue Getting Cases Data")
      return
    }
    if (results.length==0){
     res.send([])
     return
    }


      let startdex=Math.max(getDateLimit(results[0],"low",startDate),4)
      let endex=getDateLimit(results[0],"high",endDate)
      keys=Object.keys(results[0])
      let out=[]
      for(let i=startdex;i<endex+1;i++){
        let oldkey=keys[i-1]
        let currkey=keys[i]
        let oldcases=results[0][oldkey]
        let currcases=results[0][currkey]
        out.push({"date":currkey,"cases":currcases,"newcases":currcases-oldcases})
      }
      res.send(out)

  })
  
}

function getPop(res,req){
  state=req.query.state
  county=req.query.county
  col3.find({"County Name":`${county}`,"State":state}).project({ _id: 0 ,stateFIPS:0,countyFIPS:0}).toArray(function(err,results){
    if(err){
      console.log("Issue Getting Cases Data")
      return
    }
    console.log(results,results[0]["population"])
    if (results.length==0){
     res.send("")
     return
    }
    res.send([results[0]["population"]])
  })
  
}



function getDateLimit(results,type,compare){
  let list=Object.keys(results)
  if (type=="high"){
    max=list[list.length-1]
    date1=new Date(max)
    date2=new Date(compare)
    if(date1>date2){
      if(list.indexOf(compare)==-1){
        return 4
      }
      return list.indexOf(compare)
    }
    return list.indexOf(max)

  }

  if (type=="low"){
    min=list[3]
    date1=new Date(min)
    date2=new Date(compare)
    if(date1<date2){
      if(list.indexOf(compare)==-1){
        return list.length-1
      }
      return list.indexOf(compare)
    }
    return list.indexOf(min)

  }

}



// //Mongo
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'covid';
// Create a new MongoClient
const client = new MongoClient(url,{ useUnifiedTopology: true });
// Use connect method to connect to the Server
client.connect(function(err, client) {
  console.log("Connected correctly to Covid Database");
  const db = client.db(dbName)
  col = db.collection('covid_confirmed_usafacts');
  col2 = db.collection('covid_deaths_usafacts');
  col3= db.collection('covid_county_population_usafacts');

});
module.exports=router
