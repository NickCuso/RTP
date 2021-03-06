import Vue from 'vue';
const wallet_type = 'walletType';
const network_type = 'networkType';
const gas_price = 'gasPrice';
const show_about = 'showAbout';
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
  
  getShowAbout()
  {
    return getInt(show_about, 1) == 1;
  },

  setShowAbout(showAbout)
  {
    setInt(show_about, showAbout ? 1 : 0);
  },

  getNetworkType()
  {
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
  if(result == null || isNaN(result))
  {
    return default_value;
  }
  return result;
}

function setInt(name, value)
{
  return Vue.localStorage.set(name, value);
}