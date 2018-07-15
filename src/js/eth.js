import Web3 from "web3";
import localstorage from "./localstorage";
import createLedgerSubprovider from "@ledgerhq/web3-subprovider";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import ProviderEngine from "web3-provider-engine";
import RpcSubprovider from "web3-provider-engine/subproviders/rpc";

let is_init = false;
let my_web3 = null;
let address;

window.addEventListener('DOMContentLoaded', async () =>
{
  let network_type = localstorage.getNetworkType();
  let rpcUrl;
  if(network_type == 3)
  {
    rpcUrl = 'https://ropsten.infura.io';
  }
  else
  {
    rpcUrl = 'https://mainnet.infura.io';
  }
  if(localstorage.getWalletType() == 1)
  { // Ledger
    const engine = new ProviderEngine();
    const getTransport = () => TransportU2F.create();
    const ledger = createLedgerSubprovider(getTransport, {
      networkId: localstorage.getNetworkType(),
      accountsLength: 1,
      // TODO add offset support
    });
    engine.addProvider(ledger);

    engine.addProvider(new RpcSubprovider({ rpcUrl }));
    engine.start();
    my_web3 = new Web3(engine); // ledger
  }
  else if (typeof web3 !== 'undefined') 
  { // Metamask
    my_web3 = new Web3(web3.currentProvider);
  }
  else
  { // Nothing
    my_web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
  }
  is_init = true;
});

