$("#networkInfo").text("Make sure you are connected to Rinkeby testnet!");

//checks if any web is defined
if (typeof web3 !== "undefined") {
  // sets current provider as a pweb3 provider
  web3.setProvider(new Web3(web3.currentProvider));
  //gets and initializes account information with network
  web3.eth.getAccounts(function (err, accounts) {
    if (err != null) {
      console.error("An error occurred: " + err);
    } else if (accounts.length == 0) {
      $("#accountStatus").text("Please log in your Metamask Account");
    } else {
      $("#accountStatus").text(getNetworkInfo(web3.version.network));
      $("#accountAddress").text(accounts[0]);
      
      web3.eth.getBalance(accounts[0], (err, balance) => {
        $("#accountBalance").text(web3.fromWei(balance, "ether") + " ETH");
      });
    }
  });
} else {
  $("#accountStatus").text("Please activate your Metamask account!");
}

//cheks network id and returns the network name 
function getNetworkInfo(networkId) {
  var networkName = "";
  switch (networkId) {
    case "1":
      networkName = "Main";
      break;
    case "2":
      networkName = "Morden";
      break;
    case "3":
      networkName = "Ropsten";
      break;
    case "4":
      networkName = "Rinkeby";
      break;
    case "42":
      networkName = "Kovan";
      break;
    default:
      networkName = "Unknown";
  }

  return networkName;
}
