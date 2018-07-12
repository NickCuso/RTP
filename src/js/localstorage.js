import Vue from 'vue';

export default
{
  getWalletType()
  {
    return Vue.localStorage.get('walletType');
  },

  setWalletType(walletType)
  {
    Vue.localStorage.set('walletType', walletType);
  },
  
}