function sleep(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

 async function init()
 {
  while(!is_init)
  {
    await sleep(500);
  }
 }
export default
{
  getIsInit()
  {
    return is_init;
  },
  getEth()
  {
    return my_web3.eth;
  },
  async getEtherscanUrl()
  {
		await init();
    switch(await this.getNetworkType())
    {
      case 1:
        return "https://etherscan.io";
      case 3:
        return "https://ropsten.etherscan.io";
    }
  },
	async getTxUrl(txhash)
	{
		await init();
		return await this.getEtherscanUrl() + "/tx/" + txhash;
	},
  async getNetworkType()
  {
    if(localstorage.getWalletType() == 0 && await this.getAddress() != null)
    {
      await init();
      return new Promise((resolve, reject) =>
      {
        web3.version.getNetwork((error, netId) => 
        {
          if(error)
          {
            return reject(error);
          }
          resolve(parseInt(netId));
        });
      });
    }
    else
    {
      let network = localstorage.getNetworkType();
      if(network != null)
      {
        return network;
      }
      else 
      {
        return 1;
      }
    }
  },
  getIsMetamaskInstalled()
  {
    return typeof web3 !== 'undefined';
  },
  async getAddress()
  {
    if(address !== undefined)
    {
      return address;
    }
    await init();
    return new Promise((resolve, reject) =>
    {
      let done = false;
      setTimeout(() =>
      {
        if(done)
        {
          return;
        }
        done = true;
        address = null;
        resolve(address);
      }, 1000);

      my_web3.eth.getAccounts((err, accounts) =>
      {
        if(done)
        {
          return;
        }
        done = true;
        if(err || accounts.length < 1)
        {
          address = null;
          return resolve(address);
        }
        
        address = accounts[0];
        my_web3.eth.defaultAccount = address;
        resolve(address);
      });
    }); 
  },
  async getBalance()
  {
    await init();
    return new Promise(async (resolve, reject) =>
    {
      let account = await this.getAddress();
      if(!account)
      {
        return reject('No account found.');
      }
      my_web3.eth.getBalance(account, function(err, balance)
      {
        if(err)
        {
          return reject(err);
        }
        resolve(balance);    
      });
    });
  },
  async getBalanceInEth()
  {
    await init();
    let balance = await this.getBalance();
    return this.fromWeiToEth(balance);
  },
  fromWeiToEth(value)
  {
    return parseFloat(fromWei(value, "ether"));
  },
  fromEthToWei(value)
  {
    return parseFloat(toWei(value, "ether"));
  },
  fromWeiToGwei(value)
  {
    return parseFloat(fromWei(value, "gwei"))
  },
  fromGweiToWei(value)
  {
    return parseFloat(toWei(value, "gwei"))
  },
  async getTransactionReceipt(txhash)
  {
    await init();
    return new Promise((resolve, reject) =>
    {
      my_web3.eth.getTransactionReceipt(txhash, async (err, txobject) =>
      {
        if(err)
        {
          return reject(err);
        }
        resolve(txobject);    
      });
    });
  },
  async pollForTransactionReceipt(txhash)
  {
    return new Promise(async (resolve, reject) =>
    {
      while(true)
      {
        let txobject = await this.getTransactionReceipt(txhash);
        if(txobject)
        {
          return resolve(txobject);
        }
        await sleep(100);
      }
    });
  }
}

/**
 * Takes a number of wei and converts it to any other ether unit.
 *
 * Possible units are:
 *   SI Short   SI Full        Effigy       Other
 * - kwei       femtoether     babbage
 * - mwei       picoether      lovelace
 * - gwei       nanoether      shannon      nano
 * - --         microether     szabo        micro
 * - --         milliether     finney       milli
 * - ether      --             --
 * - kether                    --           grand
 * - mether
 * - gether
 * - tether
 *
 * @method fromWei
 * @param {Number|String} number can be a number, number string or a HEX of a decimal
 * @param {String} unit the unit to convert to, default ether
 * @return {String|Object} When given a BigNumber object it returns one as well, otherwise a number
*/
var fromWei = function(number, unit) {
  let returnValue = toBigNumber(number);
  let den = getValueOfUnit(unit);
  returnValue = returnValue.dividedBy(den);

  return isBigNumber(number) ? returnValue : returnValue.toString(10);
};

/**
* Takes a number of a unit and converts it to wei.
*
* Possible units are:
*   SI Short   SI Full        Effigy       Other
* - kwei       femtoether     babbage
* - mwei       picoether      lovelace
* - gwei       nanoether      shannon      nano
* - --         microether     szabo        micro
* - --         milliether     finney       milli
* - ether      --             --
* - kether                    --           grand
* - mether
* - gether
* - tether
*
* @method toWei
* @param {Number|String|BigNumber} number can be a number, number string or a HEX of a decimal
* @param {String} unit the unit to convert from, default ether
* @return {String|Object} When given a BigNumber object it returns one as well, otherwise a number
*/
var toWei = function(number, unit) {
  var returnValue = toBigNumber(number).times(getValueOfUnit(unit));

  let result = isBigNumber(number) ? returnValue : returnValue.toString(10);
  return result;
};

/**
 * Takes an input and transforms it into an bignumber
 *
 * @method toBigNumber
 * @param {Number|String|BigNumber} a number, string, HEX string or BigNumber
 * @return {BigNumber} BigNumber
*/
var toBigNumber = function(number) {
  /*jshint maxcomplexity:5 */
  number = number || 0;
  if (isBigNumber(number))
      return number;

  if (isString(number) && (number.indexOf('0x') === 0 || number.indexOf('-0x') === 0)) {
      return new BigNumber(number.replace('0x',''), 16);
  }

  let string_number = number.toString(10);
  let big_number = new BigNumber(string_number, 10);
  return big_number;
};

var unitMap = {
  'noether':      '0',
  'wei':          '1',
  'kwei':         '1000',
  'Kwei':         '1000',
  'babbage':      '1000',
  'femtoether':   '1000',
  'mwei':         '1000000',
  'Mwei':         '1000000',
  'lovelace':     '1000000',
  'picoether':    '1000000',
  'gwei':         '1000000000',
  'Gwei':         '1000000000',
  'shannon':      '1000000000',
  'nanoether':    '1000000000',
  'nano':         '1000000000',
  'szabo':        '1000000000000',
  'microether':   '1000000000000',
  'micro':        '1000000000000',
  'finney':       '1000000000000000',
  'milliether':   '1000000000000000',
  'milli':        '1000000000000000',
  'ether':        '1000000000000000000',
  'kether':       '1000000000000000000000',
  'grand':        '1000000000000000000000',
  'mether':       '1000000000000000000000000',
  'gether':       '1000000000000000000000000000',
  'tether':       '1000000000000000000000000000000'
};

/**
 * Returns value of unit in Wei
 *
 * @method getValueOfUnit
 * @param {String} unit the unit to convert to, default ether
 * @returns {BigNumber} value of the unit (in Wei)
 * @throws error if the unit is not correct:w
 */
var getValueOfUnit = function (unit) {
  unit = unit ? unit.toLowerCase() : 'ether';
  var unitValue = unitMap[unit];
  if (unitValue === undefined) {
      throw new Error('This unit doesn\'t exists, please use the one of the following units' + JSON.stringify(unitMap, null, 2));
  }
  return new BigNumber(unitValue, 10);
};

/**
 * Returns true if object is BigNumber, otherwise false
 *
 * @method isBigNumber
 * @param {Object}
 * @return {Boolean}
 */
var isBigNumber = function (object) {
  return object instanceof BigNumber ||
      (object && object.constructor && object.constructor.name === 'BigNumber');
};

/**
* Returns true if object is string, otherwise false
*
* @method isString
* @param {Object}
* @return {Boolean}
*/
var isString = function (object) {
  return typeof object === 'string' ||
      (object && object.constructor && object.constructor.name === 'String');
};

/**
* Returns true if object is function, otherwise false
*
* @method isFunction
* @param {Object}
* @return {Boolean}
*/
var isFunction = function (object) {
  return typeof object === 'function';
};

/**
* Returns true if object is Objet, otherwise false
*
* @method isObject
* @param {Object}
* @return {Boolean}
*/
var isObject = function (object) {
  return object !== null && !(Array.isArray(object)) && typeof object === 'object';
};

/**
* Returns true if object is boolean, otherwise false
*
* @method isBoolean
* @param {Object}
* @return {Boolean}
*/
var isBoolean = function (object) {
  return typeof object === 'boolean';
};

/**
* Returns true if object is array, otherwise false
*
* @method isArray
* @param {Object}
* @return {Boolean}
*/
var isArray = function (object) {
  return Array.isArray(object);
};

/**
* Returns true if given string is valid json object
*
* @method isJson
* @param {String}
* @return {Boolean}
*/
var isJson = function (str) {
  try {
      return !!JSON.parse(str);
  } catch (e) {
      return false;
  }
};

/**
* Returns true if given string is a valid Ethereum block header bloom.
*
* @method isBloom
* @param {String} hex encoded bloom filter
* @return {Boolean}
*/
var isBloom = function (bloom) {
  if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
      return false;
  } else if (/^(0x)?[0-9a-f]{512}$/.test(bloom) || /^(0x)?[0-9A-F]{512}$/.test(bloom)) {
      return true;
  }
  return false;
};

/**
* Returns true if given string is a valid log topic.
*
* @method isTopic
* @param {String} hex encoded topic
* @return {Boolean}
*/
var isTopic = function (topic) {
  if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
      return false;
  } else if (/^(0x)?[0-9a-f]{64}$/.test(topic) || /^(0x)?[0-9A-F]{64}$/.test(topic)) {
      return true;
  }
  return false;
};