if (typeof web3 !== 'undefined') 
{
  web3 = new Web3(web3.currentProvider);
} 
else 
{
  // Maybe via https://infura.io/
  //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  //web3 = null;//
}

export default
{
  getBalance()
  {
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
    let balance = await this.getBalance();
    return web3.fromWei(balance, "ether");
  }
}