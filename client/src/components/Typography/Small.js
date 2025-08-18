import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';

// Note: The old imports for makeStyles and the JSS styles file are removed.

const StyledSmall = styled('div')(({ theme }) => ({
  // These styles combine the functionality of `defaultFontStyle` and `smallText`.
  // You will need to copy the exact styles from your JSS file here.
  // Example styles:
  color: theme.palette.text.secondary, // or a specific muted color
  fontSize: '75%', // or the specific small size
  // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  // etc.
}));

export default function Small(props) {
  const { children } = props;
  return (
    <StyledSmall>
      {children}
    </StyledSmall>
  );
}

Small.propTypes = {
  children: PropTypes.node
};