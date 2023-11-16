


//******************************************************************************************
// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;
// import "hardhat/console.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// contract VoteKaro is ERC20 {

//     // Pre-Requisite

//     address private admin;
//     uint256 private id;
//     uint256 private cid;
//     uint256 private vid;

//     struct Election{
//         uint256 id;
//         string name;
//         string description;
//         uint256 votingPeriod;
//         address owner;
//         uint256 completedOn;
//         bool isComplete;
//         bool isExecuted;
//         // string[5] Candidate;
//         // address[5] candidatesAddress;
//         uint256[] candidateid;
//         address[] VotersAddress;
//         uint[] VoteFrequency;
//     }

//     struct Candidate{
//         uint256 cid;
//         string name;
//         uint256 Votes;
//         address caddress;
//         uint256 eid;
//     }


//     struct Voters{
//         uint256 vid;
//          address VoterAddress;
//         uint256 eid;
//         uint256 freq;
//     }

//      mapping (uint => Voters) public voters;

//     mapping (uint => Election) public elections;

//     mapping(uint256=>Candidate) public candidates;

//     constructor() ERC20("VotingToken", "VTK") {
//         admin = msg.sender;
//         _mint(msg.sender, 10000000000000 * 10 ** ERC20.decimals());
//     }

//     // Functions :

//     function createElection(string memory _name, string memory _description, uint256 _votingWeakPeriod) external{
//         id += 1;
//         elections[id].id = id;
//         elections[id].name = _name;
//         elections[id].description = _description;
//         elections[id].votingPeriod = block.timestamp + (_votingWeakPeriod * 1 days);
//         elections[id].owner = msg.sender;


//         // elections[id].Candidate.push("Anmol");
//         // elections[id].Candidate.push("Aarav");
//         // elections[id].Candidate.push("Akansh");
//         // elections[id].Candidate.push("0xdD870fA1b7C4700F2BD7f44238821C26f7392148");
//         // elections[id].Candidate.push("0x583031D1113aD414F02576BD6afaBfb302140225");
//         // elections[id].Candidate.push("0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB");
//     }

//     function createCandidate(string memory name, uint256 ele_id) external returns(uint256){
//         // require(elections[id].votingPeriod > block.timestamp, "Voting period ended");
//         require(elections[id].votingPeriod > block.timestamp, "Election period ended");
//         require(balanceOf(msg.sender)>2000,"Less Token Amount");
//             uint256 cost = 1000;
//             approve(msg.sender, cost);
//             transferFrom(msg.sender, admin, cost);
//             cid+=1;
//             candidates[cid].cid = cid;
//             candidates[cid].name = name;
//             candidates[cid].eid=ele_id;
//             candidates[cid].caddress=msg.sender;
//             elections[ele_id].candidateid.push(cid);
//             return(cid);

//         // cid = elections[id].Candidate.length;
//         // console.log(cid);
//         // console.log(elections[ele_id].name);
//         // console.log(msg.sender);

//         // elections[ele_id].Candidate.push(name);
//         // elections[ele_id].candidatesAddress.push(msg.sender) ;

//         // approve(msg.sender, 1000 * 10 ** ERC20.decimals());
//         // transferFrom(msg.sender, admin, 1000 * 10 ** ERC20.decimals());
//     }


//     function createVoter(uint256 ele_id) external{
//         // require(elections[id].votingPeriod > block.timestamp, "Voting period ended");
//         require(elections[id].votingPeriod > block.timestamp, "Election period ended");
//         vid+=1;
//         voters[vid].vid = vid;
//         voters[vid].VoterAddress =msg.sender;
//         voters[vid].eid=ele_id;
//         voters[vid].freq=1;
//         elections[ele_id].VotersAddress.push(msg.sender);

//         // cid = elections[id].Candidate.length;
//         // console.log(cid);
//         // console.log(elections[ele_id].name);
//         // console.log(msg.sender);

//         // elections[ele_id].Candidate.push(name);
//         // elections[ele_id].candidatesAddress.push(msg.sender) ;

//         // approve(msg.sender, 1000 * 10 ** ERC20.decimals());
//         // transferFrom(msg.sender, admin, 1000 * 10 ** ERC20.decimals());
//     }

//     function voteForCandidate(uint256 ele_id, uint256 c_id) external {
//         //require(Controller.canVote(msg.sender) == true, "don't have voting rights");
//         require(elections[id].votingPeriod > block.timestamp, "Voting period ended");
//         bool hasVotedBefore = false;
//         uint cost;
//         for (uint i = 0; i < elections[ele_id].VotersAddress.length ; i++) {
            
