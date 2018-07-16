<template>
    <div>
      Network: <select v-model="networkType" @change="onChange" v-if="can_change">
          <option value="1">Mainnet</option>
          <option value="3">Testnet (Ropsten)</option>
      </select>
      <span v-else>
          <span v-if="networkType==1">Mainnet</span>
          <span v-else-if="networkType==3">Testnet (Ropsten)</span>
          <span v-else class="text-danger">Unsupported</span>
      </span>
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
        can_change: null,
        networkType: this.$root.networkType,
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
    } 
    else
    {
      this.can_change = true;
    }   
  },
}
</script>
<style scoped>

</style>