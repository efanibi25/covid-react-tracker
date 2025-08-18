import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import SnackbarContentMui from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import { Box } from "@mui/material";

// @mui/icons-material
import Close from "@mui/icons-material/Close";

// Note: Removed the old imports for makeStyles and the JSS styles file.

export default function SnackbarContent(props) {
  const { message, color, close, icon } = props;

  // The sx prop is used to apply styles to the root and message of the SnackbarContent.
  const rootSx = (theme) => ({
    // Replicates the old root styles from your JSS file
    position: 'relative',
    padding: '20px 15px',
    lineHeight: '20px',
    marginBottom: '20px',
    fontSize: '14px',
    borderRadius: '3px',
    boxShadow: '0 12px 20px -10px rgba(0, 0, 0, 0.2), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 0, 0, 0.2)',
    // Conditionally applies the color based on the `color` prop
    backgroundColor: theme.palette[color].main,
    color: '#fff',
  });

  // Styles for the message, replacing classes.message and classes.container
  const messageSx = {
    padding: '0 50px 0 0',
    display: 'block',
  };

  const action = close ? [
    <IconButton
      key="close"
      aria-label="Close"
      color="inherit"
      onClick={props.onClose} // Assumes an `onClose` prop is passed from the parent
      size="large"
      sx={{
        // Styles for the close button
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '9px',
      }}
    >
      <Close sx={{ width: '1.2em', height: '1.2em' }} />
    </IconButton>
  ] : [];

  let snackIcon = null;
  switch (typeof icon) {
    case "object":
      snackIcon = <Box component={icon} sx={{ width: '1.2em', height: '1.2em', marginRight: '5px' }} />;
      break;
    case "string":
      snackIcon = <Icon sx={{ width: '1.2em', height: '1.2em', marginRight: '5px' }}>{icon}</Icon>;
      break;
    default:
      snackIcon = null;
      break;
  }

  return (
    <SnackbarContentMui
      message={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {snackIcon}
          {message}
        </Box>
      }
      sx={rootSx}
      action={action}
    />
  );
}

SnackbarContent.propTypes = {
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};