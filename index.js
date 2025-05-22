var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');	
var passwordHash = require('password-hash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');
var fs = require('fs');
Web3 = require('web3')
solc = require('solc')
var app = express();
app.use( bodyParser.json() )
app.use(cookieParser());
app.use(morgan('combined'));




app.use("/", express.static("ui"));


var username;
var password;
const users = {
  "Alice": { password: "password1", accountIndex: 0 },
  "Bob": { password: "password2", accountIndex: 1 },
  "Carol": { password: "password3", accountIndex: 2 }
};

app.post('/login', function(req, res) {
	const { username, password } = req.body;
  const user = users[username];
 if (user && user.password === password) {
    const hashedPassword = passwordHash.generate(password);
    res.cookie("auth", hashedPassword);
    res.cookie("username", username); 
    res.status(200).send({ message: hashedPassword });
  } else {
    res.status(500).send({ message: 'error' });
  }
});

app.post('/auth', function(req, res) {
    const cookie_pass = req.cookies['auth'];
    const username = req.cookies['username'];
    const user = users[username];

    if (user && passwordHash.verify(user.password, cookie_pass)) {
        res.status(200).send({ message: 'OK' });
    } else {
        res.status(500).send({ message: 'error' });
    }
});

app.get('/', function(req, res) {
    const cookie_pass = req.cookies['auth'];
    const username = req.cookies['username'];
    const user = users[username];

    if (user && passwordHash.verify(user.password, cookie_pass)) {
        res.sendFile(path.join(__dirname, 'ui', 'app.html'));
    } else {
        res.sendFile(path.join(__dirname, 'ui', 'index.html')); 
    }
});


app.get('/app', function(req, res) {
    const cookie_pass = req.cookies['auth'];
    const username = req.cookies['username'];
    const cookie_otp = req.cookies['show'];
    const user = users[username];

    if (user && passwordHash.verify(user.password, cookie_pass)) {
        if (cookie_otp) {
            res.redirect('/info');
        } else {
            res.sendFile(path.join(__dirname, 'ui', 'app.html'));
        }
    } else {
        res.redirect('/');
    }
});

// app.post('/getaddress',function(req,res){

// });

app.get('/info', function(req, res){
	var cookie_pass = req.cookies['auth'];
	var cookie_otp = req.cookies['show'];
	const username = req.cookies['username'];
    const user = users[username];
	const employeeNo = req.cookies['employeeNo'];
	const accountIndexMap = {
  			"10000000": 0,
 	 		"20000000": 1,
  			"30000000": 2,

		};
	if (!cookie_pass || !cookie_otp || !user) {
        return res.redirect('/app');
    }

	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    code = fs.readFileSync('Voting.sol').toString();
    compiledCode = solc.compile(code);
    abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);
    VotingContract = web3.eth.contract(abiDefinition);

    const deployedAddress = '0xf75f23f999d0eff3bd20cd87aa674c22978dfacd';
    contractInstance = VotingContract.at(deployedAddress);
    const accountIndex = accountIndexMap[employeeNo];
	const userAddress = web3.eth.accounts[accountIndex];
    res.cookie("userAddress", userAddress); 

    res.sendFile(path.join(__dirname, 'ui', 'clist.html'));
});




var port = 8080;
app.listen(8080, function () {
  console.log(`app listening on port ${port}!`);
});