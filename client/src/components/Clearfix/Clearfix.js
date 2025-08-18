import React from "react";
import { styled } from '@mui/material/styles';

// Note: Removed old imports for makeStyles and the styles object.

const StyledClearfix = styled('div')({
  '&:after,&:before': {
    display: 'table',
    content: '""',
  },
  '&:after': {
    clear: 'both',
  },
});

export default function Clearfix() {
  return <StyledClearfix />;
}

Clearfix.propTypes = {};