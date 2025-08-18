import React from "react";
// plugin that creates slider
import Slider from "nouislider";
import { styled } from '@mui/material/styles';
import { Box, FormControlLabel, Checkbox, Radio, InputAdornment, Icon, Switch } from "@mui/material";

// @mui/icons-material
import Favorite from "@mui/icons-material/Favorite";
import People from "@mui/icons-material/People";
import Check from "@mui/icons-material/Check";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";

// core components (assuming these are already refactored)
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";
import Paginations from "components/Pagination/Pagination.js";
import Badge from "components/Badge/Badge.js";

// Note: Removed old imports for makeStyles and the styles file.

const SectionBasics = React.forwardRef((props, ref) => {
  const [checked, setChecked] = React.useState([24, 22]);
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [checkedA, setCheckedA] = React.useState(true);
  const [checkedB, setCheckedB] = React.useState(false);

  React.useEffect(() => {
    if (
      !document
        .getElementById("sliderRegular")
        .classList.contains("noUi-target")
    ) {
      Slider.create(document.getElementById("sliderRegular"), {
        start: [40],
        connect: [true, false],
        step: 1,
        range: { min: 0, max: 100 }
      });
    }
    if (
      !document.getElementById("sliderDouble").classList.contains("noUi-target")
    ) {
      Slider.create(document.getElementById("sliderDouble"), {
        start: [20, 60],
        connect: [false, true, false],
        step: 1,
        range: { min: 0, max: 100 }
      });
    }
    return function cleanup() {};
  }, []);

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <Box ref={ref} sx={{
      // Replicates the old `classes.sections`
      backgroundPosition: "center",
      backgroundSize: "cover",
      padding: "70px 0",
    }}>
      <Box sx={{
        // Replicates the old `classes.container`
        zIndex: 12,
        color: '#FFFFFF',
        paddingRight: '15px',
        paddingLeft: '15px',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '100%',
      }}>
        <Box sx={{
          // Replicates the old `classes.title`
          textAlign: "center",
          marginBottom: "30px",
          minHeight: "32px",
          textDecoration: "none",
        }}>
          <h2>Basic Elements</h2>
        </Box>
        <Box id="buttons">
          <Box sx={{
            // Replicates the old `classes.title`
            textAlign: "center",
            marginBottom: "30px",
            minHeight: "32px",
            textDecoration: "none",
          }}>
            <h3>
              Buttons
              <br />
              <small>Pick your style</small>
            </h3>
          </Box>
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={12} md={8}>
              <Button color="primary">Default</Button>
              <Button color="primary" round>
                round
              </Button>
              <Button color="primary" round>
                <Favorite sx={{ marginRight: "5px" }} /> with icon
              </Button>
              <Button justIcon round color="primary">
                <Favorite />
              </Button>
              <Button color="primary" simple>
                simple
              </Button>
            </GridItem>
          </GridContainer>
          <Box sx={{
            // Replicates the old `classes.title`
            textAlign: "center",
            marginBottom: "30px",
            minHeight: "32px",
            textDecoration: "none",
          }}>
            <h3>
              <small>Pick your size</small>
            </h3>
          </Box>
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={12} md={8}>
              <Button color="primary" size="sm">
                Small
              </Button>
              <Button color="primary">Regular</Button>
              <Button color="primary" size="lg">
                Large
              </Button>
            </GridItem>
          </GridContainer>
          <Box sx={{
            // Replicates the old `classes.title`
            textAlign: "center",
            marginBottom: "30px",
            minHeight: "32px",
            textDecoration: "none",
          }}>
            <h3>
              <small>Pick your color</small>
            </h3>
          </Box>
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={12} md={8}>
              <Button>Default</Button>
              <Button color="primary">Primary</Button>
              <Button color="info">Info</Button>
              <Button color="success">Success</Button>
              <Button color="warning">Warning</Button>
              <Button color="danger">Danger</Button>
              <Button color="rose">Rose</Button>
            </GridItem>
          </GridContainer>
        </Box>
        <Box sx={{ height: "50px" }} />
        <Box id="inputs">
          <Box sx={{
            // Replicates the old `classes.title`
            textAlign: "center",
            marginBottom: "30px",
            minHeight: "32px",
            textDecoration: "none",
          }}>
            <h3>Inputs</h3>
          </Box>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                id="regular"
                inputProps={{
                  placeholder: "Regular"
                }}
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="With floating label"
                id="float"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="Success input"
                id="success"
                success
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="Error input"
                id="error"
                error
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="With material Icons"
                id="material"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <People />
                    </InputAdornment>
                  )
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={3}>
              <CustomInput
                labelText="With Font Awesome Icons"
                id="font-awesome"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <i className="fas fa-users" />
                    </InputAdornment>
                  )
                }}
              />
            </GridItem>
          </GridContainer>
        </Box>
        <Box sx={{ height: "70px" }} />
        <Box id="checkRadios">
          <GridContainer>
            <GridItem xs={12} sm={6} md={4} lg={3}>
              <Box sx={{
                // Replicates the old `classes.title`
                textAlign: "center",
                marginBottom: "30px",
                minHeight: "32px",
                textDecoration: "none",
              }}>
                <h3>Checkboxes</h3>
              </Box>
              <Box sx={{
                // Replicates the old `classes.checkboxAndRadio` and `classes.checkboxAndRadioHorizontal`
                position: "relative",
                display: "inline-block",
                marginTop: "10px",
                marginBottom: "10px",
                "& > *": {
                  display: "inline-flex",
                },
              }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle(21)}
                      checkedIcon={<Check sx={{
                        // Replicates classes.checkedIcon
                        width: "20px",
                        height: "20px",
                        border: "1px solid #999",
                        borderRadius: "3px",
                      }} />}
                      icon={<Check sx={{
                        // Replicates classes.uncheckedIcon
                        width: "20px",
                        height: "20px",
                        border: "1px solid #999",
                        borderRadius: "3px",
                      }} />}
                      sx={{
                        // Replicates classes.checkRoot
                        padding: "9px",
                        "&.Mui-checked": {
                          color: "green", // Replicates classes.checked
                        },
                      }}
                    />
                  }
                  sx={{
                    // Replicates classes.label and classes.labelRoot
                    color: "rgba(0, 0, 0, 0.87)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 400,
                    lineHeight: 1,
                    fontSize: "14px",
                  }}
                  label="Unchecked"
                />
              </Box>
              <Box sx={{
                // Replicates the old `classes.checkboxAndRadio` and `classes.checkboxAndRadioHorizontal`
                position: "relative",
                display: "inline-block",
                marginTop: "10px",
                marginBottom: "10px",
                "& > *": {
                  display: "inline-flex",
                },
              }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle(22)}
                      checked={checked.indexOf(22) !== -1}
                      checkedIcon={<Check sx={{
                        // Replicates classes.checkedIcon
                        width: "20px",
                        height: "20px",
                        border: "1px solid #999",
                        borderRadius: "3px",
                      }} />}
                      icon={<Check sx={{
                        // Replicates classes.uncheckedIcon
                        width: "20px",
                        height: "20px",
                        border: "1px solid #999",
                        borderRadius: "3px",
                      }} />}
                      sx={{
                        // Replicates classes.checkRoot
                        padding: "9px",
                        "&.Mui-checked": {
                          color: "green", // Replicates classes.checked
                        },
                      }}
                    />
                  }
                  sx={{
                    // Replicates classes.label and classes.labelRoot
                    color: "rgba(0, 0, 0, 0.87)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 400,
                    lineHeight: 1,
                    fontSize: "14px",
                  }}
                  label="Checked"
                />
              </Box>
              <Box sx={{
                // Replicates the old `classes.checkboxAndRadio` and `classes.checkboxAndRadioHorizontal`
                position: "relative",
                display: "inline-block",
                marginTop: "10px",
                marginBottom: "10px",
                "& > *": {
                  display: "inline-flex",
                },
              }}>
                <FormControlLabel
                  disabled
                  control={
                    <Checkbox
                      tabIndex={-1}
                      checkedIcon={<Check sx={{
                        // Replicates classes.checkedIcon
                        width: "20px",
                        height: "20px",
                        border: "1px solid #999",
                        borderRadius: "3px",
                      }} />}
                      icon={<Check sx={{
                        // Replicates classes.uncheckedIcon
                        width: "20px",
                        height: "20px",
                        border: "1px solid #999",
                        borderRadius: "3px",
                      }} />}
                      sx={{
                        // Replicates classes.checkRoot and classes.disabledCheckboxAndRadio
                        padding: "9px",
                        opacity: 0.5,
                      }}
                    />
                  }
                  sx={{
                    // Replicates classes.label and classes.labelRoot
                    color: "rgba(0, 0, 0, 0.87)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 400,
                    lineHeight: 1,
                    fontSize: "14px",
                    "&.Mui-disabled": {
                      color: "rgba(0, 0, 0, 0.38)",
                    },
                  }}
                  label="Disabled Unchecked"
                />
              </Box>
              <Box sx={{
                // Replicates the old `classes.checkboxAndRadio` and `classes.checkboxAndRadioHorizontal`
                position: "relative",
                display: "inline-block",
                marginTop: "10px",
                marginBottom: "10px",
                "& > *": {
                  display: "inline-flex",
                },
              }}>
                <FormControlLabel
                  disabled
                  control={
                    <Checkbox
                      tabIndex={-1}
                      checked={checked.indexOf(24) !== -1}
                      checkedIcon={<Check sx={{
                        // Replicates classes.checkedIcon
                        width: "20px",
                        height: "20px",
                        border: "1px solid #999",
                        borderRadius: "3px",
                      }} />}
                      icon={<Check sx={{
                        // Replicates classes.uncheckedIcon
                        width: "20px",
                        height: "20px",
                        border: "1px solid #999",
                        borderRadius: "3px",
                      }} />}
                      sx={{
                        // Replicates classes.checkRoot and classes.disabledCheckboxAndRadio
                        padding: "9px",
                        opacity: 0.5,
                      }}
                    />
                  }
                  sx={{
                    // Replicates classes.label and classes.labelRoot
                    color: "rgba(0, 0, 0, 0.87)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 400,
                    lineHeight: 1,
                    fontSize: "14px",
                    "&.Mui-disabled": {
                      color: "rgba(0, 0, 0, 0.38)",
                    },
                  }}
                  label="Disabled Checked"
                />
              </Box>
            </GridItem>
            <GridItem xs={12} sm={6} md={4} lg={3}>
              <Box sx={{
                // Replicates the old `classes.title`
                textAlign: "center",
                marginBottom: "30px",
                minHeight: "32px",
                textDecoration: "none",
              }}>
                <h3>Radio Buttons</h3>
              </Box>
              <Box sx={{
                // Replicates the old `classes.checkboxAndRadio` and `classes.checkboxAndRadioHorizontal`
                position: "relative",
                display: "inline-block",
                marginTop: "10px",
                marginBottom: "10px",
                "& > *": {
                  display: "inline-flex",
                },
              }}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedEnabled === "a"}
                      onChange={() => setSelectedEnabled("a")}
                      value="a"
                      name="radio button enabled"
                      aria-label="A"
                      icon={<FiberManualRecord sx={{ color: "rgba(0, 0, 0, 0.54)" }} />}
                      checkedIcon={<FiberManualRecord sx={{ color: "blue" }} />}
                      sx={{
                        padding: "9px",
                      }}
                    />
                  }
                  sx={{
                    color: "rgba(0, 0, 0, 0.87)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 400,
                    lineHeight: 1,
                    fontSize: "14px",
                  }}
                  label="First Radio"
                />
              </Box>
              <Box sx={{
                // Replicates the old `classes.checkboxAndRadio` and `classes.checkboxAndRadioHorizontal`
                position: "relative",
                display: "inline-block",
                marginTop: "10px",
                marginBottom: "10px",
                "& > *": {
                  display: "inline-flex",
                },
              }}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedEnabled === "b"}
                      onChange={() => setSelectedEnabled("b")}
                      value="b"
                      name="radio button enabled"
                      aria-label="B"
                      icon={<FiberManualRecord sx={{ color: "rgba(0, 0, 0, 0.54)" }} />}
                      checkedIcon={<FiberManualRecord sx={{ color: "blue" }} />}
                      sx={{
                        padding: "9px",
                      }}
                    />
                  }
                  sx={{
                    color: "rgba(0, 0, 0, 0.87)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 400,
                    lineHeight: 1,
                    fontSize: "14px",
                  }}
                  label="Second Radio"
                />
              </Box>
              <Box sx={{
                // Replicates the old `classes.checkboxAndRadio` and `classes.checkboxAndRadioHorizontal`
                position: "relative",
                display: "inline-block",
                marginTop: "10px",
                marginBottom: "10px",
                "& > *": {
                  display: "inline-flex",
                },
              }}>
                <FormControlLabel
                  disabled
                  control={
                    <Radio
                      checked={false}
                      value="a"
                      name="radio button disabled"
                      aria-label="B"
                      icon={<FiberManualRecord sx={{ color: "rgba(0, 0, 0, 0.54)" }} />}
                      checkedIcon={<FiberManualRecord sx={{ color: "blue" }} />}
                      sx={{
                        padding: "9px",
                        opacity: 0.5,
                      }}
                    />
                  }
                  sx={{
                    color: "rgba(0, 0, 0, 0.87)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 400,
                    lineHeight: 1,
                    fontSize: "14px",
                    "&.Mui-disabled": {
                      color: "rgba(0, 0, 0, 0.38)",
                    },
                  }}
                  label="Disabled Unchecked Radio"
                />
              </Box>
              <Box sx={{
                // Replicates the old `classes.checkboxAndRadio` and `classes.checkboxAndRadioHorizontal`
                position: "relative",
                display: "inline-block",
                marginTop: "10px",
                marginBottom: "10px",
                "& > *": {
                  display: "inline-flex",
                },
              }}>
                <FormControlLabel
                  disabled
                  control={
                    <Radio
                      checked={true}
                      value="b"
                      name="radio button disabled"
                      aria-label="B"
                      icon={<FiberManualRecord sx={{ color: "rgba(0, 0, 0, 0.54)" }} />}
                      checkedIcon={<FiberManualRecord sx={{ color: "blue" }} />}
                      sx={{
                        padding: "9px",
                        opacity: 0.5,
                      }}
                    />
                  }
                  sx={{
                    color: "rgba(0, 0, 0, 0.87)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 400,
                    lineHeight: 1,
                    fontSize: "14px",
                    "&.Mui-disabled": {
                      color: "rgba(0, 0, 0, 0.38)",
                    },
                  }}
                  label="Disabled Checked Radio"
                />
              </Box>
            </GridItem>
            <GridItem xs={12} sm={6} md={4} lg={3}>
              <Box sx={{
                // Replicates the old `classes.title`
                textAlign: "center",
                marginBottom: "30px",
                minHeight: "32px",
                textDecoration: "none",
              }}>
                <h3>Toggle Buttons</h3>
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={checkedA}
                      onChange={event => setCheckedA(event.target.checked)}
                      value="checkedA"
                      sx={{
                        // Replicates classes.switchBase, switchChecked, etc.
                        '& .MuiSwitch-switchBase': {
                          // Styles for switch base
                          '&$checked': {
                            transform: 'translateX(20px)',
                            color: theme.palette.common.white,
                            '& + $track': {
                              opacity: 1,
                              border: 'none',
                            },
                          },
                        },
                        '& .MuiSwitch-thumb': {
                          // Styles for thumb
                          width: '18px',
                          height: '18px',
                          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.4)',
                        },
                        '& .MuiSwitch-track': {
                          // Styles for track
                          height: '12px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(0, 0, 0, 0.38)',
                          opacity: 1,
                          transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        },
                      }}
                    />
                  }
                  sx={{
                    // Replicates classes.label
                    color: "rgba(0, 0, 0, 0.87)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 400,
                    lineHeight: 1,
                    fontSize: "14px",
                  }}
                  label="Toggle is on"
                />
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={checkedB}
                      onChange={event => setCheckedB(event.target.checked)}
                      value="checkedB"
                      sx={{
                        '& .MuiSwitch-switchBase': {
                          // Styles for switch base
                          '&$checked': {
                            transform: 'translateX(20px)',
                            color: theme.palette.common.white,
                            '& + $track': {
                              opacity: 1,
                              border: 'none',
                            },
                          },
                        },
                        '& .MuiSwitch-thumb': {
                          // Styles for thumb
                          width: '18px',
                          height: '18px',
                          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.4)',
                        },
                        '& .MuiSwitch-track': {
                          // Styles for track
                          height: '12px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(0, 0, 0, 0.38)',
                          opacity: 1,
                          transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        },
                      }}
                    />
                  }
                  sx={{
                    color: "rgba(0, 0, 0, 0.87)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 400,
                    lineHeight: 1,
                    fontSize: "14px",
                  }}
                  label="Toggle is off"
                />
              </Box>
            </GridItem>
          </GridContainer>
        </Box>
        <Box sx={{ height: "70px" }} />
        <Box id="progress">
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Box sx={{
                textAlign: "center",
                marginBottom: "30px",
                minHeight: "32px",
                textDecoration: "none",
              }}>
                <h3>Progress Bars</h3>
              </Box>
              <CustomLinearProgress
                variant="determinate"
                color="primary"
                value={30}
              />
              <CustomLinearProgress
                variant="determinate"
                color="info"
                value={60}
              />
              <CustomLinearProgress
                variant="determinate"
                color="success"
                value={100}
                style={{ width: "35%", display: "inline-block" }}
              />
              <CustomLinearProgress
                variant="determinate"
                color="warning"
                value={100}
                style={{ width: "20%", display: "inline-block" }}
              />
              <CustomLinearProgress
                variant="determinate"
                color="danger"
                value={25}
                style={{ width: "45%", display: "inline-block" }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Box sx={{
                textAlign: "center",
                marginBottom: "30px",
                minHeight: "32px",
                textDecoration: "none",
              }}>
                <h3>Pagination</h3>
              </Box>
              <Paginations
                pages={[
                  { text: 1 },
                  { text: "..." },
                  { text: 5 },
                  { text: 6 },
                  { active: true, text: 7 },
                  { text: 8 },
                  { text: 9 },
                  { text: "..." },
                  { text: 12 }
                ]}
              />
              <Paginations
                pages={[
                  { text: "PREV" },
                  { text: 1 },
                  { text: 2 },
                  { active: true, text: 3 },
                  { text: 4 },
                  { text: 5 },
                  { text: "NEXT" }
                ]}
                color="info"
              />
            </GridItem>
          </GridContainer>
        </Box>
        <Box id="sliders">
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Box sx={{
                textAlign: "center",
                marginBottom: "30px",
                minHeight: "32px",
                textDecoration: "none",
              }}>
                <h3>Sliders</h3>
              </Box>
              <Box id="sliderRegular" className="slider-primary" />
              <br />
              <Box id="sliderDouble" className="slider-info" />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Box sx={{
                textAlign: "center",
                marginBottom: "30px",
                minHeight: "32px",
                textDecoration: "none",
              }}>
                <h3>Badges</h3>
              </Box>
              <Badge>default</Badge>
              <Badge color="primary">primary</Badge>
              <Badge color="info">info</Badge>
              <Badge color="success">success</Badge>
              <Badge color="warning">warning</Badge>
              <Badge color="danger">danger</Badge>
              <Badge color="rose">rose</Badge>
            </GridItem>
          </GridContainer>
        </Box>
      </Box>
    </Box>
  );
});

export default SectionBasics;