import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

// core components (assuming these are already refactored)
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionBasics from "./Sections/SectionBasics.js";
import SectionNavbars from "./Sections/SectionNavbars.js";
import SectionTabs from "./Sections/SectionTabs.js";
import SectionPills from "./Sections/SectionPills.js";
import SectionNotifications from "./Sections/SectionNotifications.js";
import SectionTypography from "./Sections/SectionTypography.js";
import SectionJavascript from "./Sections/SectionJavascript.js";
import SectionCarousel from "./Sections/SectionCarousel.js";
import SectionCompletedExamples from "./Sections/SectionCompletedExamples.js";
import SectionLogin from "./Sections/SectionLogin.js";
import SectionExamples from "./Sections/SectionExamples.js";
import SectionDownload from "./Sections/SectionDownload.js";

// Note: Removed the old imports for makeStyles, classNames, and the styles file.

export default function Components(props) {
  const { ...rest } = props;
  return (
    <Box>
      <Header
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/bg4.jpg")}>
        <Box sx={{
          // Replicates the old container class styles
          zIndex: 12,
          color: '#FFFFFF',
          paddingRight: '15px',
          paddingLeft: '15px',
          marginRight: 'auto',
          marginLeft: 'auto',
          width: '100%',
        }}>
          <GridContainer>
            <GridItem>
              <Box sx={{
                // Replicates the old brand class styles
                color: '#FFFFFF',
                textAlign: 'left',
              }}>
                <Box component="h1" sx={{
                  // Replicates the old title class styles
                  fontSize: '4.2rem',
                  fontWeight: 600,
                  display: 'inline-block',
                  position: 'relative',
                }}>
                  Material Kit React.
                </Box>
                <Box component="h3" sx={{
                  // Replicates the old subtitle class styles
                  fontSize: '1.313rem',
                  maxWidth: '500px',
                  margin: '10px 0 0',
                }}>
                  A Badass Material-UI Kit based on Material Design.
                </Box>
              </Box>
            </GridItem>
          </GridContainer>
        </Box>
      </Parallax>

      <Box sx={{
        // Replicates the old main and mainRaised class styles
        position: 'relative',
        zIndex: 3,
        background: '#FFFFFF',
        boxShadow: '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
        margin: '-60px 30px 0',
        borderRadius: '6px',
      }}>
        <SectionBasics />
        <SectionNavbars />
        <SectionTabs />
        <SectionPills />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavascript />
        <SectionCarousel />
        <SectionCompletedExamples />
        <SectionLogin />
        <GridItem md={12} sx={{
          // Replicates the old textCenter class styles
          textAlign: 'center',
        }}>
          <Link to={"/login-page"} style={{
            // Replicates the old link class styles
            color: 'inherit',
            textDecoration: 'none',
          }}>
            <Button color="primary" size="lg" simple>
              View Login Page
            </Button>
          </Link>
        </GridItem>
        <SectionExamples />
        <SectionDownload />
      </Box>
      <Footer />
    </Box>
  );
}