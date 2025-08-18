import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// Import the modern styling utility and Box component
import { Box, styled } from '@mui/material';

// Note: Removed old imports:
// - classNames
// - makeStyles
// - styles (from assets/jss/...)

// ----------------------------------------------------
// 1. REFACTOR STYLING WITH THE MODERN STYLED() UTILITY
// ----------------------------------------------------

const StyledCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'plain' && prop !== 'carousel',
})(({ theme, ownerState }) => ({
  // Define base card styles
  borderRadius: '6px',
  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
  display: 'inline-block',
  position: 'relative',
  width: '100%',
  margin: '25px 0',
  flexDirection: 'column',
  minWidth: '0',
  wordWrap: 'break-word',
  fontSize: '.875rem',

  // Conditionally apply styles for 'plain' prop
  ...(ownerState.plain && {
    background: 'transparent',
    boxShadow: 'none',
  }),

  // Conditionally apply styles for 'carousel' prop
  ...(ownerState.carousel && {
    overflow: 'hidden',
  }),
}));

// ----------------------------------------------------
// 2. REFACTOR COMPONENT LOGIC
// ----------------------------------------------------

export default function Card(props) {
  const { className, children, plain, carousel, ...rest } = props;

  return (
    <StyledCard 
      className={className} 
      ownerState={{ plain, carousel }}
      {...rest}
    >
      {children}
    </StyledCard>
  );
}

// ----------------------------------------------------
// 3. PROP TYPES (UNTOUCHED)
// ----------------------------------------------------

Card.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  carousel: PropTypes.bool,
  children: PropTypes.node
};