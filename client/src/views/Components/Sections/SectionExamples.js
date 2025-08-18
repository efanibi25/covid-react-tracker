import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

// core components (assuming these are already refactored)
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import landing from "assets/img/landing.jpg";
import profile from "assets/img/profile.jpg";

// Note: Removed the old imports for makeStyles and the styles file.

export default function SectionExamples() {
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
          <GridItem xs={12} sm={12} md={6}>
            <Link to="landing-page" style={{
              // Replicates the old `classes.link` styles
              textDecoration: 'none',
              color: 'inherit',
            }}>
              <Box 
                component="img"
                src={landing}
                alt="..."
                sx={{
                  // Replicates the old `classes.imgRaised`, `imgRounded`, and `imgFluid` styles
                  borderRadius: '6px',
                  boxShadow: '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
                  maxWidth: '100%',
                  height: 'auto',
                  verticalAlign: 'middle',
                  border: 0,
                }}
              />
              <Button color="primary" size="lg" simple>
                View landing page
              </Button>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Link to="profile-page" style={{
              // Replicates the old `classes.link` styles
              textDecoration: 'none',
              color: 'inherit',
            }}>
              <Box 
                component="img"
                src={profile}
                alt="..."
                sx={{
                  // Replicates the old `classes.imgRaised`, `imgRounded`, and `imgFluid` styles
                  borderRadius: '6px',
                  boxShadow: '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
                  maxWidth: '100%',
                  height: 'auto',
                  verticalAlign: 'middle',
                  border: 0,
                }}
              />
              <Button color="primary" size="lg" simple>
                View profile page
              </Button>
            </Link>
          </GridItem>
        </GridContainer>
      </Box>
    </Box>
  );
}