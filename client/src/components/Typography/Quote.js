import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';

// Note: Removed the old imports for makeStyles and the JSS styles file.

// ----------------------------------------------------
// 1. REFACTOR STYLING WITH THE MODERN STYLED() UTILITY
// ----------------------------------------------------

const StyledQuoteBlock = styled('blockquote')(({ theme }) => ({
  // These styles combine the functionality of `defaultFontStyle` and `quote`.
  // You will need to copy the exact styles from your JSS file here.
  padding: '10px 20px',
  margin: '0 0 20px',
  fontSize: '1.25rem',
  borderLeft: '5px solid ' + theme.palette.grey[300],
  // Example for a font style:
  // fontFamily: "'Roboto Slab', 'Times New Roman', serif",
  // fontWeight: '300',
}));

const StyledQuoteText = styled('p')({
  // This replaces the old `classes.quoteText`
  margin: '0',
  fontStyle: 'italic',
});

const StyledQuoteAuthor = styled('small')({
  // This replaces the old `classes.quoteAuthor`
  display: 'block',
  textAlign: 'right',
  fontSize: '80%',
  '&:before': {
    content: "'- '",
  },
});

// ----------------------------------------------------
// 2. REFACTOR COMPONENT LOGIC
// ----------------------------------------------------

export default function Quote(props) {
  const { text, author } = props;
  return (
    <StyledQuoteBlock>
      <StyledQuoteText>{text}</StyledQuoteText>
      <StyledQuoteAuthor>{author}</StyledQuoteAuthor>
    </StyledQuoteBlock>
  );
}

// ----------------------------------------------------
// 3. PROP TYPES (UNTOUCHED)
// ----------------------------------------------------

Quote.propTypes = {
  text: PropTypes.node,
  author: PropTypes.node
};