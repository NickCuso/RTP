<template>
    <div>
      Network: <select v-model="networkType" @change="onChange" v-if="$root.can_change_network">
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
}
</script>
<style scoped>

</style>