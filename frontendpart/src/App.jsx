import './App.css'
import {  Routes, Route, BrowserRouter} from 'react-router-dom';
import { useState,useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import {ethers} from "ethers";
import Profile from './components/Profile';
import abi from "./contract/contractgov.json"
import Home from './components/Home';
import Candidature from './components/Candidature';
import CreateElection from './components/CreateElection';
function App() {
  const [account,setAccount]=useState({Add:"",Token:0});

  const [state,setState]=useState({
      provider:null,
      signer:null,
      constract:null
  })
  let add=""
  useEffect(()=>{
      const template=async()=>{
          const contractAddress="0x3Aa672aDfeb37A12E621A9668683e710aE4212A6";
          const contractABI=abi.abi;
          const {ethereum}=window;
          if(ethereum){
            try {
              add=await ethereum.request({
              method:"eth_requestAccounts"
            })

            window.ethereum.on("chainChanged",()=>{
              window.location.reload();
            })
            window.ethereum.on("accountsChanged",()=>{
              window.location.reload();
            })
            console.log(add[0])
            setAccount({Add:add[0],Token:0})


            const provider= new ethers.providers.Web3Provider(ethereum);//reading the blockchain
            const signer=provider.getSigner();//write the blockchain
            const contract = new ethers.Contract(
                 contractAddress,
                 contractABI,
                 signer
            )

            const token=await contract.displayTokens()
            console.log(parseInt(token))
            setAccount({Add:add[0],Token:parseInt(token)});
            setState({provider,signer,contract})
            
            // const token=await contract.displayTokens()
            // //console.log(parseint(token)  )
            
  


          } catch (error) {
            // alert(error)
          }
          }
          else{
            alert("install metamask")
          }
          
          
          


      }
      template();
  },[])
  console.log(state); 
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home state={state} account={account}/>} />
      <Route path="/profile" element={<Profile state={state} account={account}/>} />
      <Route path="/candidature" element={<Candidature state={state} account={account}/>} />
      <Route path="/createElection" element={<CreateElection state={state} account={account}/>} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
