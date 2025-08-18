import React from "react";
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import {
  MenuItem,
  MenuList,
  ClickAwayListener,
  Paper,
  Grow,
  Divider,
  Icon,
  Popper,
  Button
} from "@mui/material";

// Note: Removed the old imports for withStyles, classNames, and the styles file.

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'rtlActive' && prop !== 'caret' && prop !== 'open',
})(({ theme, ownerState }) => ({
  // Define styles for the caret
  caret: {
    ...{
      width: 0,
      height: 0,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid ' + theme.palette.text.primary,
      display: 'inline-block',
      marginLeft: '5px',
    },
    // Styles for caret active state
    ...(ownerState.open && {
      transform: 'rotate(180deg)',
    }),
    // Styles for RTL
    ...(ownerState.rtlActive && {
      marginLeft: '0',
      marginRight: '5px',
    }),
  },
}));

const StyledPopper = styled(Popper, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'popperResponsive',
})(({ ownerState }) => ({
  // Styles for the popper
  zIndex: 100,
  '&[x-placement*="bottom"]': {
    marginTop: '5px',
  },
  '&[x-placement*="top"]': {
    marginBottom: '5px',
  },
  // Styles for popper responsive
  ...ownerState.popperResponsive && {
    '@media (max-width: 991px)': {
      position: 'static !important',
      transform: 'none !important',
      left: '0 !important',
      top: '0 !important',
      width: '100%',
      marginTop: '5px',
    }
  },
  // Styles for popper close
  ...(!ownerState.open && {
    pointerEvents: 'none',
  }),
}));

const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'hoverColor' && prop !== 'noLiPadding' && prop !== 'rtlActive',
})(({ theme, ownerState }) => ({
  // Define styles for dropdown items
  ...{
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette[ownerState.hoverColor].main,
      color: theme.palette.getContrastText(theme.palette[ownerState.hoverColor].main),
    },
    // Styles for hover color
    ...(ownerState.hoverColor && {
      '&:hover': {
        backgroundColor: theme.palette[ownerState.hoverColor].main,
        color: theme.palette.getContrastText(theme.palette[ownerState.hoverColor].main),
      },
    }),
    // Styles for no li padding
    ...(ownerState.noLiPadding && {
      paddingTop: 0,
      paddingBottom: 0,
    }),
    // Styles for RTL
    ...(ownerState.rtlActive && {
      textAlign: 'right',
    }),
  },
}));

// We convert the class component to a functional component with modern hooks
export default function CustomDropdown(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = param => {
    setOpen(false);
    if (props && props.onClick) {
      props.onClick(param);
    }
  };

  const handleCloseAway = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const {
    buttonText,
    buttonIcon,
    dropdownList,
    buttonProps,
    dropup,
    dropdownHeader,
    caret,
    hoverColor,
    left,
    rtlActive,
    noLiPadding
  } = props;

  let icon = null;
  switch (typeof buttonIcon) {
    case "function":
      icon = <props.buttonIcon />;
      break;
    case "object":
      if (buttonIcon && buttonIcon.type && buttonIcon.type.muiName === "Icon") {
        icon = buttonIcon;
      }
      break;
    case "string":
      icon = (
        <Icon>{buttonIcon}</Icon>
      );
      break;
    default:
      icon = null;
      break;
  }

  return (
    <div>
      <div>
        <StyledButton
          aria-label="Notifications"
          aria-owns={open ? "menu-list" : null}
          aria-haspopup="true"
          {...buttonProps}
          ref={anchorRef}
          onClick={handleClick}
          ownerState={{ open, rtlActive, caret }}
        >
          {icon}
          {buttonText !== undefined ? buttonText : null}
          {caret ? <b /> : null}
        </StyledButton>
      </div>
      <StyledPopper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        placement={
          dropup
            ? left
              ? "top-start"
              : "top"
            : left
            ? "bottom-start"
            : "bottom"
        }
        ownerState={{
          open: open,
          popperResponsive: true,
        }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            id="menu-list"
            style={
              dropup
                ? { transformOrigin: "0 100% 0" }
                : { transformOrigin: "0 0 0" }
            }
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseAway}>
                <MenuList role="menu">
                  {dropdownHeader !== undefined ? (
                    <MenuItem
                      onClick={() => handleClose(dropdownHeader)}
                    >
                      {dropdownHeader}
                    </MenuItem>
                  ) : null}
                  {dropdownList.map((prop, key) => {
                    if (prop.divider) {
                      return (
                        <Divider
                          key={key}
                          onClick={() => handleClose("divider")}
                        />
                      );
                    }
                    return (
                      <StyledMenuItem
                        key={key}
                        onClick={() => handleClose(prop)}
                        ownerState={{
                          hoverColor,
                          noLiPadding,
                          rtlActive,
                        }}
                      >
                        {prop}
                      </StyledMenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </StyledPopper>
    </div>
  );
}

CustomDropdown.defaultProps = {
  caret: true,
  hoverColor: "primary"
};

CustomDropdown.propTypes = {
  hoverColor: PropTypes.oneOf([
    "black",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ]),
  buttonText: PropTypes.node,
  buttonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
  dropdownList: PropTypes.array,
  buttonProps: PropTypes.object,
  dropup: PropTypes.bool,
  dropdownHeader: PropTypes.node,
  rtlActive: PropTypes.bool,
  caret: PropTypes.bool,
  left: PropTypes.bool,
  noLiPadding: PropTypes.bool,
  onClick: PropTypes.func
};
