<template>
    <div>
      <select v-model="networkType" @change="onChange" v-if="networkType != null">
          <option value="1">Mainnet</option>
          <option value="3">Testnet (Ropsten)</option>
      </select>
    </div>
</template>

<script>
import local from "../js/localstorage.js";

export default 
{
  data()
  {
    return {
        networkType: 0
    }
  },
  methods:
  {
    onChange()
    {
        local.setNetworkType(this.networkType);
    }
  },
  async mounted()
  {
      this.networkType = local.getNetworkType();
  },
}
</script>
<style scoped>

</style>