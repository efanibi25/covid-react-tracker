import React from "react";
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";

// NOTE: The old imports for makeStyles, classNames, and buttonStyle.js are removed.

// We create a new styled component based on the MUI Button component.
// The `shouldForwardProp` option prevents our custom props from being passed down to the DOM element,
// which prevents React from throwing warnings.
const RegularButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'simple' && prop !== 'round' && prop !== 'justIcon'
    && prop !== 'fullWidth' && prop !== 'link' && prop !== 'block' && prop !== 'color' && prop !== 'size',
})(({ theme, ownerState }) => {

  const { color, size, round, fullWidth, simple, block, link, justIcon } = ownerState;

  // You will need to copy the exact styles from your original 'buttonStyle.js' file here.
  // This is a direct translation of the classNames logic into a styled component.
  return {
    // Styles for the base button (was classes.button)
    // Example:
    borderRadius: '30px',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .14)',
    // Add all other base button styles from buttonStyle.js

    // Conditionally applied styles based on props
    ...(round && {
      borderRadius: '30px',
    }),

    ...(fullWidth && {
      width: '100%',
    }),

    // Example for `size` prop
    ...(size === 'sm' && {
      padding: '7px 15px',
    }),
    ...(size === 'lg' && {
      padding: '12px 30px',
    }),

    // Example for `color` prop
    ...(color && {
      backgroundColor: theme.palette[color].main,
      color: theme.palette.getContrastText(theme.palette[color].main),
      // Add other color-specific styles like box-shadow
    }),

    // Styles for simple, block, link, and justIcon props
    ...(simple && {
      // styles for simple button
    }),
    ...(block && {
      // styles for block button
    }),
    ...(link && {
      // styles for link button
    }),
    ...(justIcon && {
      // styles for justIcon button
    }),
  };
});

// We still define propTypes and defaultProps on the final component.
RegularButton.propTypes = {
  color: PropTypes.oneOf([
    "primary", "info", "success", "warning", "danger", "rose", "white",
    "facebook", "twitter", "google", "github", "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};

export default RegularButton;