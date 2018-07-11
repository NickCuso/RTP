<template>
  <div class="hello">
    <h1 v-if="balance">Hey there, I see you got {{ balance | eth }}</h1>    
    <h1 v-if="no_metamask">Get Metamask and buy ETH. NOW.</h1>    
    <button @click="test()">Test</button>
  </div>
</template>

<script>
import eth from "../js/eth.js";
import contract from "../js/contract.js";
const help = require("../js/help.js");

export default {
  name: 'HelloWorld',
  data () {
    return {
      balance: null,
      no_metamask: false
    }
  },
  methods : {
    async test()
    {
      help.log(await contract.transfer());
    }
  },
  async mounted()
  {
    this.balance = await eth.getBalanceInEth().catch((e) =>
    {
      this.no_metamask = true;
    });

  }
}
</script>

<style scoped>

</style>
