import React from "react";
import { Box } from '@mui/material';
// @mui/icons-material
import Check from "@mui/icons-material/Check";
import Warning from "@mui/icons-material/Warning";
// core components (assuming these are already refactored)
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";

// Note: Removed the old imports for makeStyles and the styles file.

export default function SectionNotifications() {
  return (
    <Box sx={{
      // Replicates the old `classes.section` styles
      padding: '70px 0',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}>
      <Box sx={{
        // Replicates the old `classes.container` styles
        paddingRight: '15px',
        paddingLeft: '15px',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '100%',
        zIndex: 12,
        color: '#FFFFFF',
      }}>
        <Box sx={{
          // Replicates the old `classes.title` styles
          textAlign: "center",
          marginBottom: "30px",
          minHeight: "32px",
          textDecoration: "none",
        }}>
          <h3>Notifications</h3>
        </Box>
      </Box>
      <SnackbarContent
        message={
          <span>
            <b>INFO ALERT:</b> You{"'"}ve got some friends nearby, stop looking
            at your phone and find them...
          </span>
        }
        close
        color="info"
        icon="info_outline"
      />
      <SnackbarContent
        message={
          <span>
            <b>SUCCESS ALERT:</b> You{"'"}ve got some friends nearby, stop
            looking at your phone and find them...
          </span>
        }
        close
        color="success"
        icon={Check}
      />
      <SnackbarContent
        message={
          <span>
            <b>WARNING ALERT:</b> You{"'"}ve got some friends nearby, stop
            looking at your phone and find them...
          </span>
        }
        close
        color="warning"
        icon={Warning}
      />
      <SnackbarContent
        message={
          <span>
            <b>DANGER ALERT:</b> You{"'"}ve got some friends nearby, stop
            looking at your phone and find them...
          </span>
        }
        close
        color="danger"
        icon="info_outline"
      />
      <Clearfix />
    </Box>
  );
}