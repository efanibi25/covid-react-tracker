import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

import { styled } from '@mui/material/styles';
import { Box, List, ListItem, Tooltip, IconButton, Button, Icon } from "@mui/material";

// @mui/icons-material
import { Apps, CloudDownload } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

// core components (assuming these are already refactored)
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

// Note: Removed the old imports for makeStyles, classNames, and the styles file.

// ----------------------------------------------------
// 1. REFACTOR STYLING WITH THE MODERN STYLED() UTILITY
// ----------------------------------------------------

const StyledList = styled(List)({
  display: "flex",
  padding: 0,
});

const StyledListItem = styled(ListItem)({
  padding: "0",
});

const StyledLink = styled('a')(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  backgroundColor: "transparent",
  // You will need to add more styles from `headerLinksStyle.js`
}));


export default function HeaderLinks(props) {
  return (
    <StyledList>
      <StyledListItem>
        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            // These styles should be handled by your refactored CustomButton component
            sx: {
              color: 'transparent',
            },
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              All components
            </Link>,
            <StyledLink
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
            >
              Documentation
            </StyledLink>
          ]}
        />
      </StyledListItem>
      <StyledListItem>
        <Button
          href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          sx={{
            // You will need to add styles from classes.navLink
            color: 'inherit',
            fontWeight: 400,
            fontSize: 12,
            textTransform: 'uppercase',
            // etc.
          }}
        >
          <CloudDownload sx={{ marginRight: '5px' }} /> Download
        </Button>
      </StyledListItem>
      <StyledListItem>
        <Tooltip
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          sx={{ 
            // Add styles for the tooltip here
          }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            sx={{ 
              // Add styles from classes.navLink and classes.socialIcons
            }}
          >
            <Box component="i" className={"fab fa-twitter"} sx={{ 
              // Styles for the icon itself
              fontSize: 18,
            }} />
          </Button>
        </Tooltip>
      </StyledListItem>
      <StyledListItem>
        <Tooltip
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          sx={{ 
            // Add styles for the tooltip here
          }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            sx={{ 
              // Add styles from classes.navLink and classes.socialIcons
            }}
          >
            <Box component="i" className={"fab fa-facebook"} sx={{ 
              // Styles for the icon itself
              fontSize: 18,
            }} />
          </Button>
        </Tooltip>
      </StyledListItem>
      <StyledListItem>
        <Tooltip
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          sx={{ 
            // Add styles for the tooltip here
          }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            sx={{ 
              // Add styles from classes.navLink and classes.socialIcons
            }}
          >
            <Box component="i" className={"fab fa-instagram"} sx={{ 
              // Styles for the icon itself
              fontSize: 18,
            }} />
          </Button>
        </Tooltip>
      </StyledListItem>
    </StyledList>
  );
}