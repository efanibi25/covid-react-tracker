import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import { useTheme } from "@mui/material/styles";

// Note: Removed the old imports for makeStyles and the JSS styles file.

export default function CustomLinearProgress(props) {
  const theme = useTheme();
  const { color, ...rest } = props;

  // The sx prop is used to apply custom styles.
  // We can target specific parts of the LinearProgress component using CSS selectors.
  return (
    <LinearProgress
      {...rest}
      sx={{
        // Replicates the old classes.root and classes.bar styles
        // Note: You will need to copy the exact styles from your original JSS file
        // Here are some common examples of those styles:
        height: '6px',
        borderRadius: '3px',
        backgroundColor: '#eee',
        // The `&` symbol targets the component itself
        '& .MuiLinearProgress-bar': {
          borderRadius: '3px',
        },

        // This applies the color styles conditionally, replacing classes[color + "Background"] and classes[color]
        backgroundColor: theme.palette[color].light, // Or the specific color for the background
        '& .MuiLinearProgress-bar': {
          backgroundColor: theme.palette[color].main, // Or the specific color for the bar
        },
      }}
    />
  );
}

CustomLinearProgress.defaultProps = {
  color: "gray"
};

CustomLinearProgress.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ])
};