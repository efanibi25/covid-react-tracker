import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';

// Note: The old imports for makeStyles and the JSS styles file are removed.

const StyledInfo = styled('div')(({ theme }) => ({
  // These styles combine the functionality of `defaultFontStyle` and `infoText`.
  // You will need to copy the exact styles from your JSS file here.
  // Example styles:
  color: theme.palette.info.main,
  // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  // fontSize: '1rem',
}));

export default function Info(props) {
  const { children } = props;
  return (
    <StyledInfo>
      {children}
    </StyledInfo>
  );
}

Info.propTypes = {
  children: PropTypes.node
};