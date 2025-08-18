import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// material-ui core components
import { Box, List, ListItem } from "@mui/material";

// @mui/icons-material
import Favorite from "@mui/icons-material/Favorite";

// Note: Removed old imports: makeStyles, classNames, and styles.

export default function Footer(props) {
  const { whiteFont } = props;

  // The base styles are now directly in the `sx` prop
  const footerSx = {
    padding: "0.9375rem 0",
    textAlign: "center",
    display: "flex",
    zIndex: 2,
    position: "relative",
    "& ul": {
      marginBottom: "0",
      padding: "0",
    },
    // Conditionally apply white font styles
    ...(whiteFont && {
      backgroundColor: "transparent",
      "&, & a": {
        color: "#FFFFFF",
      },
    }),
  };

  const leftSx = {
    float: "left",
    display: "block",
  };

  const rightSx = {
    padding: "15px 0",
    margin: "0",
    float: "right",
  };

  const listSx = {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
  };

  const inlineBlockSx = {
    display: "inline-block",
    padding: "0",
    width: "auto",
  };

  const aSx = {
    color: "inherit",
    textDecoration: "none",
    backgroundColor: "transparent",
    "&,&:hover,&:focus": {
      color: "#000000",
    },
    // Conditionally apply white font styles
    ...(whiteFont && {
      "&, &:hover, &:focus": {
        color: "#FFFFFF",
      },
    }),
  };

  const blockSx = {
    color: "inherit",
    textDecoration: "none",
    padding: "15px",
    textTransform: "uppercase",
    borderRadius: "3px",
    position: "relative",
    display: "block",
    fontWeight: "500",
    fontSize: "12px",
    "&:hover, &:focus": {
      textDecoration: "none",
    },
  };

  const iconSx = {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative",
  };

  return (
    <Box component="footer" sx={footerSx}>
      <Box sx={{
        // Replicate container styles from your JSS file
        width: "100%",
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
        "@media (min-width: 576px)": {
          maxWidth: "540px",
        },
        // etc.
      }}>
        <Box sx={leftSx}>
          <List sx={listSx}>
            <ListItem sx={inlineBlockSx}>
              <a href="https://www.creative-tim.com/?ref=mkr-footer" style={blockSx} target="_blank">
                Creative Tim
              </a>
            </ListItem>
            <ListItem sx={inlineBlockSx}>
              <a href="https://www.creative-tim.com/presentation?ref=mkr-footer" style={blockSx} target="_blank">
                About us
              </a>
            </ListItem>
            <ListItem sx={inlineBlockSx}>
              <a href="http://blog.creative-tim.com/?ref=mkr-footer" style={blockSx} target="_blank">
                Blog
              </a>
            </ListItem>
            <ListItem sx={inlineBlockSx}>
              <a href="https://www.creative-tim.com/license?ref=mkr-footer" style={blockSx} target="_blank">
                Licenses
              </a>
            </ListItem>
          </List>
        </Box>
        <Box sx={rightSx}>
          &copy; {1900 + new Date().getYear()} , made with{" "}
          <Favorite sx={iconSx} /> by{" "}
          <a
            href="https://www.creative-tim.com?ref=mkr-footer"
            sx={aSx}
            target="_blank"
          >
            Creative Tim
          </a>{" "}
          for a better web.
        </Box>
      </Box>
    </Box>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};