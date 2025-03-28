"use client";
import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const HighlightCode = ({ code }) => {
  return (
    <Box
      component="pre"
      sx={{
        backgroundColor: "#212121",
        color: "#e0e0e0",
        padding: 2,
        borderRadius: 2,
        overflowX: "auto",
        fontSize: "0.9rem",
        fontFamily: "monospace",
      }}
    >
      <Typography component="code">{code}</Typography>
    </Box>
  );
};

HighlightCode.propTypes = {
  code: PropTypes.string.isRequired,
};

export default HighlightCode;
