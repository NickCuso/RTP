import eth from "./eth";
import localstorage from "./localstorage";

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

let contract = null;
let contract_address;

window.addEventListener('DOMContentLoaded', async () =>
{
	let e = eth.getEth();
	contract_address = '0xebb96c1606c34508ab1e62fa97e07ab8e77c1df7';
	let network_type = await eth.getNetworkType();
	if(network_type == 3)
	{
		contract_address = '0x707dfced14c240c2eef1ff65490981e9893aa7fa';
	}
	let my_contract = new e.Contract(abi, contract_address);
	my_contract.options.from = await eth.getAddress();
	contract = my_contract.methods;
});

function sleep(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function init()
{
  while(!eth.getIsInit())
  {
    await sleep(500);
  }
}

export default
{
	async getContractAddress()
	{
		await init();
		return contract_address;
	},
	async getContractUrl()
	{
		await init();
		return await eth.getEtherscanUrl() + "/address/" + contract_address;
	},
  async getTopicCount()
  {
		await init();
    return new Promise((resolve, reject) =>
    {
      contract.getTopicCount().call(function(error, count)
      {
        if(error)
        {
          return reject(error);
        }
        resolve(count);
      });
    });
  },
  async getTopic(id)
  {
		await init();
    return new Promise((resolve, reject) =>
    {
      contract.getTopic(id).call(function(error, topic)
      {
        if(error)
        {
          return reject(error);
        }
        resolve(topic);
      });
    });
  },
  async getSupportersForTopic(topic)
  {
		await init();

    return new Promise((resolve, reject) =>
    {
      contract.getSupportersForTopic(topic).call(function(error, addresses, values)
      {
        if(error)
        {
          return reject(error);
        }
        resolve(addresses, values);
      });
    });
	},
	async getOwner()
	{
		await init();

		return new Promise((resolve, reject) =>
		{
			contract.owner().call((error, owner) =>
			{
				console.log("Owner: " + owner);
        if(error)
        {
          return reject(error);
        }
				resolve(owner);
			});
		});
	},
	async getIsOwner()
	{
		let owner = await this.getOwner();
		let user = await eth.getAddress();
		return owner == user;
	},
  async requestTopic(topic, value, onTxPosted)
  {
		await init();

    value = await eth.fromEthToWei(value);
    return new Promise((resolve, reject) =>
    {
      contract.requestTopic(topic).send({value, gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted));
    });
  },
  async refund(topic, onTxPosted)
  {
		await init();

    return new Promise((resolve, reject) =>
    {
      contract.refund(topic).send({gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted));
    });
  },
  async refundAll()
  {
		await init();

    return new Promise((resolve, reject) =>
    {
      contract.refundAll().send({gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted));
    });
  },
  async accept(topic, onTxPosted)
  {
		await init();

    return new Promise((resolve, reject) =>
    {
      contract.accept(topic).send({gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted));
    });
  },
  async decline(topic, onTxPosted)
  {
		await init();

    return new Promise((resolve, reject) =>
    {
      contract.decline(topic).send({gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted));
    });
  },
  async declineAll()
  {
		await init();

    return new Promise((resolve, reject) =>
    {
      contract.declineAll().send({gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted));
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