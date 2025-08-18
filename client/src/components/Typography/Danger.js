import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';

// Note: Removed the old imports for makeStyles and the JSS styles file.

const StyledDanger = styled('div')(({ theme }) => ({
  // These styles combine the functionality of `defaultFontStyle` and `dangerText`
  // You will need to copy the exact styles from your JSS file here
  color: theme.palette.danger.main,
  // Example for a font style:
  // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  // fontSize: '1rem',
}));

export default function Danger(props) {
  const { children } = props;
  return (
    <StyledDanger>
      {children}
    </StyledDanger>
  );
}

Danger.propTypes = {
  children: PropTypes.node
};