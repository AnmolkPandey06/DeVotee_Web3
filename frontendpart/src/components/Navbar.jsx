import React from 'react';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import {ethers} from "ethers";
import abi from "../contract/contractgov.json"
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navigation = () => {
  
  return (
    <AppBar position="static" sx={{backgroundColor:'black'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DeVotee
        </Typography>
        <Box>
          <Button component={Link} to="/home" sx={{ marginRight: 2 }} color="inherit">
            Home
          </Button>
          <Button component={Link} to="/" sx={{ marginRight: 2 }} color="inherit">
            Your Profile
          </Button>
          <Button component={Link} to="/candidature" sx={{ marginRight: 2 }} color="inherit">
            Candidature Apply
          </Button>
          <Button component={Link} to="/createElection" sx={{ marginRight: 2 }} color="inherit">
            Create Election
          </Button>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
