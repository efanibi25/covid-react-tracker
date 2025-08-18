

import React from "react";
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// Note: The old imports for makeStyles, classNames, and the JSS styles file are removed.

const StyledCardHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'plain',
})(({ theme, ownerState }) => ({
  // Define the base styles for the card header
  width: '100%',
  zIndex: '3',
  position: 'relative',
  // You must copy the exact styles for `cardHeader` from your original JSS file
  // For example:
  borderRadius: '3px',
  padding: '15px 20px',
  marginLeft: '15px',
  marginRight: '15px',
  marginTop: '-30px',
  border: '0',
  marginBottom: '0',

  // Conditionally apply styles based on the 'color' prop
  ...(ownerState.color && {
    color: theme.palette.getContrastText(theme.palette[ownerState.color].main),
    background: theme.palette[ownerState.color].main,
    boxShadow: `0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px ${theme.palette[ownerState.color].main}60`,
  }),

  // Conditionally apply styles for the 'plain' prop
  ...(ownerState.plain && {
    background: 'transparent',
    boxShadow: 'none',
  }),
}));

export default function CardHeader(props) {
  const { className, children, color, plain, ...rest } = props;
  
  return (
    <StyledCardHeader
      className={className}
      ownerState={{ color, plain }}
      {...rest}
    >
      {children}
    </StyledCardHeader>
  );
}

CardHeader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(["warning", "success", "danger", "info", "primary"]),
  plain: PropTypes.bool,
  children: PropTypes.node
};