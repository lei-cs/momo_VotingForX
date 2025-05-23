# Employee Voting System for X Bank

Employee-based voting system for X Bank using blockchain technology.

Project implemented as part of Introduction to Blockchain Course from Momo Group

## Description

- The employee must log in first with their username and password.
- The voter can now begin the process of voting with proper authentication through OTP (one time password) on the respective linked mobile number.
- If the voter is valid then the system will check for eligibility and the address to which he can give vote.
- The voting process will be opened with candidate names, job positions and photos.
- Now the voter can give his vote by clicking vote button.
- One voter can give her vote only once, i.e after one-time voting buttons are disabled and the vote is automatically logged out.
- Same process continues for many more voters irrespective of their voting wards.

### Installing and Running Project

Clone Project

```
git clone https://github.com/lei-cs/momo_VotingForX.git && cd momo_VotingForX
```

Install Dependencies

```
npm install
```

Running Project

```
node index.js
```

If a dependency problem occurs delete package.json, Run

```
npm init
```

Again Install dependencies and run project.

### Running Project

Step 1 - Setting up Environment
Instead of developing the app against the live Ethereum blockchain, we have used an in-memory blockchain (think of it as a blockchain simulator) called Ganache.

```
npm install ganache-cli -g web3
```

Step 2 - Creating Voting Smart Contract

```
npm install solc
```

Step 3 - Firebase Setup

Go to https://console.firebase.google.com and create a new Firebase project.

In your project directory, update the Firebase configuration block at: ./ui/js/app.html lines 14–26 with the configuration from your new Firebase project (API key, project ID, etc.)

In the file ./ui/js/app.js, update the employee number to phone number mapping at lines 36–40 to reflect valid test numbers linked to your Firebase account.

Step 4 - Deploy the smart contract

You can modify Voting time window in deploy.js#L20-21

```
$ node deploy.js
```

Paste the adderess to ui/js/clist.js line 18

Step 5 - Interacting with the Contract via the Nodejs Console

```
> contractInstance.totalVotesFor.call('Sanat').toLocaleString()
'2'
```

### Purpose of test

- The authority login is to ensure security to prevent piracy, harassment and corruption from candidates standing in election.
- OTP generation is to authenticate the right employee.
- Button disabling and automatic logout is to prevent multiple voting by single candidate.

### Screenshots

- ![](https://github.com/lei-cs/momo_VotingForX/blob/master/screenshot/1.png?raw=true)
- ![](https://github.com/lei-cs/momo_VotingForX/blob/master/screenshot/2.png?raw=true)
- ![](https://github.com/lei-cs/momo_VotingForX/blob/master/screenshot/3.png?raw=true)
- ![](https://github.com/lei-cs/momo_VotingForX/blob/master/screenshot/4.png?raw=true)
- ![](https://github.com/lei-cs/momo_VotingForX/blob/master/screenshot/5.png?raw=true)
- ![](https://github.com/lei-cs/momo_VotingForX/blob/master/screenshot/gan.png?raw=true)

## Deployment

The employee based voting system is developed to overcome the flaws of EVM system. So directly EVM will be replaced by touch screen interface having the great user interface and high security.

## Authors

- **Lei Yang**
- **Mojun Jiang**

- **Sanat Taori**
- **Akshay Motghare**
- **Mandar Patil**
- **Aniket Narkhede**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
