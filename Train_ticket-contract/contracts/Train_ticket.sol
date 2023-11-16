// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Train_tickets {
    address owner;
    uint256 public ticketPrice;

    struct Ticket {
        uint256 ticketId;
        address buyer;
    }

    mapping(address => uint256) public wallets;
    mapping(address => Ticket) public tickets;
    mapping(address => bool) public members;

    event Ticket_Purchased(uint256 Ticket_ID, address buyer);
    event Member_Registerd(address member);

    constructor(uint256 set_Price) {
        owner = msg.sender;
        ticketPrice = set_Price;
    }

    function register() external {
        require(!members[msg.sender], "You are already a member");

        members[msg.sender] = true;
        emit Member_Registerd(msg.sender);
    }

    function buy_ticket() public payable {
        require(wallets[msg.sender] > 0, "Tansaction Failed");

        if (members[msg.sender] == true) {
            require(
                wallets[msg.sender] >= ticketPrice / 2,
                "Tansaction Failed"
            );
            wallets[msg.sender] -= ticketPrice / 2;
            tickets[msg.sender].buyer = msg.sender;
            tickets[msg.sender].ticketId = 1;
            emit Ticket_Purchased(tickets[msg.sender].ticketId, msg.sender);
        } else {
            require(wallets[msg.sender] >= ticketPrice, "Tansaction Failed");
            wallets[msg.sender] -= ticketPrice / 2;
            tickets[msg.sender].buyer = msg.sender;
            tickets[msg.sender].ticketId = 1;
            emit Ticket_Purchased(tickets[msg.sender].ticketId, msg.sender);
        }
    }

    function set_price(uint new_Price) public {
        require(owner == msg.sender, "Access Denied");
        ticketPrice = new_Price;
    }

    function set_balance() public payable {
        require(msg.value > 0, "Must deposit amount more than zero!");
        wallets[msg.sender] += msg.value;
    }

    function get_balnace() public view returns (uint256) {
        return wallets[msg.sender];
    }

    function withdraw(uint256 amount) public {
        require(amount > 0, "Can not withdraw 0");
        require(wallets[msg.sender] >= amount, "Trasaction Failed");

        wallets[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function get_price() public view returns (uint256) {
        return ticketPrice;
    }
}
