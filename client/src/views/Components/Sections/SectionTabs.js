import React from "react";
import { Box, styled, Tabs, Tab } from "@mui/material";

// @mui/icons-material
import Face from "@mui/icons-material/Face";
import Chat from "@mui/icons-material/Chat";
import Build from "@mui/icons-material/Build";

// core components (assuming these are already refactored)
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

// Note: Removed the old imports for makeStyles and the styles file.

export default function SectionTabs() {
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
        <Box id="nav-tabs">
          <h3>Navigation Tabs</h3>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h3>
                <small>Tabs with Icons on Card</small>
              </h3>
              <CustomTabs
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Profile",
                    tabIcon: Face,
                    tabContent: (
                      <Box component="p" sx={{
                        // Replicates the old `classes.textCenter` styles
                        textAlign: 'center',
                      }}>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </Box>
                    )
                  },
                  {
                    tabName: "Messages",
                    tabIcon: Chat,
                    tabContent: (
                      <Box component="p" sx={{
                        // Replicates the old `classes.textCenter` styles
                        textAlign: 'center',
                      }}>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. I will be the leader of a company
                        that ends up being worth billions of dollars, because I
                        got the answers. I understand culture. I am the nucleus.
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at.
                      </Box>
                    )
                  },
                  {
                    tabName: "Settings",
                    tabIcon: Build,
                    tabContent: (
                      <Box component="p" sx={{
                        // Replicates the old `classes.textCenter` styles
                        textAlign: 'center',
                      }}>
                        think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </Box>
                    )
                  }
                ]}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <h3>
                <small>Tabs on Plain Card</small>
              </h3>
              <CustomTabs
                plainTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Home",
                    tabContent: (
                      <Box component="p" sx={{
                        // Replicates the old `classes.textCenter` styles
                        textAlign: 'center',
                      }}>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </Box>
                    )
                  },
                  {
                    tabName: "Updates",
                    tabContent: (
                      <Box component="p" sx={{
                        // Replicates the old `classes.textCenter` styles
                        textAlign: 'center',
                      }}>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. I will be the leader of a company
                        that ends up being worth billions of dollars, because I
                        got the answers. I understand culture. I am the nucleus.
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at.
                      </Box>
                    )
                  },
                  {
                    tabName: "History",
                    tabContent: (
                      <Box component="p" sx={{
                        // Replicates the old `classes.textCenter` styles
                        textAlign: 'center',
                      }}>
                        think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </Box>
                    )
                  }
                ]}
              />
            </GridItem>
          </GridContainer>
        </Box>
      </Box>
    </Box>
  );
}