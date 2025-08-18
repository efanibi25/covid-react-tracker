import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";

// Note: Removed the makeStyles import and the styles object.

export default function GridItem(props) {
  const { children, className, ...rest } = props;
  return (
    <Grid
      item
      {...rest}
      className={className}
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "1px",
        paddingRight: "15px",
        paddingLeft: "15px",
        flexBasis: "auto"
      }}
    >
      {children}
    </Grid>
  );
}

GridItem.defaultProps = {
  className: ""
};

GridItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};