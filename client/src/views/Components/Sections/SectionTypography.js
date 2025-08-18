import React from "react";
import { Box } from '@mui/material';

// core components (assuming these are already refactored)
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Small from "components/Typography/Small.js";
import Danger from "components/Typography/Danger.js";
import Warning from "components/Typography/Warning.js";
import Success from "components/Typography/Success.js";
import Info from "components/Typography/Info.js";
import Primary from "components/Typography/Primary.js";
import Muted from "components/Typography/Muted.js";
import Quote from "components/Typography/Quote.js";

import image from "assets/img/faces/avatar.jpg";

// Note: Removed the old imports for makeStyles, classNames, and the styles file.

export default function SectionTypography() {
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
        <Box id="typography">
          <Box sx={{
            // Replicates the old `classes.title` styles
            textAlign: "center",
            marginBottom: "30px",
            minHeight: "32px",
            textDecoration: "none",
          }}>
            <h2>Typography</h2>
          </Box>
          <GridContainer>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Header 1</Box>
              <h1>The Life of Material Kit</h1>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Header 2</Box>
              <h2>The Life of Material Kit</h2>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Header 3</Box>
              <h3>The Life of Material Kit</h3>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Header 4</Box>
              <h4>The Life of Material Kit</h4>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Header 5</Box>
              <h5>The Life of Material Kit</h5>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Header 6</Box>
              <h6>The Life of Material Kit</h6>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Header 1</Box>
              <h1 sx={{
                // Replicates the old `classes.title` styles
                textAlign: "center",
                marginBottom: "30px",
                minHeight: "32px",
                textDecoration: "none",
              }}>The Life of Material Kit</h1>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Header 2</Box>
              <h2 sx={{
                // Replicates the old `classes.title` styles
                textAlign: "center",
                marginBottom: "30px",
                minHeight: "32px",
                textDecoration: "none",
              }}>The Life of Material Kit</h2>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Header 3</Box>
              <h3 sx={{
                // Replicates the old `classes.title` styles
                textAlign: "center",
                marginBottom: "30px",
                minHeight: "32px",
                textDecoration: "none",
              }}>The Life of Material Kit</h3>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Header 4</Box>
              <h4 sx={{
                // Replicates the old `classes.title` styles
                textAlign: "center",
                marginBottom: "30px",
                minHeight: "32px",
                textDecoration: "none",
              }}>The Life of Material Kit</h4>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Paragraph</Box>
              <p>
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers. I understand
                culture. I am the nucleus. I think that’s a responsibility that
                I have, to push possibilities, to show people, this is the level
                that things could be at.
              </p>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Quote</Box>
              <Quote
                text="I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at."
                author=" Kanye West, Musician"
              />
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Muted Text</Box>
              <Muted>
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers...
              </Muted>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Primary Text</Box>
              <Primary>
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers...
              </Primary>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Info Text</Box>
              <Info>
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers...
              </Info>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Success Text</Box>
              <Success>
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers...
              </Success>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Warning Text</Box>
              <Warning>
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers...
              </Warning>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Danger Text</Box>
              <Danger>
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers...
              </Danger>
            </Box>
            <Box sx={{
              // Replicates the old `classes.typo` styles
              paddingRight: "15px",
              paddingLeft: "15px",
            }}>
              <Box sx={{
                // Replicates the old `classes.note` styles
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                bottom: "-6px",
                color: "#c0c0c0",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "13px",
                left: "0",
                marginLeft: "20px",
                position: "relative",
                width: "100%",
              }}>Small Tag</Box>
              <h2>
                Header with small subtitle
                <br />
                <Small>Use {'"Small"'} tag for the headers</Small>
              </h2>
            </Box>
          </GridContainer>
        </Box>
        <Box sx={{
          // Replicates the old `classes.space50` styles
          height: '50px',
          display: 'block',
        }} />
        <Box id="images">
          <Box sx={{
            // Replicates the old `classes.title` styles
            textAlign: "center",
            marginBottom: "30px",
            minHeight: "32px",
            textDecoration: "none",
          }}>
            <h2>Images</h2>
          </Box>
          <br />
          <GridContainer>
            <GridItem xs={12} sm={2}>
              <h4>Rounded Image</h4>
              <Box
                component="img"
                src={image}
                alt="..."
                sx={{
                  // Replicates the old `classes.imgRounded` and `classes.imgFluid`
                  borderRadius: '6px',
                  maxWidth: '100%',
                  height: 'auto',
                  verticalAlign: 'middle',
                  border: 0,
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={2} sx={{ marginLeft: '15px !important' }}>
              <h4>Circle Image</h4>
              <Box
                component="img"
                src={image}
                alt="..."
                sx={{
                  // Replicates the old `classes.imgRoundedCircle` and `classes.imgFluid`
                  borderRadius: '50%',
                  maxWidth: '100%',
                  height: 'auto',
                  verticalAlign: 'middle',
                  border: 0,
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={2} sx={{ marginLeft: '15px !important' }}>
              <h4>Rounded Raised</h4>
              <Box
                component="img"
                src={image}
                alt="..."
                sx={{
                  // Replicates the old `classes.imgRaised`, `imgRounded`, and `imgFluid`
                  boxShadow: '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
                  borderRadius: '6px',
                  maxWidth: '100%',
                  height: 'auto',
                  verticalAlign: 'middle',
                  border: 0,
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={2} sx={{ marginLeft: '15px !important' }}>
              <h4>Circle Raised</h4>
              <Box
                component="img"
                src={image}
                alt="..."
                sx={{
                  // Replicates the old `classes.imgRaised`, `imgRoundedCircle`, and `imgFluid`
                  boxShadow: '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
                  borderRadius: '50%',
                  maxWidth: '100%',
                  height: 'auto',
                  verticalAlign: 'middle',
                  border: 0,
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer />
        </Box>
        <Box sx={{
          // Replicates the old `classes.space50` styles
          height: '50px',
          display: 'block',
        }} />
      </Box>
    </Box>
  );
}