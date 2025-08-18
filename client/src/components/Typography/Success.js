import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';

// Note: The old imports for makeStyles and the JSS styles file are removed.

const StyledSuccess = styled('div')(({ theme }) => ({
  // These styles combine the functionality of `defaultFontStyle` and `successText`.
  // You will need to copy the exact styles from your JSS file here.
  // Example styles:
  color: theme.palette.success.main,
  // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  // fontSize: '1rem',
}));

export default function Success(props) {
  const { children } = props;
  return (
    <StyledSuccess>
      {children}
    </StyledSuccess>
  );
}

Success.propTypes = {
  children: PropTypes.node
};