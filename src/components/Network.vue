<template>
    <div>
      Network: <select v-model="$root.networkType" @change="onChange" v-if="can_change">
          <option value="1">Mainnet</option>
          <option value="3">Testnet (Ropsten)</option>
      </select>
      <span v-else>
          <span v-if="$root.networkType==1">Mainnet</span>
          <span v-else-if="$root.networkType==3">Testnet (Ropsten)</span>
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
  },
}
</script>
<style scoped>

</style>