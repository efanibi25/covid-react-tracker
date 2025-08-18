import React from "react";
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import { useTheme, useMediaQuery } from '@mui/material';
import { AppBar, Toolbar, IconButton, Button, Drawer, List } from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import { Box } from '@mui/material';

// Note: Removed the old imports for makeStyles, classNames, and the styles file.

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'absolute' && prop !== 'fixed' && prop !== 'isMobile',
})(({ theme, ownerState }) => ({
  display: 'flex',
  border: 0,
  borderRadius: '3px',
  padding: '0.625rem 0',
  marginBottom: '20px',
  color: '#555',
  backgroundColor: '#fff',
  transition: 'all 150ms ease 0s',
  alignItems: 'center',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-start',
  position: 'relative',
  zIndex: 'unset',
  ...ownerState.color && {
    backgroundColor: ownerState.color === 'transparent' ? 'transparent' : theme.palette[ownerState.color].main,
    color: ownerState.color === 'transparent' ? '#fff' : theme.palette[ownerState.color].contrastText,
    boxShadow: ownerState.color === 'transparent' ? 'none' : theme.shadows[4],
  },
  ...ownerState.absolute && {
    position: 'absolute',
    zIndex: 1100,
  },
  ...ownerState.fixed && {
    position: 'fixed',
    zIndex: 1100,
  },
  ...ownerState.isMobile && {
    width: '100%',
  },
}));

export default function Header(props) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  // Note: All your existing useEffect and headerColorChange logic can be added here.
  
  const { color, rightLinks, leftLinks, brand, fixed, absolute, changeColorOnScroll } = props;

  const brandComponent = (
    <Button 
      sx={{
        textTransform: 'uppercase',
        padding: '0.625rem 0',
        fontSize: '18px',
        fontWeight: 400,
      }}
    >
      {brand}
    </Button>
  );

  return (
    <StyledAppBar ownerState={{ color, absolute, fixed, isMobile: !isMdUp }}>
      <Toolbar 
        sx={{
          padding: '0.625rem 0',
          minHeight: '50px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'nowrap',
        }}
      >
        {leftLinks !== undefined ? brandComponent : null}
        <Box 
          sx={{
            flex: '1',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {leftLinks !== undefined ? (
            isMdUp ? leftLinks : null
          ) : (
            brandComponent
          )}
        </Box>
        {isMdUp && rightLinks}
        {!isMdUp && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            size="large"
          >
            <Menu />
          </IconButton>
        )}
      </Toolbar>
      {!isMdUp && (
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: '260px',
              boxShadow: '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Box
            sx={{
              padding: '10px 0',
              textAlign: 'center',
            }}
          >
            {leftLinks}
            {rightLinks}
          </Box>
        </Drawer>
      )}
    </StyledAppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary", "info", "success", "warning", "danger", "rose", "transparent"
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will just change the color of the header on scroll to color
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary", "info", "success", "warning", "danger", "rose", "transparent"
    ]).isRequired
  })
};

Header.defaultProps = {
  color: "white"
};
