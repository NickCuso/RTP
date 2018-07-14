<template>
    <div>
      <select v-model="walletType" @change="onChange">
          <option value="0">Metamask</option>
          <option value="1">Ledger</option>
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
        walletType: 0
    }
  },
  methods:
  {
    onChange()
    {
        local.setWalletType(this.walletType);
        location.reload();
    }
  },
  async mounted()
  {
      this.walletType = local.getWalletType();
  },
}
</script>
<style scoped>

</style>