pragma solidity ^0.4.24;

contract dEventTicket {
    
    struct Ticket{
        string name;
        uint256 price;
        uint256 amount;
    }
    
    mapping (address => uint256[]) paidTickets;
    mapping (uint256 => address) ticketCreator;
    mapping (uint256 => uint256) revenueOfTicket;
    
    Ticket[] tickets;
    
    function createTicket(string _name, uint256 _price, uint256 _amount) external{
        Ticket memory ticket = Ticket({name:_name, price:_price, amount:_amount});
        uint index = tickets.push(ticket)-1;
        ticketCreator[index] = msg.sender;
    }
    
    function getTicketsLength() external view returns (uint256 size) {
        return tickets.length;
    }
    
    function getTicket(uint index) external view returns(string name, uint256 price, uint256 amount){
        Ticket memory ticket = tickets[index];
        name = ticket.name;
        price = ticket.price;
        amount = ticket.amount;
    }
    
    function payForTicket(uint index) external payable{
        Ticket storage ticket = tickets[index];
        require(msg.value >= ticket.price);
        require(msg.sender.send(msg.value-ticket.price));
        require(ticket.amount>0);
        paidTickets[msg.sender].push(index);
        ticket.amount = ticket.amount - 1;
        revenueOfTicket[index] = revenueOfTicket[index] + ticket.price;
    }
    
    function getMyTickets() external view returns (uint[] mytickets){
        return paidTickets[msg.sender];
    }
    
    function getMoneyBack (uint index) external {
        require(ticketCreator[index] == msg.sender);
        require(msg.sender.send(revenueOfTicket[index]));
        revenueOfTicket[index] = 0;
       
    }
    
}