const set_balance_Button = document.getElementById('setbalance-button');
const Withdraw_button = document.getElementById('Withdraw-button');
const CheakButton = document.getElementById('Cheak-button');
const Balance = document.getElementById('Balance');
const counterValue = document.getElementById('Ticket_Price');
const register = document.getElementById('Member-Reg');
const new_Price_button = document.getElementById('new_price_button')
const buy_ticket_button = document.getElementById('buy_ticket_button')
const Address = '0xfc660f54c5a84b0C1d2e635EB514d5fea910681A';
const MetaMask = document.getElementById('enableEthereumButton');
const ABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "set_Price",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "member",
                "type": "address"
            }
        ],
        "name": "Member_Registerd",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "Ticket_ID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            }
        ],
        "name": "Ticket_Purchased",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "members",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "ticketPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "tickets",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "ticketId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "wallets",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "register",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "buy_ticket",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "new_Price",
                "type": "uint256"
            }
        ],
        "name": "set_price",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "set_balance",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    },
    {
        "inputs": [],
        "name": "get_balnace",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_price",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
]
const web3 = new Web3(window.ethereum);
const Trian = new web3.eth.Contract(ABI, Address);
Trian.setProvider(window.ethereum);

window.addEventListener('load', async (event) => {
    const value = await get_price();
    const etherValue = Web3.utils.fromWei(value, 'ether');
    counterValue.innerHTML = etherValue;
    console.log("updated");
})

set_balance_Button.onclick = async () => {
    const accounts = await web3.eth.getAccounts();
    const value = document.getElementById('setbalance').value;
    const WeiValue = Web3.utils.toWei(value, 'ether');
    await Trian.methods.set_balance().send({ from: accounts[0], value: WeiValue });
}

CheakButton.onclick = async () => {
    const accounts = await web3.eth.getAccounts();
    const value = await Trian.methods.get_balnace().call({ from: accounts[0] });
    const etherValue = Web3.utils.fromWei(value, 'ether');
    Balance.innerHTML = etherValue;

}

Withdraw_button.onclick = async () => {
    const accounts = await web3.eth.getAccounts();
    const value = document.getElementById('Withdraw').value;
    const WeiValue = Web3.utils.toWei(value, 'ether');
    await Trian.methods.withdraw(WeiValue).send({ from: accounts[0] });

}

async function get_price() {
    const value = await Trian.methods.get_price().call();
    return value;
}

register.onclick = async () => {
    const accounts = await web3.eth.getAccounts();
    await Trian.methods.register().send({ from: accounts[0] })
}

new_Price_button.onclick = async () => {
    const accounts = await web3.eth.getAccounts();
    const value = document.getElementById('new_price').value
    const etherValue = web3.utils.toWei(value, 'ether');
    await Trian.methods.set_price(etherValue).send({ from: accounts[0] })
}


buy_ticket_button.onclick = async () => {
    const accounts = await web3.eth.getAccounts();
    await Trian.methods.buy_ticket().send({ from: accounts[0] })
}

MetaMask.onclick = async () => {
    if (typeof window.ethereum !== 'undefined') {
        await ethereum.request({ method: 'eth_requestAccounts' });
    }
    else {
        alert("Please install MetaMask")
    }
}