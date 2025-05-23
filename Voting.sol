pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  
  mapping (bytes32 => uint8) public votesReceived;
  
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */
  
  bytes32[] public candidateList;
   uint public startTime;
    uint public endTime;
/* Record whether the address has voted
*/
mapping(address => bool) public hasVoted;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
constructor(bytes32[] candidateNames, uint _startTime, uint _endTime) public {
    candidateList = candidateNames;
    startTime = _startTime;
    endTime = _endTime;
}


  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bytes32 candidate) public view returns (uint8) {
    require(validCandidate(candidate), "Invalid candidate.");
    return votesReceived[candidate];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidate(bytes32 candidate) public {
    require(now >= startTime && now <= endTime, "Voting is not allowed at this time.");
        require(validCandidate(candidate), "Invalid candidate.");
        require(!hasVoted[msg.sender], "You have already voted.");
    votesReceived[candidate] += 1;
    hasVoted[msg.sender] = true; //Record voting status
  }

  function validCandidate(bytes32 candidate) public view returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }
}
