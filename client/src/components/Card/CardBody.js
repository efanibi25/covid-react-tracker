import React from "react";
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';

// Note: Removed old imports:
// - classNames
// - makeStyles
// - styles (from assets/jss/...)

const StyledCardBody = styled('div')({
  // This is a common style for card body components.
  // You will need to copy the exact styles from your 
  // "assets/jss/material-kit-react/components/cardBodyStyle.js" file here.
  padding: '0.9375rem 1.875rem',
  flex: '1 1 auto',
});

export default function CardBody(props) {
  const { className, children, ...rest } = props;
  
  return (
    <StyledCardBody className={className} {...rest}>
      {children}
    </StyledCardBody>
  );
}

CardBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};