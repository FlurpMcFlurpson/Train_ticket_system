// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Train_tickets {
    address owner;
    uint256 public ticketPrice;

    struct Ticket {
        uint256 ticketId;
        address buyer;
    }

    mapping(uint256 => Ticket) public tickets;
    mapping(address => bool) public members;

    event Ticket_Purchased(uint256 Ticket_ID, address buyer);
    event Member_Registerd(address member);

    constructor(uint256 ticket_Price) {
        owner = msg.sender;
        ticketPrice = ticket_Price;
    }

    function register() external {
        require(!members[msg.sender], "You are already a member");

        members[msg.sender] = true;
        emit Member_Registerd(msg.sender);
    }

    function buy_ticket(uint256 Ticket_ID) public payable {
        require(msg.value >= ticketPrice, "Tansaction Failed");

        tickets[Ticket_ID].buyer = msg.sender;
        emit Ticket_Purchased(Ticket_ID, msg.sender);
    }
}
