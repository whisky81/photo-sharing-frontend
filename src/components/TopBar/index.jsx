import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Nguyen Duc Anh</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
