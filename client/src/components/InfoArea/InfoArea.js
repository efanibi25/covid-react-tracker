import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { styled, Box } from '@mui/material';

// Note: Removed the old imports for makeStyles, classNames, and the JSS styles file.

// ----------------------------------------------------
// 1. REFACTOR STYLING WITH THE MODERN STYLED() UTILITY
// ----------------------------------------------------

const StyledInfoArea = styled('div')({
  padding: '10px 0',
  display: 'flex',
});

const StyledIconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'iconColor' && prop !== 'vertical',
})(({ theme, ownerState }) => ({
  // Base styles for the icon wrapper
  borderRadius: '3px',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // You must copy the exact styles from your original JSS file
  // Conditionally apply icon color styles
  ...(ownerState.iconColor && {
    color: theme.palette[ownerState.iconColor].main,
  }),
  // Conditionally apply vertical styles
  ...(ownerState.vertical && {
    width: '100%',
    '& svg': {
      width: '30px',
      height: '30px',
    },
  }),
}));

const StyledDescriptionWrapper = styled('div')({
  color: '#999',
  overflow: 'hidden',
  marginLeft: '14px',
});

const StyledTitle = styled('h4')({
  color: '#3C4858',
  margin: '0',
  marginBottom: '7px',
  textDecoration: 'none',
});

const StyledDescription = styled('p')({
  color: '#999',
  overflow: 'hidden',
  marginTop: '0',
  marginBottom: '0',
});

// ----------------------------------------------------
// 2. REFACTOR COMPONENT LOGIC
// ----------------------------------------------------

export default function InfoArea(props) {
  const { title, description, iconColor, vertical, icon: IconComponent } = props;

  return (
    <StyledInfoArea>
      <StyledIconWrapper ownerState={{ iconColor, vertical }}>
        <IconComponent
          sx={{
            // Styles for the icon itself
            width: '24px',
            height: '24px',
          }}
        />
      </StyledIconWrapper>
      <StyledDescriptionWrapper>
        <StyledTitle>{title}</StyledTitle>
        <StyledDescription>{description}</StyledDescription>
      </StyledDescriptionWrapper>
    </StyledInfoArea>
  );
}

// ----------------------------------------------------
// 3. PROP TYPES AND DEFAULTS (UNTOUCHED)
// ----------------------------------------------------

InfoArea.defaultProps = {
  iconColor: "gray"
};

InfoArea.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  vertical: PropTypes.bool
};