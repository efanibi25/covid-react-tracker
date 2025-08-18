import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

// Note: All old imports for makeStyles, classNames, FormControl, InputLabel, and Input are removed.

export default function CustomInput(props) {
  const {
    labelText,
    id,
    inputProps,
    error,
    success,
    white,
    ...rest
  } = props;

  // The 'variant' prop controls the underline and border style. 'standard' is the default.
  // The 'error' prop automatically changes the color of the label and underline to red.
  // We can use the 'sx' prop for any custom styles, like the `white` prop.

  const customSx = {
    // This handles your 'white' prop
    ...(white && {
      '& .MuiInputBase-input': {
        color: '#FFFFFF !important',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: '#FFFFFF !important',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#FFFFFF !important',
      },
      '& .MuiInputLabel-root': {
        color: '#FFFFFF !important',
      },
    }),

    // Your old success logic can be handled with the 'sx' prop
    ...(success && !error && {
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green !important',
      },
    }),
  };

  return (
    <TextField
      label={labelText}
      id={id}
      error={error}
      {...inputProps}
      sx={customSx}
      {...rest}
    />
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object, // Note: This prop is now ignored as TextField handles it internally
  inputRootCustomClasses: PropTypes.string, // Note: This prop is now ignored as TextField handles it internally
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool
};