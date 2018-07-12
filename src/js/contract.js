const eth = require("./eth").default;
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "topic",
				"type": "string"
			}
		],
		"name": "accept",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "topic",
				"type": "string"
			}
		],
		"name": "decline",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "declineAll",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "topic",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "NewTopic",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "topic",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Decline",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "topic",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Accept",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "topic",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "ContributeToTopic",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "topic",
				"type": "string"
			}
		],
		"name": "refund",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "refundAll",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "topic",
				"type": "string"
			}
		],
		"name": "requestTopic",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_minForNewTopic",
				"type": "uint256"
			},
			{
				"name": "_minForExistingTopic",
				"type": "uint256"
			}
		],
		"name": "setMins",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "topic",
				"type": "string"
			}
		],
		"name": "getSupportersForTopic",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			},
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getTopic",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTopicCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "minForExistingTopic",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "minForNewTopic",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const contract = web3.eth.contract(abi).at('0x57938d12acc9f239628209c0cf6276693921982a');

export default
{
  getTopicCount()
  {
    return new Promise((resolve, reject) =>
    {
      contract.getTopicCount(function(error, count)
      {
        if(error)
        {
          return reject(error);
        }
        resolve(count);
      });
    });
  },
  getTopic(id)
  {
    return new Promise((resolve, reject) =>
    {
      contract.getTopic(id, function(error, topic)
      {
        if(error)
        {
          return reject(error);
        }
        resolve(topic);
      });
    });
  },
  getSupportersForTopic(topic)
  {
    return new Promise((resolve, reject) =>
    {
      contract.getSupportersForTopic(topic, function(error, addresses, values)
      {
        if(error)
        {
          return reject(error);
        }
        resolve(addresses, values);
      });
    });
  },
  async requestTopic(topic, value, onTxPosted)
  {
    value = await eth.fromEthToWei(value);
    return new Promise((resolve, reject) =>
    {
      contract.requestTopic(topic, {value}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted));
    });
  },
  refund(topic, onTxPosted)
  {
    return new Promise((resolve, reject) =>
    {
      contract.refund(topic, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted));
    });
  },
  refundAll()
  {
    return new Promise((resolve, reject) =>
    {
      contract.refundAll(async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted));
    });
  },
  accept(topic, onTxPosted)
  {
    return new Promise((resolve, reject) =>
    {
      contract.accept(topic, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted));
    });
  },
  decline(topic, onTxPosted)
  {
    return new Promise((resolve, reject) =>
    {
      contract.decline(topic, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted));
    });
  },
  declineAll()
  {
    return new Promise((resolve, reject) =>
    {
      contract.declineAll(async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted));
    });
  },
}

async function onWrite(resolve, reject, error, txhash, onTxPosted)
{
  if(error)
  {
    return reject(error);
  }
  if(onTxPosted)
  {
    onTxPosted(txhash);
  }
  let txobject = await eth.pollForTransactionReceipt(txhash);
  resolve(txobject);
}

// create filter
// var filter = myContractInstance.myEvent({a: 5}, function (error, result) {
//   if (!error)
//     console.log(result);
//     /*
//     {
//         address: '0x8718986382264244252fc4abd0339eb8d5708727',
//         topics: "0x12345678901234567890123456789012", "0x0000000000000000000000000000000000000000000000000000000000000005",
//         data: "0x0000000000000000000000000000000000000000000000000000000000000001",
//         ...
//     }
//     */
// });