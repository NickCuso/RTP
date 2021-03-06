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
let is_init = false;

window.addEventListener('DOMContentLoaded', async () =>
{
	let e = eth.getEth();
	let network_type = await eth.getNetworkType();
	if(network_type == 1)
	{
		contract_address = '0xebb96c1606c34508ab1e62fa97e07ab8e77c1df7';
	}
	else if(network_type == 3)
	{
		contract_address = '0x707dfced14c240c2eef1ff65490981e9893aa7fa';
	}

	if(contract_address)
	{
		let my_contract = new e.Contract(abi, contract_address);
		let from = await eth.getAddress();
		if(from)
		{	
			my_contract.options.from = from;
			// didn't help my_contract.defaultAccount = from.toString();
		}
		else
		{
			// didn't help. my_contract.options.from = "0xdb92C096bc5Efa8aDB48F05CD601DDdb75228203";
		}
		contract = my_contract.methods;
	}

	is_init = true;
});

function sleep(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function init()
{
  while(!is_init || !eth.getIsInit())
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
		if(!contract_address)
		{
			return null;
		}
		return await eth.getEtherscanUrl() + "/address/" + contract_address;
	},
  async getTopicCount()
  {
		await init();
		if(!contract_address)
		{
			return null;
		}
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
		if(!contract_address)
		{
			return null;
		}

		return await _call(() =>
		{
			return contract.owner();
		});		
	},
	async setOwner(owner, onTxPosted, onTxComplete)
	{
		if(!contract_address || !owner || owner.length < 5)
		{
			return;
		}

		return new Promise((resolve, reject) =>
		{
			contract.transferOwnership(owner).send({gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted, onTxComplete))
		});
	},
	async getMinForNewTopic()
	{
		if(!contract_address)
		{
			return null;
		}

		return await _call(() =>
		{
			return contract.minForNewTopic();
		});		
	},
	async getMinForExistingTopic()
	{
		if(!contract_address)
		{
			return null;
		}

		return await _call(() =>
		{
			return contract.minForExistingTopic();
		});		
	},
	async getIsOwner()
	{
		let owner = await this.getOwner();
		let user = await eth.getAddress();
		return owner == user;
	},
  async requestTopic(topic, value, onTxPosted, onTxComplete)
  {
		await init();

    value = await eth.fromEthToWei(value);
    return new Promise((resolve, reject) =>
    {
      contract.requestTopic(topic).send({value, gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted, onTxComplete));
    });
  },
  async refund(topic, onTxPosted, onTxComplete)
  {
		await init();

    return new Promise((resolve, reject) =>
    {
      contract.refund(topic).send({gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted, onTxComplete));
    });
  },
  async refundAll(onTxPosted, onTxComplete)
  {
		await init();

    return new Promise((resolve, reject) =>
    {
      contract.refundAll().send({gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted, onTxComplete));
    });
	},
	async setMins(min_for_new_topic, min_for_existing_topic, onTxPosted, onTxComplete)
	{
		await init();

		return new Promise((resolve, reject) =>
		{
			contract.setMins(min_for_new_topic, min_for_existing_topic).send({gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted, onTxComplete))
		});
	},
  async accept(topic, onTxPosted, onTxComplete)
  {
		await init();

    return new Promise((resolve, reject) =>
    {
      contract.accept(topic).send({gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted, onTxComplete));
    });
  },
  async decline(topic, onTxPosted, onTxComplete)
  {
		await init();

    return new Promise((resolve, reject) =>
    {
      contract.decline(topic).send({gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted, onTxComplete));
    });
  },
  async declineAll(onTxPosted, onTxComplete)
  {
		await init();

    return new Promise((resolve, reject) =>
    {
      contract.declineAll().send({gasPrice: localstorage.getGasPriceInWei()}, async (error, txhash) => onWrite(resolve, reject, error, txhash, onTxPosted, onTxComplete));
    });
  },
}

async function onWrite(resolve, reject, error, txhash, onTxPosted, onTxComplete)
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
	onTxComplete(txobject);
  resolve(txobject);
}

async function _call(call)
{
	await init();
	return new Promise((resolve, reject) =>
	{
		call().call((error, results) =>
		{
			if(error)
			{
				return reject(error);
			}
			resolve(results);
		});
	});
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