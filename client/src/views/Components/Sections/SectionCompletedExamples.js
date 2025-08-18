import React from "react";
import { Box } from '@mui/material';

// core components (assuming these are already refactored)
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// Note: Removed the old imports for makeStyles and the styles file.

export default function SectionCompletedExamples() {
  return (
    <Box sx={{
      // Replicates the old `classes.section` styles
      backgroundPosition: "center",
      backgroundSize: "cover",
      padding: "70px 0",
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
        <GridContainer justifyContent="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2>Completed with examples</h2>
            <h4>
              The kit comes with three pre-built pages to help you get started
              faster. You can change the text and images and you{"'"}re good to
              go. More importantly, looking at them will give you a picture of
              what you can build with this powerful kit.
            </h4>
          </GridItem>
        </GridContainer>
      </Box>
    </Box>
  );
}