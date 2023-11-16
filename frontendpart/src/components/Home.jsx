import React from "react";
import { useState, useEffect } from "react";
import Navigation from "./Navbar";
import { CssBaseline, dividerClasses } from "@mui/material";
import Loading from "./Loading";
import { ethers } from "ethers";
import { elections } from "./elections";
import abi from "../contract/contractgov.json";
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
import axios from "axios";
const endpoint = "http://localhost:6001";
const Home = ({ state ,account}) => {
  const {contract}=state;
  const [inputValueName, setInputValueName] = useState("");
  const [inputEle, setInputEle] = useState("");
  const [Isloading,setIsloading]=useState(false);

  // const [resultcur, setResultcur] = useState("");
  // const [resultprev, setResultprev] = useState("");
 // const [Elections,setElections]=useState([]);
  const[MajElec,setMajElec]=useState([])
  const handleInputChangeName = (event) => {
    setInputValueName(event.target.value);
  };
  const handleElection = (event) => {
    const eleInput = event.target.value;
    setInputEle(eleInput);
  };

  useEffect(() => {
        const getElections=async()=>{
          setIsloading(true);

          const e_lection=await contract.getAllElections()
          console.log(e_lection);
          let majelec=[];

          
          for(let i =0; i<e_lection[0].length;i++){
              //  console.log(parseInt(e_lection[0][i]));
              let candidate=await contract.getAllCandidatesElec(parseInt(e_lection[0][i]));
              //console.log(candidate);
              let winner=0;

              let wincid=0;
              let candidatearray=[]
              for(let j =0; j<candidate[0].length;j++){
                if(parseInt(candidate[0][j])==0){
                  continue;
                }
                
                let candidates={
                  cName:candidate[1][j],
                  cid:parseInt(candidate[0][j]),
                  cadress:candidate[3][j],
                  cvotes:parseInt(candidate[2][j]),
                  eid:parseInt(e_lection[0][i])
                }
                if(winner<=candidates.cvotes){
                    winner=candidates.cvotes;
                    wincid=candidates.cid;

                    //console.log(candidates.cvotes,candidates.cid);
                }
                candidatearray.push(candidates);
                
              }
              
              const maj={
                id:parseInt(e_lection[0][i]),
                Name:e_lection[1][i],
                Sum:e_lection[2][i],
                VotingPeriod:new Date(parseInt(e_lection[3][i]) * 1000).toLocaleString(),
                Owner:e_lection[4][i],
                isComplete:(e_lection[6][i]),
                isExecute:e_lection[7][i],
                candidatearray:candidatearray,
                winner:winner,
                wincid:wincid
              }
              majelec.push(maj);
            
              }
              console.log(majelec);
              setMajElec(majelec);

              //setElections(e_lection) 
          }
          
          
        setTimeout(() => {
          if(contract){
            //console.log('anmol');
            getElections();
            setIsloading(false);

           }else{
          setIsloading(true)
           }
        },10);
        
        
        
  },[]);
 // console.log(Elections);
  const handleButtonClick =async (elec_id,c_id) => {

    const vote=await contract.voteForCandidate(elec_id,c_id);
    console.log(elec_id,c_id);
    console.log(vote);




  };
  const handleButtonApprove =async (elec_id,c_id) => {

    const vote=await contract.getExecuted(elec_id,c_id);
    console.log(elec_id,c_id);
    console.log(vote);




  };

  return (
    <>
       <div style={{height:'300vh',backgroundColor:'beige'}}>
       <CssBaseline />
      <Navigation />
      <Container
        maxWidth="lg"
        style={{ textAlign: "", marginTop: "50px" }}

      >
        <Typography variant="h2" gutterBottom>
          Welcome to DeVotee
        </Typography>
        {Isloading && <Container>
          <Loading/>
{/* <Loading color="success" />
<Loading color="inherit" /> */}
          </Container>}
          {!Isloading && 
          
          <Container>
          <Container>
          <Typography variant="h3" sx={{marginTop:"1rem"}}>
          Ongoing Elections
        </Typography>
            {MajElec.filter((mapelection) => !mapelection.isComplete).map((election)=>(
                <Grid
                sx={{ marginTop: "3rem", border: 1 }}
                container
                spacing={2}
                justifyContent="center"
                key={election.id}
              >
                <Container>
                <Typography variant="h6">Elec Id:{election.id}</Typography>
                  <Typography variant="h4">{election.Name}</Typography>
                </Container>
                <Container>
                  <Typography variant="h6">Deadline:{election.VotingPeriod}</Typography>
                </Container>
                <Container>
                  <Typography variant="h6" display="inline">
                     {election.Sum}
                  </Typography>
                {election.candidatearray.length && 
                <Container maxwidth="md">
                  <Typography variant="h5" display="inline">
                     Candidates:
                    </Typography>
                    <Grid container spacing={4}>
    
                    
                      {election.candidatearray.map((candidate) => (
                        <Grid item key={candidate.cid} xs={12} sm={6} md={4}>
                          <Card sx={{backgroundColor:'beige'}}>
                            <CardContent>
                            <Typography variant="h6">
                                {candidate.cName}&nbsp;
                              </Typography>
                              <Typography variant="h6">
                                Vote: {candidate.cvotes}&nbsp;
                              </Typography>
                              <CardActions>
                              
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{backgroundColor:'black'}}
                                  onClick={()=>handleButtonClick(election.id,candidate.cid)}
                                >
                                  Vote
                                </Button>
                              </CardActions>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Container>}
                </Container>
              </Grid>
              
           
          
        ))}</Container>
        <hr />
          <Container>
          <Typography variant="h3" sx={{marginTop:"1rem"}}>
           Past Elections Results
        </Typography>
            {MajElec.filter((mapelection) => mapelection.isExecute).map((election)=>(
          <Grid
            sx={{ marginTop: "3rem", border: 1 }}
            container
            spacing={2}
            justifyContent="center"
            key={election.id}
          >
          <Container>
          <Typography variant="h6">Elec Id:{election.id}</Typography>
            <Typography variant="h4">{election.Name}</Typography>
          </Container>
          <Container>
            <Typography variant="h6">Deadline:{election.VotingPeriod}</Typography>
          </Container>
          <Container>
            <Typography variant="h6" display="inline">
                {election.Sum}
            </Typography>
          {election.candidatearray.length && 
          <Container maxwidth="md">
            <Typography variant="h5" display="inline">
                Candidates:
              </Typography>
              <Grid container spacing={4}>

              
                {election.candidatearray.map((candidate) => (
                  <Grid item key={candidate.cid} xs={12} sm={6} md={4}>
                    <Card sx={{backgroundColor:'beige'}}>
                      <CardContent>
                      <Typography variant="h6">
                          {candidate.cName}&nbsp;
                        </Typography>
                        <Typography variant="h6">
                          Vote: {candidate.cvotes}&nbsp;
                        </Typography>
                        {/* <CardActions>
                        
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={()=>handleButtonClick(election.id,candidate.cid)}
                          >
                            Vote
                          </Button>
                        </CardActions> */}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>}
          </Container>
          </Grid>
        ))}</Container>
        <hr />
        {(account.Add=='0x4c30d869289b0c8ccfb4444257a2b5f72693a3e0')&&<Container>
          <Typography variant="h3" sx={{marginTop:"1rem"}}>
           Approve and Display Results(Admin)
        </Typography>
            {MajElec.filter((mapelection) => mapelection.isComplete&&!mapelection.isExecute).map((election)=>(
          <Grid
            sx={{ marginTop: "3rem", border: 1 }}
            container
            spacing={2}
            justifyContent="center"
            key={election.id}
          >
            <Container>
            <Typography variant="h6">Elec Id:{election.id}</Typography>
              <Typography variant="h4">{election.Name}</Typography>
            </Container>
            <Container>
              <Typography variant="h6">Deadline:{election.VotingPeriod}</Typography>
            </Container>
            <Container>
              <Typography variant="h6" display="inline">
                 {election.Sum}
              </Typography>
              <br />
              <Button          
                              sx={{margin:"1rem",backgroundColor:'black'}}
                              variant="contained"
                              size="small"
                             
                              onClick={()=>handleButtonApprove(election.id,election.wincid)}
                            >
                              Approve and Award Token To Winner
                            </Button>
            {election.candidatearray.length && 
            <Container maxwidth="md">
              <Typography variant="h5" display="inline">
                 Candidates:
                </Typography>
                <Grid container spacing={4}>

                
                  {election.candidatearray.map((candidate) => (
                    <Grid item key={candidate.cid} xs={12} sm={6} md={4}>
                      <Card sx={{backgroundColor:'beige'}}>
                        <CardContent>
                        <Typography variant="h6">
                            {candidate.cName}&nbsp;
                          </Typography>
                          <Typography variant="h6">
                            Vote: {candidate.cvotes}&nbsp;
                          </Typography>
                          {/* <CardActions>
                          
                            <Button
                              variant="contained"
                              size="small"
                              color="primary"
                              onClick={()=>handleButtonClick(election.id,candidate.cid)}
                            >
                              Vote
                            </Button>
                          </CardActions> */}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>}
            </Container>
          </Grid>
        ))}</Container>}
        </Container>}
        
      </Container>
       </div>

    </>
  );
};

export default Home;
