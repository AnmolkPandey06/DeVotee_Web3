import React from 'react'
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import Navigation from "./Navbar";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
} from "@mui/material";

const CreateElection = ({state,account}) => {
  const [EleName,setEleName]=useState("");
  const [Desc,setDesc]=useState("");
  const [Deadline,setDeadline]=useState("");

  const { contract } = state;

  const handleElename = (event) => {
    setEleName(event.target.value);
  };
  const handleDesc = (event) => {
    const eleDesc = event.target.value
    setDesc(eleDesc);
  };
  const handleDeadline = (event) => {
    const eleDeadline = event.target.value
    setDeadline(eleDeadline);
  };

  const handleCreate=async(event)=>{
      let views= await contract.createElection(EleName,Desc,Deadline);
      console.log(views);
   }
  return (
    <>
    <CssBaseline/>
    <div style={{backgroundColor:'beige', height:'100vh'}}> 
    <Navigation/>
    {account.Add=="0x4c30d869289b0c8ccfb4444257a2b5f72693a3e0" && 
        <Container maxWidth="lg" style={{  marginTop: "50px" }}>
            <Container><Typography  sx={{margin:'0.5rem'}} fontSize='3rem'>Create Election Here</Typography></Container>
            <Container>
            <TextField
              sx={{margin:"1rem"}}
              label="Enter Election Name"
              variant="outlined"
              fullWidth
              value={EleName}
              onChange={handleElename}
             />
             <TextField
              sx={{margin:"1rem"}}
              label="Write the description about it"
              variant="outlined"
              fullWidth
              value={Desc}
              onChange={handleDesc}
             />
            <TextField
              sx={{margin:"1rem"}}
              label="Enter deadline in days"
              variant="outlined"
              fullWidth
              value={Deadline}
              onChange={handleDeadline}
             />
             <Button
               variant="contained"
               sx={{backgroundColor:'black'}}
               onClick={handleCreate}
              
              >
              Create Election
              </Button>
            </Container>
        </Container>
    }
    {account.Add!="0x4c30d869289b0c8ccfb4444257a2b5f72693a3e0" && 
        <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography  sx={{margin:'0.5rem'}} fontSize='2rem'>You do not have access to this</Typography>
        </Container>
    }
    </div>
    </>
     
   
   
    
  )
}

export default CreateElection