//             if (msg.sender == elections[ele_id].VotersAddress[i]) {
//                 hasVotedBefore=true;
//                 elections[ele_id].VoteFrequency[i] +=1;
//                 cost = 10*elections[ele_id].VoteFrequency[i];
//                 approve(msg.sender, cost );
//                 transferFrom(msg.sender, admin, cost);
//                 candidates[c_id].Votes+=1;
//                 // for (uint j = 0; j < cid ; j++) {
//                 //     if(cand_address==candidates[j].caddress && ele_id==candidates[j].eid){
//                 //         candidates[j].Votes+=1;
//                 //         break;
//                 // }
//                 // }
//                 break;
               
//             }
//         }

//         if (!hasVotedBefore) {
//                 approve(msg.sender, 10 );
//                 transferFrom(msg.sender, admin, 10);
//                 elections[ele_id].VotersAddress.push(msg.sender);
//                 elections[ele_id].VoteFrequency.push(1);
//                 candidates[c_id].Votes+=1;
//                 // for (uint i = 0; i < cid ; i++) {
//                 //     if(cand_address==candidates[i].caddress && ele_id==candidates[i].eid){
//                 //         candidates[i].Votes+=1;
//                 //         break;
//                 // }
//                 // }

//         }
//     }
    
//     // Function for people to buy tokens
//     function buyTokens(uint256 _amount) external {
//         require(_amount > 0, "Amount must be greater than zero");
        
//         _mint(msg.sender, _amount);
//     }

//     // Toekn display function
//     function displayTokens() public view returns (uint256){
//         uint256 number = balanceOf(msg.sender);
//         return number;
//     }

//     function getAllElections() external view returns (uint256[] memory, string[] memory, string[] memory, uint256[] memory, address[] memory, uint256[] memory, bool[] memory, bool[] memory) {
//     uint256[] memory ids = new uint256[](id);
//     string[] memory names = new string[](id);
//     string[] memory descriptions = new string[](id);
//     uint256[] memory votingPeriods = new uint256[](id);
//     address[] memory owners = new address[](id);
//     uint256[] memory completedOnArray = new uint256[](id);
//     bool[] memory isCompleteArray = new bool[](id);
//     bool[] memory isExecutedArray = new bool[](id);


//     for (uint256 i = 1; i <= id; i++) {
//         ids[i - 1] = elections[i].id;
//         names[i - 1] = elections[i].name;
//         descriptions[i - 1] = elections[i].description;
//         votingPeriods[i - 1] = elections[i].votingPeriod;
//         owners[i - 1] = elections[i].owner;
//         completedOnArray[i - 1] = elections[i].completedOn;
//         isCompleteArray[i - 1] = elections[i].isComplete;
//         isExecutedArray[i - 1] = elections[i].isExecuted;
        
//     }

//     return (ids, names, descriptions, votingPeriods, owners, completedOnArray, isCompleteArray, isExecutedArray);
// }

// function getAllCandidatesElec(uint256 ele_id) external view returns (uint256[] memory, string[] memory, uint256[] memory, address[] memory, uint256[] memory) {
//     uint256[] memory cids = new uint256[](cid);
//     string[] memory names = new string[](cid);
//     uint256[] memory votes = new uint256[](cid);
//     address[] memory caddresses = new address[](cid);
//     uint256[] memory electionIds = new uint256[](cid);

//     uint256 count = 0;
//     for (uint256 i = 1; i <= cid; i++) {
//         if (candidates[i].eid == ele_id) {
//             cids[count] = candidates[i].cid;
//             names[count] = candidates[i].name;
//             votes[count] = candidates[i].Votes;
//             caddresses[count] = candidates[i].caddress;
//             electionIds[count] = candidates[i].eid;
//             count++;
//         }
//     }

//     return (cids, names, votes, caddresses, electionIds);
// }




// }



// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VoteKaro is ERC20 {

    // Pre-Requisite

    address private admin;
    uint256 private id;
    uint256 private cid;
    uint256 private vid;

    struct Election{
        uint256 id;
        string name;
        string description;
        uint256 votingPeriod;
        address owner;
        uint256 completedOn;
        bool isComplete;
        bool isExecuted;
        // string[5] Candidate;
        // address[5] candidatesAddress;
        uint256[] candidateid;
        address[] VotersAddress;
        uint[] VoteFrequency;
    }

    struct Candidate{
        uint256 cid;
        string name;
        uint256 Votes;
        address caddress;
        uint256 eid;
    }


    struct Voters{
        uint256 vid;
         address VoterAddress;
        uint256 eid;
        uint256 freq;
    }

     mapping (uint => Voters) public voters;

    mapping (uint => Election) public elections;

    mapping(uint256=>Candidate) public candidates;

    constructor() ERC20("VotingToken", "VTK") {
        admin = msg.sender;
        _mint(msg.sender, 10000000000000 * 10 ** ERC20.decimals());
    }

    // Functions :

    function createElection(string memory _name, string memory _description, uint256 _votingWeakPeriod) external{
        id += 1;
        elections[id].id = id;
        elections[id].name = _name;
        elections[id].description = _description;
        elections[id].votingPeriod = block.timestamp + _votingWeakPeriod*60;
        elections[id].owner = msg.sender;


        // elections[id].Candidate.push("Anmol");
        // elections[id].Candidate.push("Aarav");
        // elections[id].Candidate.push("Akansh");
        // elections[id].Candidate.push("0xdD870fA1b7C4700F2BD7f44238821C26f7392148");
        // elections[id].Candidate.push("0x583031D1113aD414F02576BD6afaBfb302140225");
        // elections[id].Candidate.push("0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB");
    }

    function createCandidate(string memory name, uint256 ele_id) external returns(uint256){
        // require(elections[id].votingPeriod > block.timestamp, "Voting period ended");
        require(elections[id].votingPeriod > block.timestamp, "Election period ended");
        require(balanceOf(msg.sender)>2000,"Less Token Amount");
            uint256 cost = 1000;
            approve(msg.sender, cost);
            transferFrom(msg.sender, admin, cost);
            cid+=1;
            candidates[cid].cid = cid;
            candidates[cid].name = name;
            candidates[cid].eid=ele_id;
            candidates[cid].caddress=msg.sender;
            elections[ele_id].candidateid.push(cid);
            return(cid);

        // cid = elections[id].Candidate.length;
        // console.log(cid);
        // console.log(elections[ele_id].name);
        // console.log(msg.sender);

        // elections[ele_id].Candidate.push(name);
        // elections[ele_id].candidatesAddress.push(msg.sender) ;

        // approve(msg.sender, 1000 * 10 ** ERC20.decimals());
        // transferFrom(msg.sender, admin, 1000 * 10 ** ERC20.decimals());
    }


    function createVoter(uint256 ele_id) external{
        // require(elections[id].votingPeriod > block.timestamp, "Voting period ended");
        require(elections[id].votingPeriod > block.timestamp, "Election period ended");
        vid+=1;
        voters[vid].vid = vid;
        voters[vid].VoterAddress =msg.sender;
        voters[vid].eid=ele_id;
        voters[vid].freq=1;
        elections[ele_id].VotersAddress.push(msg.sender);

        // cid = elections[id].Candidate.length;
        // console.log(cid);
        // console.log(elections[ele_id].name);
        // console.log(msg.sender);

        // elections[ele_id].Candidate.push(name);
        // elections[ele_id].candidatesAddress.push(msg.sender) ;

        // approve(msg.sender, 1000 * 10 ** ERC20.decimals());
        // transferFrom(msg.sender, admin, 1000 * 10 ** ERC20.decimals());
    }

    function voteForCandidate(uint256 ele_id, uint256 c_id) external {
        //require(Controller.canVote(msg.sender) == true, "don't have voting rights");
        require(elections[ele_id].votingPeriod > block.timestamp, "Voting period ended");
        bool hasVotedBefore = false;
        uint cost;
        for (uint i = 0; i < elections[ele_id].VotersAddress.length ; i++) {
            
            if (msg.sender == elections[ele_id].VotersAddress[i]) {
                hasVotedBefore=true;
                elections[ele_id].VoteFrequency[i] +=1;
                cost = 10*elections[ele_id].VoteFrequency[i];
                approve(msg.sender, cost );
                transferFrom(msg.sender, admin, cost);
                candidates[c_id].Votes+=1;
                // for (uint j = 0; j < cid ; j++) {
                //     if(cand_address==candidates[j].caddress && ele_id==candidates[j].eid){
                //         candidates[j].Votes+=1;
                //         break;
                // }
                // }
                break;
               
            }
        }

        if (!hasVotedBefore) {
                approve(msg.sender, 10 );
                transferFrom(msg.sender, admin, 10);
                elections[ele_id].VotersAddress.push(msg.sender);
                elections[ele_id].VoteFrequency.push(1);
                candidates[c_id].Votes+=1;
                // for (uint i = 0; i < cid ; i++) {
                //     if(cand_address==candidates[i].caddress && ele_id==candidates[i].eid){
                //         candidates[i].Votes+=1;
                //         break;
                // }
                // }

        }
    }
    
    // Function for people to buy tokens
    function buyTokens(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        
        _mint(msg.sender, _amount);
    }

    // Toekn display function
    function displayTokens() public view returns (uint256){
        uint256 number = balanceOf(msg.sender);
        return number;
    }


    function getExecuted(uint256 ele_id,uint c_id) external returns(uint256){
        require(elections[ele_id].votingPeriod < block.timestamp, "let voting  period end");
        // require(elections[id].votingPeriod > block.timestamp, "Election period ended")
        // require(balanceOf(msg.sender)>2000,"Less Token Amount");
            
            uint256 cost = 1000*elections[ele_id].candidateid.length;
            approve(msg.sender, cost);
            transferFrom(msg.sender,candidates[c_id].caddress, cost);
            // cid+=1;
            // candidates[cid].cid = cid;
            // candidates[cid].name = name;
            // candidates[cid].eid=ele_id;
            // candidates[cid].caddress=msg.sender;
            elections[ele_id].isComplete=true;
            elections[ele_id].isExecuted=true;
            return(cid);

        // cid = elections[id].Candidate.length;
        // console.log(cid);
        // console.log(elections[ele_id].name);
        // console.log(msg.sender);

        // elections[ele_id].Candidate.push(name);
        // elections[ele_id].candidatesAddress.push(msg.sender) ;

        // approve(msg.sender, 1000 * 10 ** ERC20.decimals());
        // transferFrom(msg.sender, admin, 1000 * 10 ** ERC20.decimals());
    }

    function getAllElections() external view returns (uint256[] memory, string[] memory, string[] memory, uint256[] memory, address[] memory, uint256[] memory, bool[] memory, bool[] memory) {
    uint256[] memory ids = new uint256[](id);
    string[] memory names = new string[](id);
    string[] memory descriptions = new string[](id);
    uint256[] memory votingPeriods = new uint256[](id);
    address[] memory owners = new address[](id);
    uint256[] memory completedOnArray = new uint256[](id);
    bool[] memory isCompleteArray = new bool[](id);
    bool[] memory isExecutedArray = new bool[](id);




    for (uint256 i = 1; i <= id; i++) {
        console.log(elections[i].votingPeriod );
        console.log(block.timestamp);
        if(elections[i].votingPeriod < block.timestamp){
            
            isCompleteArray[i - 1] = true;
        }
        else{
            isCompleteArray[i - 1] = elections[i].isComplete;
        }
        ids[i - 1] = elections[i].id;
        names[i - 1] = elections[i].name;
        descriptions[i - 1] = elections[i].description;
        votingPeriods[i - 1] = elections[i].votingPeriod;
        owners[i - 1] = elections[i].owner;
        completedOnArray[i - 1] = elections[i].completedOn;
        
        isExecutedArray[i - 1] = elections[i].isExecuted;
        console.log(isCompleteArray[i - 1] );
        
    }

    return (ids, names, descriptions, votingPeriods, owners, completedOnArray, isCompleteArray, isExecutedArray);
}

function getAllCandidatesElec(uint256 ele_id) external view returns (uint256[] memory, string[] memory, uint256[] memory, address[] memory, uint256[] memory) {
    uint256[] memory cids = new uint256[](cid);
    string[] memory names = new string[](cid);
    uint256[] memory votes = new uint256[](cid);
    address[] memory caddresses = new address[](cid);
    uint256[] memory electionIds = new uint256[](cid);

    uint256 count = 0;
    for (uint256 i = 1; i <= cid; i++) {
        if (candidates[i].eid == ele_id) {
            cids[count] = candidates[i].cid;
            names[count] = candidates[i].name;
            votes[count] = candidates[i].Votes;
            caddresses[count] = candidates[i].caddress;
            electionIds[count] = candidates[i].eid;
            count++;
        }
    }

    return (cids, names, votes, caddresses, electionIds);
}




}