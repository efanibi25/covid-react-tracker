import React, { useContext, useState, useEffect, useCallback, useRef } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from 'lodash';
import { } from "../../index.js";
import { DataContext } from "../../index.js";


export default function PlacesSearch(props) {
  const context = useContext(DataContext);
  const [results, setResults] = useState([]);
  const [sessionToken, setSessionToken] = useState(undefined);
  const initialLoad = useRef(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.google) {
      setSessionToken(new window.google.maps.places.AutocompleteSessionToken());
    }
  }, []);

  const handleSelection = useCallback(async (placePrediction) => {
    if (!placePrediction || !context) return;
    const place = placePrediction.toPlace();
    const fields = ['addressComponents', 'location'];
    try {
      await place.fetchFields({ fields });
      let state = "", county = "";
      const { addressComponents, location } = place;

      // Primary Search: Find state and county by type
      for (const component of addressComponents) {
        if (component.types.includes("administrative_area_level_2") || component.types.includes("locality")) {
          county = component.shortText;
        }
        if (component.types.includes("administrative_area_level_1")) {
          state = component.longText;
        }
      }
      county=null
      state=null

      // Secondary Search: Use a bottom-up hierarchical search if values are missing
      if (!state || !county) {
        let componentCount = 0;
        for (let i = addressComponents.length - 1; i >= 0; i--) {
          const component = addressComponents[i];
          if (component.types.includes("country")) {
            continue;
          }
          if (!state && componentCount === 0) {
            state = component.longText;
          } else if (!county && componentCount === 1) {
            county = component.shortText;
          }
          componentCount++;
          if (state && county) {
            break;
          }
        }
      }

      // Update the context with the final data
      context.setAddress({ state, county });
      context.setLocation({ lat: location.lat(), lng: location.lng() });
      context.setZoom(10);
      setSessionToken(new window.google.maps.places.AutocompleteSessionToken());
      setOpen(false);
      context.setCard(true);
      context.setShow('stateTable');
    } catch (error) {
      console.log("Error fetching place details:", error);
    }
  }, [context, sessionToken]);

  const fetchPredictions = useCallback(
    debounce(async (input, callback) => {
      if (!input || !sessionToken) {
        callback([]);
        return;
      }
      const { AutocompleteSuggestion } = await window.google.maps.importLibrary("places");
      const request = { input, sessionToken, includedPrimaryTypes: ['(cities)'], includedRegionCodes: ["us"] };
      try {
        const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
        const adaptedSuggestions = suggestions.map(suggestion => ({
          description: suggestion.placePrediction.text,
          place_id: suggestion.placePrediction.placeId,
          placePrediction: suggestion.placePrediction
        }));
        callback(adaptedSuggestions);
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        callback([]);
      }
    }, 400),
    [sessionToken]
  );

  useEffect(() => {
    if (sessionToken && initialLoad.current) {
      initialLoad.current = false;
      
      const setInitialPlace = async () => {
        const nycPlacePrediction = {
          placeId: 'ChIJOwg_06VPwokRYv534QaPC8g',
          description: { text: 'New York, NY, USA' },
          toPlace: function() {
            return new window.google.maps.places.Place({ id: this.placeId });
          }
        };
        handleSelection(nycPlacePrediction);
        const predictions = await getAutoPredection("New York, NY, USA");
        setResults(predictions);
      };
      
      const getAutoPredection = async (input) => {
        if (!window.google) return [];
        const { AutocompleteSuggestion } = await window.google.maps.importLibrary("places");
        const request = { input, sessionToken, includedPrimaryTypes: ['(cities)'], includedRegionCodes: ["us"] };
        try {
          const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
          return suggestions.map(suggestion => ({
            description: suggestion.placePrediction.text,
            place_id: suggestion.placePrediction.placeId,
            placePrediction: suggestion.placePrediction
          }));
        } catch (error) {
          console.error("Error fetching autocomplete suggestions:", error);
          return [];
        }
      };
      setInitialPlace();
    }
  }, [sessionToken, handleSelection]);

  const handleInputChange = (event, newValue, reason) => {
    if (reason !== 'input') return;
    if (newValue) {
      fetchPredictions(newValue, (predictions) => {
        setResults(predictions);
      });
    } else {
      setResults([]);
    }
  };

  return (
    <Autocomplete
      sx={props.sx}
      options={results || []}
      getOptionLabel={(option) => option?.description?.text || ""}
      onInputChange={handleInputChange}
      open={open}
      onOpen={() => { setOpen(true); }}
      onClose={() => { setOpen(false); }}
      onChange={(event, value) => {
        if (value) {
          handleSelection(value.placePrediction);
        }
      }}
      defaultValue={{
        description: { text: 'New York, NY, USA' },
        place_id: 'ChIJOwg_06VPwokRYv534QaPC8g',
        placePrediction: {
          text: { text: 'New York, NY, USA' },
          placeId: 'ChIJOwg_06VPwokRYv534QaPC8g',
          toPlace: () => ({ id: 'ChIJOwg_06VPwokRYv534QaPC8g' }),
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search City"
          variant="outlined"
        />
      )}
    />
  );
}