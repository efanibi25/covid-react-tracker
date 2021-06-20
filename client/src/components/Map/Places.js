
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import usePlacesAutocomplete, { getDetails,getGeocode, getLatLng } from "use-places-autocomplete";
import React , { useContext ,useState ,useEffect,Fragment,router, isValidElement}from "react";
import useIsMounted from 'ismounted';
import { SettingsInputAntenna } from '@material-ui/icons';
import GoogleMapReact from 'google-map-react';
import ScriptTag from 'react-script-tag';
import { dataContext } from "../../views/mapPage/mapPage.js";
import { getSyntheticTrailingComments } from 'typescript';

    
export default function Place(props) {
     
  const context = useContext(dataContext);
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
          //Fix for new york
          context.setAddress({"state":state,"county":county})
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
      }


      function setMap(parameter){
          getGeocode(parameter)
          .then((results) => getLatLng(results[0]))
          .then((latLng) => {

            context.setLocation(latLng)
            context.setZoom(9)
            context.setCard(true)
           
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
        setMap(parameter)
  
    
    
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

