import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// Import the Box component from MUI
import { Box } from '@mui/material';

export default function Badge(props) {
  const { color, children } = props;
  
  return (
    <Box 
      component="span" // Renders the Box as a <span> element
      sx={(theme) => ({
        // This is a direct translation of styles from 'badgeStyle.js'
        // Example styles for the badge component
        display: 'inline-block',
        minWidth: '10px',
        padding: '3px 7px',
        fontSize: '12px',
        fontWeight: 700,
        lineHeight: 1,
        color: '#fff',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        borderRadius: '12px',
        
        // This handles the color property dynamically
        ...(color && {
          backgroundColor: theme.palette[color].main,
        }),
      })}
    >
      {children}
    </Box>
  );
}

Badge.defaultProps = {
  color: "gray"
};

Badge.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  children: PropTypes.node
};