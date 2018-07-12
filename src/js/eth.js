const local = require("./localstorage").default;
import LedgerWallet from "ledger-wallet-provider/lib/LedgerWallet";
let is_init = false;
window.addEventListener('DOMContentLoaded', async () =>
{
  if(local.getWalletType() == 1)
  {
    // bluebird?
    // config?
    await main();
  } 
  else if (typeof web3 !== 'undefined') 
  {
    web3 = new Web3(web3.currentProvider);
  } 
  else
  {
    // Maybe via https://infura.io/
    //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  is_init = true;
});

async function main() 
{
  //const Web3 = require('web3');
  const FetchSubprovider = require("web3-provider-engine/subproviders/fetch");
  const HookedWalletSubprovider = require("web3-provider-engine/subproviders/hooked-wallet");
  const ProviderEngine = require('web3-provider-engine');
    const rpcUrl = 'https://rinkeby.infura.io';
    const engine = new ProviderEngine();
  web3 = new Web3(engine);
  const ledger = new LedgerWallet(() => 44, "44'/60'/0'/0");
  await ledger.init();
  engine.addProvider(new HookedWalletSubprovider(ledger));
  engine.addProvider(new FetchSubprovider({ rpcUrl }));

  engine.start();

  
  //web3.eth.getAccountsAsync = promisify(web3.eth.getAccounts);
  web3.eth.getAccounts((err, account) => 
  {
    console.log("wallet!: " + account);
  });


  // let RpcSubprovider = require('web3-provider-engine/subproviders/rpc');
  // let LedgerWalletSubproviderFactory = LedgerWallet.default;

  // let engine = new ProviderEngine();
  // web3 = new Web3(engine);

  // let ledgerWalletSubProvider = await LedgerWalletSubproviderFactory();
  // engine.addProvider(ledgerWalletSubProvider);
  // engine.addProvider(new RpcSubprovider({rpcUrl})); // you need RPC endpoint
  // engine.start();

  
}

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
  async getAddress()
  {
    await init();
    return web3.eth.defaultAccount;
  },
  async getBalance()
  {
    await init();
    return new Promise((resolve, reject) =>
    {
      web3.eth.getBalance(web3.eth.defaultAccount, function(err, balance)
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
    return await this.fromWeiToEth(balance);
  },
  async fromWeiToEth(value)
  {
    await init();
    return parseFloat(web3.fromWei(value, "ether"));
  },
  async fromEthToWei(value)
  {
    await init();
    return parseFloat(web3.toWei(value, "ether"));
  },
  async getTransactionReceipt(txhash)
  {
    await init();
    return new Promise((resolve, reject) =>
    {
      web3.eth.getTransactionReceipt(txhash, async (err, txobject) =>
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