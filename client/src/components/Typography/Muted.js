import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';

// Note: The old imports for makeStyles and the JSS styles file are removed.

const StyledMuted = styled('div')(({ theme }) => ({
  // These styles combine the functionality of `defaultFontStyle` and `mutedText`.
  // You will need to copy the exact styles from your JSS file here.
  // Example styles:
  color: theme.palette.text.secondary, // or a specific muted color
  // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  // fontSize: '1rem',
}));

export default function Muted(props) {
  const { children } = props;
  return (
    <StyledMuted>
      {children}
    </StyledMuted>
  );
}

Muted.propTypes = {
  children: PropTypes.node
};