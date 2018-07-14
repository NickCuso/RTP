import Vue from 'vue';
const wallet_type = 'walletType';
const network_type = 'networkType';
const gas_price = 'gasPrice';
import eth from "./eth";

export default
{
  getWalletType()
  {
    return getInt(wallet_type, 0);
  },

  setWalletType(walletType)
  {
    setInt(wallet_type, walletType);
  },

  getNetworkType()
  {
    if(this.getWalletType() == 0)
    { // fall back to metamask instead
      return null;
    }
    return getInt(network_type, 1);
  },

  setNetworkType(networkType)
  {
    setInt(network_type, networkType);
  },
  
  getGasPriceInWei()
  {
    return getInt(gas_price, eth.fromGweiToWei(4.1));
  },

  setGasPriceInWei(price)
  {
    setInt(gas_price, price); 
  },
}

function getInt(name, default_value)
{
  let result = parseInt(Vue.localStorage.get(name));
  if(!result)
  {
    return default_value;
  }
  return result;
}

function setInt(name, value)
{
  return Vue.localStorage.set(name, value);
}