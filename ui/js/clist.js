


$(document).ready(function() {
$('.modal').modal();
	// $.ajax({
 //    url: '/getaddress',
 //    method: 'post'
	// }).done(function(){
	// 	console.log('done');
	// });


	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"hasVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"},{"name":"_startTime","type":"uint256"},{"name":"_endTime","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

	VotingContract = web3.eth.contract(abi);
	contractInstance = VotingContract.at('0x2257445c078ff37f34488c974844195c59abbe78');
	// candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function disableVotingButtons() {
  $('#vote1').addClass("disabled");
  $('#vote2').addClass("disabled");
  $('#vote3').addClass("disabled");
  $('#vote4').addClass("disabled");
}

let startTime, endTime;
var userAddress = readCookie("userAddress");
if (!userAddress) {
  alert("No Ethereum address found in cookie. Please login again.");
  window.location = '/index'; 
}
web3.eth.defaultAccount = userAddress;

contractInstance.startTime.call((err, result) => {
  if (!err) {
    startTime = parseInt(result);

    contractInstance.endTime.call((err2, result2) => {
      if (!err2) {
        endTime = parseInt(result2);
        const now = Math.floor(Date.now() / 1000); // current time in seconds
        const startDate = new Date(startTime * 1000);
        const endDate = new Date(endTime * 1000);

        $('#loc_info').parent().append(
          `<p>Voting time: ${startDate.toLocaleString()} — ${endDate.toLocaleString()}</p>`
        );

        // Check if now is outside the time window
        if (now < startTime || now > endTime) {
          disableVotingButtons();
        } else {
          // Inside voting window, now check if already voted
          contractInstance.hasVoted.call(web3.eth.defaultAccount, (err3, hasVoted) => {
            if (!err3) {
              if (hasVoted) {
                disableVotingButtons();
                $('#loc_info').parent().append('<p>You have already voted.</p>');
              }
              // else: buttons stay enabled
            } else {
              console.error('Error checking vote status:', err3);
            }
          });
        }
      } else {
        console.error('Error getting endTime:', err2);
      }
    });
  } else {
    console.error('Error getting startTime:', err);
  }
});


	//check cookie
	function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
	}

	var employee_list = {
		"10000000" : "Alice",
		"20000000" : "Bob",
		"30000000" : "Carol",
	}

	var employee = readCookie('employeeNo');

	console.log(employee);
	var address = employee_list[employee];
	console.log(address);
	$('#loc_info').text('Employee : '+ address)

	function disable() {
			$('#vote1').addClass( "disabled" );
		    $('#vote2').addClass( "disabled" );
		    $('#vote3').addClass( "disabled" );
		    $('#vote4').addClass( "disabled" );
		    
		    //logout
		    document.cookie = "show=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
		    document.cookie = "employee=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
			document.cookie = "userAddress=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		    window.location = '/app';


	}

	$('#vote1').click(function(){
		contractInstance.voteForCandidate('Maiju Lattu', {from: userAddress}, function() {
		    alert('vote submited to Maiju Lattu');
		    disable();
		    $('#loc_info').text('Vote submited successfully to Maiju Lattu')

		});
	})
	$('#vote2').click(function(){
		contractInstance.voteForCandidate('Pauliina Oksanen', {from: userAddress}, function() {
		    alert('vote submited to Pauliina Oksanen');
		     disable();
		     $('#loc_info').text('Vote submited successfully to Pauliina Oksanen')
		});
	})
	$('#vote3').click(function(){
		contractInstance.voteForCandidate('Leila Toppila', {from: userAddress}, function() {
		    alert('vote submited to Leila Toppila');
		     disable();
		      
		      $('#loc_info').text('Vote submited successfully to Leila Toppila')
		});
	})
	$('#vote4').click(function(){
		contractInstance.voteForCandidate('Sofia Sallinen', {from: userAddress}, function() {
		    alert('vote submited to Sofia Sallinen');
		     disable();
		     $('#loc_info').text('Vote submited successfully to Sofia Sallinen')
		});
	})
});