
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";
import React , { useContext ,useState ,useEffect,Fragment,router, isValidElement}from "react";
import { dataContext } from "../../views/tablePage/tablePage.js";

    
export default function Search(props) {
     
  let context = useContext(dataContext);
     const [results, setResults] = useState([]);
      const {
        ready,
        value,
        suggestions: { status, data},
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
          /* Define search scope here */
          types: ['(cities)'],
          componentRestrictions: { country: ["us"]},
        },
        debounce: 300,
      });


  
      useEffect(() => {
        setValue("New York");
      },[]);
      
      useEffect(() => {
        setResults(data)
      },[data]);

      useEffect(() => {
        if(Object.keys(context.address).length>0){
          context.setShow("countyTable")
        }
      },[context.address]);
     

      function setDetails(parameter){
        getDetails(parameter)
        .then((details) => {
          let state=""
          let county=""
          for(let i=0;i<details.address_components.length;i++){
           let temp=details.address_components[i].short_name
           let temp2=details.address_components[i].long_name
           if(temp.length==2&&temp!="US"){
             state=temp
           }
           if(temp2.includes('County')){
             county=temp2
           }
           else if(temp2=="New York" && !county.includes("County")){
             county=`${temp2} County`
           }
  
          }
          context.setAddress({"state":state,"county":county})
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
      }


    
     
    
      const handleInput = (e) => {

        setValue(e.target.value);
      }
      const handleChange = (e,val) => {
        if(val==null){
          return
        }
        const parameter = {
          placeId: val.place_id,
        };
        setDetails(parameter)

       
       
       
       
    
    
       
    
    
      }
    
    
      
      return (
        <Autocomplete
        style={props.style}
        onInputChange={handleInput}
        onChange={handleChange}
          options={results}
          getOptionLabel={(option) => option.description}
          renderInput={(params) => <TextField  {...params} label="Search City" variant="outlined" />}
        />
      );
    }

