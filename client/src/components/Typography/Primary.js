import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';

// Note: The old imports for makeStyles and the JSS styles file are removed.

const StyledPrimary = styled('div')(({ theme }) => ({
  // These styles combine the functionality of `defaultFontStyle` and `primaryText`.
  // You will need to copy the exact styles from your JSS file here.
  // Example styles:
  color: theme.palette.primary.main,
  // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  // fontSize: '1rem',
}));

export default function Primary(props) {
  const { children } = props;
  return (
    <StyledPrimary>
      {children}
    </StyledPrimary>
  );
}

Primary.propTypes = {
  children: PropTypes.node
};