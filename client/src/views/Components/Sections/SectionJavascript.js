import React from "react";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
import { Box } from '@mui/material';
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
// @mui/icons-material
import LibraryBooks from "@mui/icons-material/LibraryBooks";
import Close from "@mui/icons-material/Close";
// core components (assuming these are already refactored)
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

// Note: Removed the old imports for makeStyles and the styles file.

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function SectionJavascript() {
  const [anchorElLeft, setAnchorElLeft] = React.useState(null);
  const [anchorElTop, setAnchorElTop] = React.useState(null);
  const [anchorElBottom, setAnchorElBottom] = React.useState(null);
  const [anchorElRight, setAnchorElRight] = React.useState(null);
  const [classicModal, setClassicModal] = React.useState(false);

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
        <Box sx={{
          // Replicates the old `classes.title` styles
          textAlign: "center",
          marginBottom: "30px",
          minHeight: "32px",
          textDecoration: "none",
        }}>
          <h2>Javascript components</h2>
        </Box>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Box sx={{
              // Replicates the old `classes.title` styles
              textAlign: "center",
              marginBottom: "30px",
              minHeight: "32px",
              textDecoration: "none",
            }}>
              <h3>Modal</h3>
            </Box>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} lg={4}>
                <Button
                  color="primary"
                  block
                  onClick={() => setClassicModal(true)}
                >
                  <LibraryBooks sx={{ marginRight: '5px' }} />
                  Classic
                </Button>
                <Dialog
                  open={classicModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setClassicModal(false)}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                  sx={{
                    // Replicates the old classes.center and classes.modal
                    display: 'flex',
                    alignItems: 'center',
                    '& .MuiDialog-paper': {
                      maxWidth: '800px',
                      borderRadius: '6px',
                      maxHeight: 'unset',
                      overflow: 'unset',
                      boxShadow: '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <DialogTitle
                    id="classic-modal-slide-title"
                    sx={{
                      // Replicates the old classes.modalHeader and modalTitle
                      borderBottom: '1px solid #eee',
                      padding: '24px',
                      position: 'relative',
                    }}
                  >
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={() => setClassicModal(false)}
                      size="large"
                      sx={{
                        // Replicates the old classes.modalCloseButton and modalClose
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        width: '24px',
                        height: '24px',
                        padding: '0',
                        margin: '10px',
                        cursor: 'pointer',
                        borderRadius: '50%',
                      }}
                    >
                      <Close sx={{ width: '1.2em', height: '1.2em' }} />
                    </IconButton>
                    <h4
                      style={{
                        margin: '0',
                        lineHeight: '1.42857143',
                        fontWeight: 500,
                        fontSize: '20px',
                      }}
                    >
                      Modal title
                    </h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    sx={{
                      // Replicates the old classes.modalBody
                      padding: '24px',
                    }}
                  >
                    <p>
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts. Separated they live in Bookmarksgrove right at the
                      coast of the Semantics, a large language ocean. A small
                      river named Duden flows by their place and supplies it
                      with the necessary regelialia. It is a paradisematic
                      country, in which roasted parts of sentences fly into your
                      mouth. Even the all-powerful Pointing has no control about
                      the blind texts it is an almost unorthographic life One
                      day however a small line of blind text by the name of
                      Lorem Ipsum decided to leave for the far World of Grammar.
                    </p>
                  </DialogContent>
                  <DialogActions
                    sx={{
                      // Replicates the old classes.modalFooter
                      borderTop: '1px solid #eee',
                      padding: '24px',
                    }}
                  >
                    <Button color="transparent" simple>
                      Nice Button
                    </Button>
                    <Button
                      onClick={() => setClassicModal(false)}
                      color="danger"
                      simple
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </GridItem>
            </GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Box sx={{
                // Replicates the old `classes.title` styles
                textAlign: "center",
                marginBottom: "30px",
                minHeight: "32px",
                textDecoration: "none",
              }}>
                <h3>Datetime Picker</h3>
              </Box>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel sx={{
                    // Replicates the old classes.label
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 400,
                    lineHeight: 1,
                    fontSize: "14px",
                  }}>
                    Datetime Picker
                  </InputLabel>
                  <br />
                  <FormControl fullWidth>
                    <Datetime
                      inputProps={{ placeholder: "Datetime Picker Here" }}
                    />
                  </FormControl>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Box sx={{
              // Replicates the old `classes.title` styles
              textAlign: "center",
              marginBottom: "30px",
              minHeight: "32px",
              textDecoration: "none",
            }}>
              <h3>Popovers</h3>
            </Box>
            <Button onClick={event => setAnchorElLeft(event.currentTarget)}>
              On left
            </Button>
            <Popover
              open={Boolean(anchorElLeft)}
              anchorEl={anchorElLeft}
              onClose={() => setAnchorElLeft(null)}
              anchorOrigin={{
                vertical: "center",
                horizontal: "left"
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "right"
              }}
              sx={{
                '& .MuiPopover-paper': {
                  // Replicates the old classes.popover
                  padding: '10px',
                  boxShadow: '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
                  borderRadius: '3px',
                },
              }}
            >
              <Box sx={{
                // Replicates the old classes.popoverHeader
                padding: '15px',
                margin: '-15px -15px 10px',
                backgroundColor: 'grey', // Add your specific color
                color: '#fff',
                fontSize: '18px',
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: '3px 3px 0 0',
              }}>Popover on left</Box>
              <Box sx={{
                // Replicates the old classes.popoverBody
                padding: '0 15px 15px',
                fontSize: '14px',
              }}>
                Here will be some very useful information about his popover.
                Here will be some very useful information about his popover.
              </Box>
            </Popover>
            <Button onClick={event => setAnchorElTop(event.currentTarget)}>
              On top
            </Button>
            <Popover
              open={Boolean(anchorElTop)}
              anchorEl={anchorElTop}
              onClose={() => setAnchorElTop(null)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              sx={{
                '& .MuiPopover-paper': {
                  // Replicates the old classes.popover
                  padding: '10px',
                  boxShadow: '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
                  borderRadius: '3px',
                },
              }}
            >
              <Box sx={{
                // Replicates the old classes.popoverHeader
                padding: '15px',
                margin: '-15px -15px 10px',
                backgroundColor: 'grey', // Add your specific color
                color: '#fff',
                fontSize: '18px',
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: '3px 3px 0 0',
              }}>Popover on top</Box>
              <Box sx={{
                // Replicates the old classes.popoverBody
                padding: '0 15px 15px',
                fontSize: '14px',
              }}>
                Here will be some very useful information about his popover.
              </Box>
            </Popover>
            <Button onClick={event => setAnchorElBottom(event.currentTarget)}>
              On bottom
            </Button>
            <Popover
              open={Boolean(anchorElBottom)}
              anchorEl={anchorElBottom}
              onClose={() => setAnchorElBottom(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              sx={{
                '& .MuiPopover-paper': {
                  // Replicates the old classes.popover
                  padding: '10px',
                  boxShadow: '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
                  borderRadius: '3px',
                },
              }}
            >
              <Box sx={{
                // Replicates the old classes.popoverHeader
                padding: '15px',
                margin: '-15px -15px 10px',
                backgroundColor: 'grey', // Add your specific color
                color: '#fff',
                fontSize: '18px',
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: '3px 3px 0 0',
              }}>Popover on bottom</Box>
              <Box sx={{
                // Replicates the old classes.popoverBody
                padding: '0 15px 15px',
                fontSize: '14px',
              }}>
                Here will be some very useful information about his popover.
              </Box>
            </Popover>
            <Button onClick={event => setAnchorElRight(event.currentTarget)}>
              On right
            </Button>
            <Popover
              open={Boolean(anchorElRight)}
              anchorEl={anchorElRight}
              onClose={() => setAnchorElRight(null)}
              anchorOrigin={{
                vertical: "center",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "left"
              }}
              sx={{
                '& .MuiPopover-paper': {
                  // Replicates the old classes.popover
                  padding: '10px',
                  boxShadow: '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
                  borderRadius: '3px',
                },
              }}
            >
              <Box sx={{
                // Replicates the old classes.popoverHeader
                padding: '15px',
                margin: '-15px -15px 10px',
                backgroundColor: 'grey', // Add your specific color
                color: '#fff',
                fontSize: '18px',
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: '3px 3px 0 0',
              }}>Popover on right</Box>
              <Box sx={{
                // Replicates the old classes.popoverBody
                padding: '0 15px 15px',
                fontSize: '14px',
              }}>
                Here will be some very useful information about his popover.
              </Box>
            </Popover>
            <br />
            <br />
            <Box sx={{
              // Replicates the old `classes.title` styles
              textAlign: "center",
              marginBottom: "30px",
              minHeight: "32px",
              textDecoration: "none",
            }}>
              <h3>Tooltips</h3>
            </Box>
            <Tooltip
              id="tooltip-left"
              title="Tooltip on left"
              placement="left"
              sx={{
                // Replicates the old classes.tooltip styles
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  fontSize: '12px',
                  lineHeight: '1.4em',
                },
              }}
            >
              <Button>On left</Button>
            </Tooltip>
            <Tooltip
              id="tooltip-top"
              title="Tooltip on top"
              placement="top"
              sx={{
                // Replicates the old classes.tooltip styles
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  fontSize: '12px',
                  lineHeight: '1.4em',
                },
              }}
            >
              <Button>On top</Button>
            </Tooltip>
            <Tooltip
              id="tooltip-bottom"
              title="Tooltip on bottom"
              placement="bottom"
              sx={{
                // Replicates the old classes.tooltip styles
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  fontSize: '12px',
                  lineHeight: '1.4em',
                },
              }}
            >
              <Button>On bottom</Button>
            </Tooltip>
            <Tooltip
              id="tooltip-right"
              title="Tooltip on right"
              placement="right"
              sx={{
                // Replicates the old classes.tooltip styles
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  fontSize: '12px',
                  lineHeight: '1.4em',
                },
              }}
            >
              <Button>On right</Button>
            </Tooltip>
          </GridItem>
        </GridContainer>
        <Box sx={{
          // Replicates the old `classes.title` styles
          textAlign: "center",
          marginBottom: "30px",
          minHeight: "32px",
          textDecoration: "none",
        }}>
          <h3>Carousel</h3>
        </Box>
      </Box>
    </Box>
  );
}