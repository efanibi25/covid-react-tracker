import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// Import the modern Grid component
import Grid from "@mui/material/Grid";

// Note: The makeStyles import and the styles object are removed.

export default function GridContainer(props) {
  const { children, className, ...rest } = props;
  return (
    <Grid
      container
      {...rest}
      className={className}
      sx={{
        marginRight: "-15px",
        marginLeft: "-15px",
        width: "auto"
      }}
    >
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: ""
};

GridContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};