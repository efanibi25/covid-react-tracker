import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { Box, List, ListItem, Icon } from "@mui/material";

// @mui/icons-material
import Search from "@mui/icons-material/Search";
import Email from "@mui/icons-material/Email";
import Face from "@mui/icons-material/Face";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Explore from "@mui/icons-material/Explore";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Header from "components/Header/Header.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import image from "assets/img/bg.jpg";
import profileImage from "assets/img/faces/avatar.jpg";

// Note: Removed the old imports for makeStyles and the styles file.

export default function SectionNavbars() {
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
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Box sx={{
              // Replicates the old `classes.title` styles
              textAlign: "center",
              marginBottom: "30px",
              minHeight: "32px",
              textDecoration: "none",
            }}>
              <h3>Menu</h3>
            </Box>
            <Header
              brand="Menu"
              color="primary"
              leftLinks={
                <List sx={{
                  // Replicates the old `classes.list` styles
                  display: "flex",
                  padding: "0",
                  margin: "0",
                }}>
                  <ListItem sx={{
                    // Replicates the old `classes.listItem` styles
                    padding: "0",
                  }}>
                    <Button
                      href="#pablo"
                      sx={{
                        // Replicates the old `classes.navLink` styles
                        color: "inherit",
                      }}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      Link
                    </Button>
                  </ListItem>
                  <ListItem sx={{
                    // Replicates the old `classes.listItem` styles
                    padding: "0",
                  }}>
                    <Button
                      href="#pablo"
                      sx={{
                        // Replicates the old `classes.navLink` styles
                        color: "inherit",
                      }}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      Link
                    </Button>
                  </ListItem>
                  <ListItem sx={{
                    // Replicates the old `classes.listItem` styles
                    padding: "0",
                  }}>
                    <CustomDropdown
                      noLiPadding
                      buttonText="Dropdown"
                      dropdownHeader="Dropdown Header"
                      buttonProps={{
                        sx: {
                          // Replicates the old `classes.navLink` styles
                          color: "transparent",
                        }
                      }}
                      dropdownList={[
                        "Action",
                        "Another action",
                        "Something else here",
                        { divider: true },
                        "Separated link",
                        { divider: true },
                        "One more separated link"
                      ]}
                    />
                  </ListItem>
                </List>
              }
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Box sx={{
              // Replicates the old `classes.title` styles
              textAlign: "center",
              marginBottom: "30px",
              minHeight: "32px",
              textDecoration: "none",
            }}>
              <h3>Menu with Icons</h3>
            </Box>
            <Header
              brand="Icons"
              color="info"
              rightLinks={
                <List sx={{
                  // Replicates the old `classes.list` styles
                  display: "flex",
                  padding: "0",
                  margin: "0",
                }}>
                  <ListItem sx={{
                    // Replicates the old `classes.listItem` styles
                    padding: "0",
                  }}>
                    <Button color="transparent" sx={{
                      // Replicates the old `classes.navLink` styles
                      color: "inherit",
                    }}>
                      <Email sx={{ marginRight: '5px' }} />
                    </Button>
                  </ListItem>
                  <ListItem sx={{
                    // Replicates the old `classes.listItem` styles
                    padding: "0",
                  }}>
                    <Button color="transparent" sx={{
                      // Replicates the old `classes.navLink` styles
                      color: "inherit",
                    }}>
                      <Face sx={{ marginRight: '5px' }} />
                    </Button>
                  </ListItem>
                  <ListItem sx={{
                    // Replicates the old `classes.listItem` styles
                    padding: "0",
                  }}>
                    <CustomDropdown
                      left
                      hoverColor="info"
                      dropdownHeader="Dropdown Header"
                      buttonIcon="settings"
                      buttonProps={{
                        sx: {
                          // Replicates the old `classes.navLink` styles
                          color: "transparent",
                        }
                      }}
                      dropdownList={[
                        "Action",
                        "Another action",
                        "Something else here",
                        { divider: true },
                        "Separated link",
                        { divider: true },
                        "One more separated link"
                      ]}
                    />
                  </ListItem>
                </List>
              }
            />
          </GridItem>
        </GridContainer>
        <Box sx={{
          // Replicates the old `classes.title` styles
          textAlign: "center",
          marginBottom: "30px",
          minHeight: "32px",
          textDecoration: "none",
        }}>
          <h3>Navigation</h3>
        </Box>
      </div>
      <Box id="navbar" sx={{
        // Replicates the old `classes.navbar` styles
        marginBottom: '20px',
      }}>
        <Box sx={{
          // Replicates the old `classes.navigation` styles
          backgroundImage: "url(" + image + ")",
          position: "relative",
          zIndex: "100",
          backgroundColor: "#3C4858",
          backgroundPosition: "top center",
          backgroundSize: "cover",
          borderRadius: "6px",
          boxShadow: "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        }}>
          <Header
            brand="Brand"
            color="rose"
            leftLinks={
              <List sx={{
                // Replicates the old `classes.list` styles
                display: "flex",
                padding: "0",
                margin: "0",
              }}>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    href="#pablo"
                    sx={{ color: "inherit" }}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    Link
                  </Button>
                </ListItem>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    href="#pablo"
                    sx={{ color: "inherit" }}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    Link
                  </Button>
                </ListItem>
              </List>
            }
            rightLinks={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CustomInput
                  white
                  inputRootCustomClasses={{
                    // Replicates the old inputRootCustomClasses
                    marginTop: '0px !important',
                  }}
                  formControlProps={{
                    sx: {
                      // Replicates the old `classes.formControl` styles
                      marginBottom: '0 !important',
                      paddingTop: '0px !important',
                    },
                  }}
                  inputProps={{
                    placeholder: "Search",
                    inputProps: {
                      "aria-label": "Search",
                      sx: {
                        // Replicates the old `classes.searchInput` styles
                        padding: '6px',
                        color: 'inherit',
                      },
                    }
                  }}
                />
                <Button justIcon round color="white">
                  <Search sx={{ color: "inherit" }} />
                </Button>
              </Box>
            }
          />
          <Header
            brand="Info Color"
            color="info"
            rightLinks={
              <List sx={{ display: "flex", padding: "0", margin: "0" }}>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    color="transparent"
                    sx={{
                      color: "inherit",
                      // Replicates the old classes.navLinkActive
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                    }}
                  >
                    Discover
                  </Button>
                </ListItem>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    href="#pablo"
                    sx={{ color: "inherit" }}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    Profile
                  </Button>
                </ListItem>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    href="#pablo"
                    sx={{ color: "inherit" }}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    Settings
                  </Button>
                </ListItem>
              </List>
            }
          />
          <Header
            brand="Primary Color"
            color="primary"
            rightLinks={
              <List sx={{ display: "flex", padding: "0", margin: "0" }}>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    color="transparent"
                    sx={{
                      color: "inherit",
                      // Replicates the old classes.navLinkActive
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                    }}
                  >
                    <Explore sx={{ marginRight: '5px' }} /> Discover
                  </Button>
                </ListItem>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    href="#pablo"
                    sx={{ color: "inherit" }}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    <AccountCircle sx={{ marginRight: '5px' }} /> Profile
                  </Button>
                </ListItem>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    href="#pablo"
                    sx={{ color: "inherit" }}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    <Icon sx={{ marginRight: '5px' }}>settings</Icon> Settings
                  </Button>
                </ListItem>
              </List>
            }
          />
          <Header
            brand="Navbar with notifications"
            color="dark"
            rightLinks={
              <List sx={{ display: "flex", padding: "0", margin: "0" }}>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    href="#pablo"
                    sx={{ color: "inherit" }}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    Discover
                  </Button>
                </ListItem>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    href="#pablo"
                    sx={{ color: "inherit" }}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    Wishlist
                  </Button>
                </ListItem>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    justIcon
                    round
                    href="#pablo"
                    sx={{
                      // Replicates the old classes.notificationNavLink
                      color: 'white',
                      backgroundColor: 'pink',
                    }}
                    onClick={e => e.preventDefault()}
                    color="rose"
                  >
                    <Email sx={{ color: "inherit" }} />
                  </Button>
                </ListItem>
                <ListItem sx={{ padding: "0" }}>
                  <CustomDropdown
                    left
                    caret={false}
                    hoverColor="black"
                    dropdownHeader="Dropdown Header"
                    buttonText={
                      <Box component="img" src={profileImage} sx={{
                        // Replicates the old classes.img
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        verticalAlign: 'middle',
                      }}
                        alt="profile"
                      />
                    }
                    buttonProps={{
                      sx: {
                        // Replicates the old classes.navLink and imageDropdownButton
                        color: "transparent",
                        minHeight: 'auto',
                        padding: '0',
                      }
                    }}
                    dropdownList={[
                      "Me",
                      "Settings and other stuff",
                      "Sign out"
                    ]}
                  />
                </ListItem>
              </List>
            }
          />
          <Header
            brand="Navbar with profile"
            rightLinks={
              <List sx={{ display: "flex", padding: "0", margin: "0" }}>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    href="#pablo"
                    sx={{ color: "inherit" }}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    Discover
                  </Button>
                </ListItem>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    href="#pablo"
                    sx={{ color: "inherit" }}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    Wishlist
                  </Button>
                </ListItem>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    href="#pablo"
                    sx={{
                      // Replicates the old classes.registerNavLink
                      color: 'white',
                      backgroundColor: 'rose',
                      '&:hover': {
                        backgroundColor: 'pink',
                      },
                    }}
                    onClick={e => e.preventDefault()}
                    color="rose"
                    round
                  >
                    Register
                  </Button>
                </ListItem>
              </List>
            }
          />
          <Header
            brand="Transparent"
            color="transparent"
            rightLinks={
              <List sx={{ display: "flex", padding: "0", margin: "0" }}>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    color="transparent"
                    sx={{
                      // Replicates the old classes.navLink and socialIconsButton
                      color: 'inherit',
                      '& .fab': {
                        marginRight: '5px',
                      }
                    }}
                  >
                    <Box component="i" className={"fab fa-twitter"} />{" "}
                    Twitter
                  </Button>
                </ListItem>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    color="transparent"
                    sx={{
                      // Replicates the old classes.navLink and socialIconsButton
                      color: 'inherit',
                      '& .fab': {
                        marginRight: '5px',
                      }
                    }}
                  >
                    <Box component="i" className={"fab fa-facebook"} />{" "}
                    Facebook
                  </Button>
                </ListItem>
                <ListItem sx={{ padding: "0" }}>
                  <Button
                    color="transparent"
                    sx={{
                      // Replicates the old classes.navLink and socialIconsButton
                      color: 'inherit',
                      '& .fab': {
                        marginRight: '5px',
                      }
                    }}
                  >
                    <Box component="i" className={"fab fa-instagram"} />{" "}
                    Instagram
                  </Button>
                </ListItem>
              </List>
            }
          />
        </Box>
      </Box>
    </Box>
  );
}