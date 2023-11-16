import React from 'react'
import { useState,useEffect } from 'react'
import Navigation from './Navbar'
import { CssBaseline } from '@mui/material'
import {ethers} from "ethers";
import abi from "../contract/contractgov.json"
import { Container, MenuItem,Typography, TextField, Button, Grid ,Select} from "@mui/material";
import axios from "axios";
const endpoint = "http://localhost:6001";
const Candidature = ({state}) => {
  // const [account,setAccount]=useState('Not connected');
  // const [state,setState]=useState({
  //     provider:null,
  //     signer:null,
  //     constract:null
  // })
  // useEffect(()=>{
  //     const template=async()=>{
  //         const contractAddress="0x190D02eDa2D02186c86DFa0f9620208B7e3B7b52";
  //         const contractABI=abi.abi;
  //         const {ethereum}=window;
  //         try {
  //           const account=await ethereum.request({
  //             method:"eth_requestAccounts"
  
  //           })
            
  //           setAccount(account)
  //           const provider= new ethers.providers.Web3Provider(ethereum);//reading the blockchain
  //           const signer=provider.getSigner();//write the blockchain
  //           const contract = new ethers.Contract(
  //                contractAddress,
  //                contractABI,
  //                signer
  //           )
  //           setState({provider,signer,contract})
  


  //         } catch (error) {
  //            alert(error)
  //         }
          
          


  //     }
  //     template();
  // },[])
  // console.log(state); 
  const [inputValueName, setInputValueName] = useState("");
  const [inputEle, setInputEle] = useState('');
  const [resultcur, setResultcur] = useState("");
  const [resultprev, setResultprev] = useState("");
  const { contract } = state;
  const handleInputChangeName = (event) => {
    setInputValueName(event.target.value);
  };
  const handleElection = (event) => {
    const eleInput = event.target.value
    setInputEle(eleInput);
  };

  const handleButtonClick = async () => {
    const confirm=await contract.createCandidate(inputValueName,inputEle)
    console.log(inputEle);
    console.log(confirm);
   
    
    // setResultcur(data.ans1);
    // setResultprev(data.ans2);
  };

  return (
    <>  
    <CssBaseline/>
    <div style={{backgroundColor:'beige', height:'100vh'}}> 
    <Navigation/>
       <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
           Give your name as Candidate 
      </Typography>
      <form>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Enter your name 
            </Typography>
            <TextField
              label="Enter something"
              variant="outlined"
              fullWidth
              value={inputValueName}
              onChange={handleInputChangeName}
            />
            <Typography variant="h6" gutterBottom>
              Enter Ele-Id 
            </Typography>
            <TextField
              label="Enter something"
              variant="outlined"
              fullWidth
              value={inputEle}
              onChange={handleElection}
            />
            </Grid>
          <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
              Entering into election as a Candidate would cost 1000 token.
            </Typography>
            <Button
              variant="contained"
              sx={{backgroundColor:'black'}}
              fullWidth
              onClick={handleButtonClick}
            
            >
              Confirm Candidature
            </Button>
          </Grid>
          {resultcur && resultprev && (
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Result for n={inputEle}:
              </Typography>
              {/* {resultcur.map((item) => (
                <p style={{ display: "inline" }}>{`{${item}}`}&nbsp;</p>
              ))} */}

              <Typography variant="h5" gutterBottom>
                For the previous query in Ngram convertor :
              </Typography>
              {/* {resultprev.map((item) => (
                <p style={{ display: "inline" }}>{`{${item}}`}&nbsp;</p>
              ))} */}
            </Grid>
          )}
        </Grid>
      </form>
    </Container>
    </div>


    </>
  )
}

export default Candidature