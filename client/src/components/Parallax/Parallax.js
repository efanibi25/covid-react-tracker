import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';

// Note: Removed old imports: makeStyles, classNames, and the styles file.

// ----------------------------------------------------
// 1. REFACTOR STYLING WITH THE MODERN STYLED() UTILITY
// ----------------------------------------------------

const StyledParallax = styled('div', {
  shouldForwardProp: (prop) => prop !== 'filter' && prop !== 'small',
})(({ ownerState }) => ({
  // Define base parallax styles
  height: '90vh',
  maxHeight: '1600px',
  overflow: 'hidden',
  position: 'relative',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  margin: '0',
  padding: '0',
  border: '0',
  display: 'flex',
  alignItems: 'center',
  // You will need to add more styles from `parallaxStyle.js`

  // Conditional styles for `filter`
  ...(ownerState.filter && {
    '&:after': {
      position: 'absolute',
      zIndex: 1,
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: '""',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  }),

  // Conditional styles for `small`
  ...(ownerState.small && {
    height: '380px',
  }),
}));

// ----------------------------------------------------
// 2. REFACTOR COMPONENT LOGIC
// ----------------------------------------------------

export default function Parallax(props) {
  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }
  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );
  
  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  }, []); // Added empty dependency array for cleanup

  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };
  
  const { filter, className, children, style, image, small } = props;

  return (
    <StyledParallax
      className={className}
      ownerState={{ filter, small }}
      style={{
        ...style,
        backgroundImage: "url(" + image + ")",
        transform: transform
      }}
    >
      {children}
    </StyledParallax>
  );
}

// ----------------------------------------------------
// 3. PROP TYPES (UNTOUCHED)
// ----------------------------------------------------

Parallax.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.object, // Changed from string to object to reflect modern usage
  image: PropTypes.string,
  small: PropTypes.bool
};