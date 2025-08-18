import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import { Box, List, ListItem, Button } from '@mui/material';

// Note: Removed the old imports for makeStyles, classNames, and the styles file.

// ----------------------------------------------------
// 1. REFACTOR STYLING WITH THE MODERN STYLED() UTILITY
// ----------------------------------------------------

const StyledPagination = styled(List)(({ theme }) => ({
  // Replicates the `pagination` styles from your JSS file
  display: 'flex',
  padding: 0,
  margin: '0 -3px',
}));

const StyledListItem = styled(ListItem)({
  // Replicates the `paginationItem` styles
  padding: 0,
});

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'color',
})(({ theme, ownerState }) => {
  const { color, active, disabled } = ownerState;
  
  // Replicates the base `paginationLink` styles
  const baseStyles = {
    // You must copy the exact styles from your original JSS file
    padding: '12px',
    margin: '0 3px',
    borderRadius: '50%',
    minWidth: 'unset',
    minHeight: 'unset',
    textTransform: 'none',
    fontWeight: 500,
  };

  const activeStyles = {
    // Replicates the `classes[color]` styles for active state
    backgroundColor: theme.palette[color].main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette[color].main,
      opacity: 0.8,
    },
  };

  const disabledStyles = {
    // Replicates the `classes.disabled` styles
    pointerEvents: 'none',
    opacity: 0.65,
  };

  return {
    ...baseStyles,
    ...(active && activeStyles),
    ...(disabled && disabledStyles),
  };
});


// ----------------------------------------------------
// 2. REFACTOR COMPONENT LOGIC
// ----------------------------------------------------

export default function Pagination(props) {
  const { pages, color } = props;
  return (
    <StyledPagination>
      {pages.map((prop, key) => {
        const commonProps = {
          onClick: prop.onClick,
          ownerState: {
            active: prop.active,
            disabled: prop.disabled,
            color: color,
          },
        };
        
        return (
          <StyledListItem key={key}>
            <StyledButton {...commonProps}>
              {prop.text}
            </StyledButton>
          </StyledListItem>
        );
      })}
    </StyledPagination>
  );
}

// ----------------------------------------------------
// 3. PROP TYPES AND DEFAULTS (UNTOUCHED)
// ----------------------------------------------------

Pagination.defaultProps = {
  color: "primary"
};

Pagination.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(["PREV", "NEXT", "..."])
      ]).isRequired,
      onClick: PropTypes.func
    })
  ).isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};