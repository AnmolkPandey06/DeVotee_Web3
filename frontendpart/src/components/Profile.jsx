import React from "react";
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
const Profile = ({state,account}) => {
  const {contract}= state;
  const [Tokenhere,setTokenhere]=useState(0);
  
  const handleToken=async()=>{
    const confirm=await contract.buyTokens(10000)
    console.log(confirm);
    // const token=await contract.displayTokens()
    // console.log((token)  )
            
  }
  const handleTokendisplay=async()=>{
    // const confirm=await contract.buyTokens(5000)
    // console.log(confirm);
    // const token=await contract.displayTokens()
    // console.log(parseInt(token))
    // setTokenhere(parseInt(token))
    location.reload()

            
  }
  return (
    <>
      <CssBaseline />
      <div style={{height:'100vh',backgroundColor:'beige'}}>
      <Navigation />
      
      <Container sx={{justifyContent:"center",marginTop:"50px", backgroundColor:'beige'}}>
      <Card sx={{backgroundColor:'beige'}}>
        <CardContent>
          <Container> <Typography variant="h2">Profile Details</Typography></Container>
          <Container>
          <Typography variant="h5">Account Address:{account.Add}</Typography>
          </Container>
          <Container>
          <Typography variant="h5">Account Tokens:{account.Token}</Typography>
          <Button onClick={handleTokendisplay} variant="contained" size="small"   sx={{backgroundColor:'black'}}>
              Refresh token
            </Button>
          </Container>
         
          

          <Container>
          <Typography variant="h3" sx={{margin:'1rem'}}>Get Tokens--</Typography>
          <Typography  sx={{margin:'0.5rem'}} fontSize='1rem'>10000 token will be given to you...After this get token by contesting and Winning the elections</Typography>
          {/* <TextField
              label="Enter Tokens you need"
              variant="outlined"
              fullWidth
              value={Token}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{margin:'0.5rem'}}
            /> */}
          
            <Button onClick={handleToken} variant="contained" size="small"   sx={{backgroundColor:'black'}}>
              Get token
            </Button>
          </Container>
        </CardContent>
      </Card>
      </Container>
      </div>
      
    </>
  );
};

export default Profile;
