import React from "react";
import { Box, styled } from '@mui/material';
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";
// @mui/icons-material
import People from "@mui/icons-material/People";
import Email from "@mui/icons-material/Email";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// Note: Removed the old imports for makeStyles and the JSS styles file.

// A styled component for the form to handle its own styles
const StyledForm = styled('form')({
  margin: 0,
});

export default function SectionLogin() {
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
        <GridContainer justifyContent="center">
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <StyledForm>
                <CardHeader
                  color="primary"
                  sx={{
                    // Replicates the old `classes.cardHeader` styles
                    width: 'auto',
                    textAlign: 'center',
                    marginLeft: '20px',
                    marginRight: '20px',
                    marginTop: '-40px',
                    padding: '15px 0',
                    boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(156, 39, 176, 0.4)', // Example color
                  }}
                >
                  <h4>Login</h4>
                  <Box sx={{
                    // Replicates the old `classes.socialLine` styles
                    marginTop: '1rem',
                    textAlign: 'center',
                  }}>
                    <Button
                      justIcon
                      href="#pablo"
                      target="_blank"
                      color="transparent"
                      onClick={e => e.preventDefault()}
                      sx={{
                        // Replicates the old `classes.socialIcons` styles
                        margin: '0 5px',
                        '& .fab': {
                          fontSize: '20px',
                          verticalAlign: 'middle',
                        },
                      }}
                    >
                      <Box component="i" className={"fab fa-twitter"} />
                    </Button>
                    <Button
                      justIcon
                      href="#pablo"
                      target="_blank"
                      color="transparent"
                      onClick={e => e.preventDefault()}
                      sx={{
                        margin: '0 5px',
                        '& .fab': {
                          fontSize: '20px',
                          verticalAlign: 'middle',
                        },
                      }}
                    >
                      <Box component="i" className={"fab fa-facebook"} />
                    </Button>
                    <Button
                      justIcon
                      href="#pablo"
                      target="_blank"
                      color="transparent"
                      onClick={e => e.preventDefault()}
                      sx={{
                        margin: '0 5px',
                        '& .fab': {
                          fontSize: '20px',
                          verticalAlign: 'middle',
                        },
                      }}
                    >
                      <Box component="i" className={"fab fa-google-plus-g"} />
                    </Button>
                  </Box>
                </CardHeader>
                <Box sx={{
                  // Replicates the old `classes.divider` styles
                  marginTop: '1.25rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontSize: '12px',
                  position: 'relative',
                }}>
                  Or Be Classical
                </Box>
                <CardBody>
                  <CustomInput
                    labelText="First Name..."
                    id="first"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <People 
                            sx={{
                              // Replicates the old `classes.inputIconsColor`
                              color: "#E0E0E0",
                            }}
                          />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "email",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email 
                            sx={{
                              // Replicates the old `classes.inputIconsColor`
                              color: "#E0E0E0",
                            }}
                          />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="pass"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon 
                            sx={{
                              // Replicates the old `classes.inputIconsColor`
                              color: "#E0E0E0",
                            }}
                          >
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off"
                    }}
                  />
                </CardBody>
                <CardFooter sx={{
                  // Replicates the old `classes.cardFooter` styles
                  padding: '0.9375rem 1.875rem',
                  paddingTop: 0,
                }}>
                  <Button simple color="primary" size="lg">
                    Get started
                  </Button>
                </CardFooter>
              </StyledForm>
            </Card>
          </GridItem>
        </GridContainer>
      </Box>
    </Box>
  );
}