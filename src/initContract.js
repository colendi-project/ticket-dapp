$("#trxAlert").hide();

//deploys contract with ABI and address
var ticketContract = web3.eth.contract(ticketABI);
var contractInstance = ticketContract.at(contractAddress);

var tickets = [];

//makes a call to get ticket list length
contractInstance.getTicketsLength.call({}, function(err, ticketCount) {
  if (!err) {
    //gets each tickets information
    for (let i = 0; i < parseInt(ticketCount, 10); i++) {
      contractInstance.getTicket(i, function(err, ticketInfo) {
        if (!err) {
          var price = parseFloat(ticketInfo[1] / Math.pow(10, 18), 10);
          //initializes ticket information
          $("#ticket-title-" + i).text(ticketInfo[0]);
          $("#ticket-price-" + i).text(price);
          $("#ticket-available-" + i).text(parseInt(ticketInfo[2], 10));
          $("#ticket-buy-" + i).on("click", function() {
            buyTicket(i, parseFloat(ticketInfo[1], 10));
          });
        } else {
          console.log(err);
        }
      });
    }
  } else {
    console.log(err);
  }
});

function buyTicket(ticketId, ticketPrice) {
  contractInstance.payForTicket.sendTransaction(
    ticketId,
    { from: web3.eth.accounts[0], gas: 3000000, value: ticketPrice },
    function(err, res) {
      $("#trxAlert").show();
      if (!err) {
        $("#trxAlert").removeClass("alert-success");
        $("#trxAlert").addClass("alert-success");
        $("a").attr("href", "https://rinkeby.etherscan.io/tx/" + res);
        $("#trxStatus").text(res);
      } else {
        $("#trxAlert").removeClass("alert-success");
        $("#trxAlert").addClass("alert-danger");
        $("#trxStatus").text(err.message);
      }
    }
  );
}

function myTickets() {
  contractInstance.getMyTickets.call({}, function(err, res) {
    var totalPrice = 0;
    if (!err) {
      res.sort();
      $("#total-ticket").text(res.length);

      for (let i = 0; i < res.length; i++) {
        contractInstance.getTicket(parseInt(res[i], 10), function(
          err,
          ticketInfo
        ) {
          if (!err) {
            var price = parseFloat(ticketInfo[1] / Math.pow(10, 18), 10);
            totalPrice += price;
            $("#my-ticket-list").append("<tr><th>" + (i + 1) + "</th><td>" + ticketInfo[0] + "</td><td>" + price + " ETH</td></tr>");
            $("#total-price").text(totalPrice);
          } else {
            console.log(err);
          }
        });
      }
    } else {
      console.log(err);
    }
  });
}
