"use strict";

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */

 // Unpkg imports
var Web3Modal = window.Web3Modal.default;
var Portis = window.Portis;
var EvmChains = window.EvmChains;


// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;

var web3;


// Address of the selected account
let selectedAccount;



function init() {

  console.log("Initializing example");
  console.log("PortisProvider is", Portis);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);


  const providerOptions = {
    portis: {
      package: Portis,
      options: {
        id: "1509a918-1e69-463f-9863-378c27df8b93",
		network: "matic"  
      }
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  web3 = new Web3(provider);

  console.log("Web3 instance is", web3);

  const chainId = await web3.eth.getChainId();

  const chainData = await EvmChains.getChain(chainId);

  const accounts = await web3.eth.getAccounts();
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];

	
function updateRewards(){
axios.post('https://us-central1-matic-services.cloudfunctions.net/getminingrewards', {"address":""+selectedAccount+""})
  .then(function (response) {
    var balance = response.data.balance;
	document.getElementById("balance").innerHTML = balance;
	var rewards =response.data.rewards;
	document.getElementById("rewards").innerHTML = rewards;	
  })
  .catch(function (error) {
    console.log(error);
  });
}
	
updateRewards();


}




async function refreshAccountData() {

  await fetchAccountData(provider);
 
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });	

  await refreshAccountData();
}

function claimRewards(){
const abi = [{"inputs": [{"internalType": "uint256","name": "supply","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "spender","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Approval","type": "event"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "approve","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "subtractedValue","type": "uint256"}],"name": "decreaseAllowance","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "addedValue","type": "uint256"}],"name": "increaseAllowance","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "recipient","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "transfer","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "address","name": "sender","type": "address"},{"internalType": "address","name": "recipient","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "transferFrom","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address[]","name": "players","type": "address[]"}],"name": "updateLiquidRewards","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "withdrawRewards","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "address","name": "spender","type": "address"}],"name": "allowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "account","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint8","name": "","type": "uint8"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "player","type": "address"}],"name": "getLiquidRewards","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "minerInfo","outputs": [{"internalType": "uint256","name": "liquidRewards","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"}];

const contract_Address = "0x9456000C7111a4308e17E912933782aEA1e29a49";

const myContract = new web3.eth.Contract(abi, contract_Address, {
    from: selectedAccount // default from address
    });	

myContract.methods.withdrawRewards().send({gas: 1500000})
.on('receipt', function(receipt){														 

axios.post('https://us-central1-matic-services.cloudfunctions.net/getminingrewards', {"address":""+selectedAccount+""})
  .then(function (response) {
    var balance = response.data.balance;
	document.getElementById("balance").innerHTML = balance;
	var rewards =response.data.rewards;
	document.getElementById("rewards").innerHTML = rewards;	
  })
  .catch(function (error) {
    console.log(error);
  });
	
axios.post('https://us-central1-matic-services.cloudfunctions.net/circulatingsupply', {})
  .then(function (response) {
    var circulating = response.data.supply;
	var supply = circulating.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	document.getElementById("supply").innerHTML = supply;
	var percent =((circulating/43800000)*100).toFixed(5);
	document.getElementById("percent").innerHTML = ""+percent+"% CUBE mined";	
  })
  .catch(function (error) {
    console.log(error);
  });
	
})	
}


/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  
});
