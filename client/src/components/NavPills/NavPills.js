import React from "react";
// Import modern Material-UI components and utilities
import { Box, styled, Tabs, Tab } from '@mui/material';
import SwipeableViews from '@mui/lab/SwipeableViews';
import PropTypes from "prop-types";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// Note: Removed old imports:
// - classNames
// - makeStyles
// - styles (from assets/jss/...)

// ----------------------------------------------------
// 1. REFACTOR STYLING WITH THE MODERN STYLED() API
// ----------------------------------------------------

const StyledTabs = styled(Tabs)(({ theme, color, alignCenter, horizontal }) => ({
  // Define styles for the Tabs component
  flexContainer: {
    // This replaces the old `classes.flexContainer`
    ...(horizontal && {
      flexDirection: 'row',
    }),
  },
  indicator: {
    // This replaces `classes.displayNone`
    display: 'none',
  },
}));

const StyledTab = styled(Tab)(({ theme, color, horizontal, icon }) => ({
  // Define styles for the Tab component
  pills: {
    padding: '12px 30px',
    minWidth: '120px',
    borderRadius: '30px',
    lineHeight: '20px',
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: '12px',
    opacity: '1',
    maxWidth: '100%',
    margin: '0 5px',
    [theme.breakpoints.down("sm")]: {
      marginBottom: "5px !important",
      marginTop: "5px !important",
    },
    "& svg": {
      display: "block",
      maxWidth: "30px",
      width: "100%",
      height: "30px",
      margin: "0 auto",
    },
    "&:hover": {
      opacity: 1,
    },
  },
  // Apply conditional styles for different colors and states
  '&.Mui-selected': {
    backgroundColor: theme.palette[color].main,
    color: theme.palette.getContrastText(theme.palette[color].main),
    // This replaces `classes[color]`
    // Example: For "primary" color, it uses `theme.palette.primary.main`
  },
  // Add other styles for horizontal and icon cases
  ...(horizontal && {
    minWidth: '100px',
  }),
  ...(icon && {
    minWidth: '80px',
    padding: '10px 15px',
  }),
  // This replaces `classes.tabWrapper`
  wrapper: {
    flexDirection: icon ? 'column' : 'row',
    alignItems: icon ? 'center' : 'center',
    justifyContent: icon ? 'center' : 'center',
  },
}));

// ----------------------------------------------------
// 2. REFACTOR COMPONENT LOGIC
// ----------------------------------------------------
export default function NavPills(props) {
  const [active, setActive] = React.useState(props.active);
  const handleChange = (event, active) => {
    setActive(active);
  };
  const handleChangeIndex = index => {
    setActive(index);
  };
  
  const { tabs, direction, color, horizontal, alignCenter } = props;

  const tabButtons = (
    <StyledTabs
      value={active}
      onChange={handleChange}
      centered={alignCenter}
      color={color}
      horizontal={horizontal}
    >
      {tabs.map((prop, key) => {
        let icon = {};
        if (prop.tabIcon !== undefined) {
          icon["icon"] = <prop.tabIcon />;
        }
        return (
          <StyledTab
            label={prop.tabButton}
            key={key}
            {...icon}
            color={color}
            horizontal={horizontal}
            icon={prop.tabIcon !== undefined}
          />
        );
      })}
    </StyledTabs>
  );

  const tabContent = (
    <Box>
      <SwipeableViews
        axis={direction === "rtl" ? "x-reverse" : "x"}
        index={active}
        onChangeIndex={handleChangeIndex}
      >
        {tabs.map((prop, key) => {
          return (
            <Box key={key}>
              {prop.tabContent}
            </Box>
          );
        })}
      </SwipeableViews>
    </Box>
  );

  return horizontal !== undefined ? (
    <GridContainer>
      <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
      <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
    </GridContainer>
  ) : (
    <div>
      {tabButtons}
      {tabContent}
    </div>
  );
}

// ----------------------------------------------------
// 3. PROP TYPES AND DEFAULTS (UNTOUCHED)
// ----------------------------------------------------

NavPills.defaultProps = {
  active: 0,
  color: "primary"
};

NavPills.propTypes = {
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object
  }),
  alignCenter: PropTypes.bool
};