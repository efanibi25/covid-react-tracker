import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
import { Box } from '@mui/material';

// @mui/icons-material
import LocationOn from "@mui/icons-material/LocationOn";

// core components (assuming these are already refactored)
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import image1 from "assets/img/bg.jpg";
import image2 from "assets/img/bg2.jpg";
import image3 from "assets/img/bg3.jpg";

// Note: Removed old imports for makeStyles and the styles file.

export default function SectionCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };
  return (
    <Box sx={{
      // Replicates classes.section
      backgroundPosition: "center",
      backgroundSize: "cover",
      padding: "70px 0",
    }}>
      <Box sx={{
        // Replicates classes.container
        paddingRight: '15px',
        paddingLeft: '15px',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '100%',
        zIndex: 12,
        color: '#FFFFFF',
      }}>
        <GridContainer justifyContent="center">
          <GridItem xs={12} sm={12} md={8} sx={{
            // Replicates classes.marginAuto
            margin: 'auto',
          }}>
            <Card carousel>
              <Carousel {...settings}>
                <Box>
                  <Box component="img" src={image1} alt="First slide" sx={{
                    // Replicates the old .slick-image class
                    width: '100%',
                  }} />
                  <Box sx={{
                    // Replicates the old .slick-caption class
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: '20px',
                    width: '100%',
                    color: '#fff',
                  }}>
                    <h4>
                      <LocationOn sx={{ marginRight: '5px' }} />
                      Yellowstone National Park, United States
                    </h4>
                  </Box>
                </Box>
                <Box>
                  <Box component="img" src={image2} alt="Second slide" sx={{
                    // Replicates the old .slick-image class
                    width: '100%',
                  }} />
                  <Box sx={{
                    // Replicates the old .slick-caption class
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: '20px',
                    width: '100%',
                    color: '#fff',
                  }}>
                    <h4>
                      <LocationOn sx={{ marginRight: '5px' }} />
                      Somewhere Beyond, United States
                    </h4>
                  </Box>
                </Box>
                <Box>
                  <Box component="img" src={image3} alt="Third slide" sx={{
                    // Replicates the old .slick-image class
                    width: '100%',
                  }} />
                  <Box sx={{
                    // Replicates the old .slick-caption class
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: '20px',
                    width: '100%',
                    color: '#fff',
                  }}>
                    <h4>
                      <LocationOn sx={{ marginRight: '5px' }} />
                      Yellowstone National Park, United States
                    </h4>
                  </Box>
                </Box>
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </Box>
    </Box>
  );
}