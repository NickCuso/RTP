<template>
    <div>
      Network: <select v-model="networkType" @change="onChange" v-if="can_change">
          <option value="1">Mainnet</option>
          <option value="3">Testnet (Ropsten)</option>
      </select>
      <div v-else>
          <span v-if="networkType==1">Mainnet</span>
          <span v-if="networkType==3">Testnet (Ropsten)</span>
      </div>
    </div>
</template>

<script>
import local from "../js/localstorage.js";
import eth from "../js/eth.js";

export default 
{
  data()
  {
    return {
        networkType: 0,
        can_change: true,
    }
  },
  methods:
  {
    onChange()
    {
        local.setNetworkType(this.networkType);
        location.reload();
    }
  },
  async mounted()
  {
      if(local.getWalletType() == 0 && !this.$root.no_account_found)
      { // fall back to metamask instead
        this.can_change = false;
        this.networkType = await eth.getNetworkType();
      }
      else
      {
          this.networkType = local.getNetworkType();
      }
  },
}
</script>
<style scoped>

</style>