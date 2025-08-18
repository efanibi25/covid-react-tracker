import React from "react";
import PropTypes from "prop-types";

// Import modern MUI components
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import { Box } from "@mui/material";

// core components (assuming these have been refactored)
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

// Note: Removed the old imports for classNames, makeStyles, and the JSS styles file.

export default function CustomTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };
  
  const { headerColor, plainTabs, tabs, title, rtlActive } = props;

  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title !== undefined ? (
          <Box 
            component="div"
            sx={{
              // This replaces the old cardTitle classNames logic
              fontWeight: 500,
              fontSize: '18px',
              display: 'inline-block',
              ...(rtlActive && {
                // Add your RTL styles here
              })
            }}
          >
              {title}
          </Box>
        ) : null}
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            sx: {
              // Replaces classes.displayNone
              display: 'none',
            }
          }}
          sx={{
            // Replaces classes.tabsRoot
            minHeight: 'unset !important',
            overflow: 'visible !important',
            // You may need to add other styles here from your original JSS file
          }}
        >
          {tabs.map((prop, key) => {
            var icon = {};
            if (prop.tabIcon) {
              icon = {
                icon:
                  typeof prop.tabIcon === "string" ? (
                    <Icon>{prop.tabIcon}</Icon>
                  ) : (
                    <prop.tabIcon />
                  )
              };
            }
            return (
              <Tab
                sx={{
                  // These styles replace classes.tabRootButton, classes.tabLabel, etc.
                  minHeight: 'unset !important',
                  minWidth: 'unset !important',
                  width: '100%',
                  height: 'unset !important',
                  maxWidth: '500px !important',
                  margin: '0 5px',
                  padding: '10px 15px',
                  borderRadius: '3px',
                  lineHeight: '24px',
                  border: '0 !important',
                  color: '#fff !important',
                  fontWeight: '500 !important',
                  fontSize: '12px !important',
                  '&:last-child': {
                    marginRight: 0,
                  },
                  // Replaces classes.tabSelected
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  // Replaces classes.tabWrapper
                  '& .MuiTab-wrapper': {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& svg': {
                      marginRight: '5px',
                    },
                  },
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
      </CardHeader>
      <CardBody>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <Box key={key}>{prop.tabContent}</Box>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
}

CustomTabs.propTypes = {
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool
};