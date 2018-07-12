<template>
  <div class="hello">
    <Notifications :notifications="notifications" />
    <WalletType />
    <h1 v-if="balance === null && !no_metamask">Loading..</h1>    
    <h1 v-if="balance">Hey there, I see you got {{ balance | eth }}</h1>    
    <h1 v-if="no_metamask">Get Metamask and buy ETH. NOW.</h1>    

    <Topic v-for="topic in topics" v-bind:key="topic.topic" :topic="topic" :status="status" />

    <div>
      <input type="text" v-model="topic">
      <input type="number" v-model="value">
      <button @click="requestTopic()">Request Topic</button>
    </div>

    <div v-if="my_total_contributions > 0">
      {{ my_total_contributions }}
      <button @click="refundAll()">Refund All</button>
    </div>

    <button @click="declineAll()" v-if="topics.length > 0">Decline All</button>
  </div>
</template>

<script>
import eth from "../js/eth.js";
import contract from "../js/contract.js";
import Notifications from './Notifications';
import WalletType from './WalletType';
import Topic from './Topic';
const help = require("../js/help.js");

export default {
  name: 'Home',
  data () {
    return {
      // intro message
      balance: null,
      no_metamask: false,
      // create topic
      topic: "",
      value: 0,
      // status
      notifications: [],
      status: {onTxPosted: this.onTxPosted, onTxComplete: this.onTxComplete},
      // data
      topics: [],
      my_total_contributions: 0,
    }
  },
  components: {
    Notifications,
    WalletType,
    Topic,
  },
  methods : {
    showNotification(title, message, href, href_text, length = 3000, noAutoRemove = false)
    {
      this.notifications.push({
        title: title,
        message: message,
        href: href,
        href_text: href_text,
        length: length,
        no_auto_remove: noAutoRemove
      });
    },
    async declineAll()
    {
      await contract.declineAll();
      this.onTxComplete();
    },
    async refundAll()
    {
      await contract.refundAll();
      this.onTxComplete();
    },
    async requestTopic()
    {
      await contract.requestTopic(this.topic, this.value, this.onTxPosted);
      this.onTxComplete();
    },
    onTxPosted(txhash)
    {
      this.showNotification("Transaction Posted", "wait for it..", null, 10000, true);
    },
    onTxComplete(txobject)
    {
      this.showNotification("Transaction Complete", "Thanks yo");
    },
  },
  async mounted()
  {
    this.balance = await eth.getBalanceInEth().catch((e) =>
    {
      this.no_metamask = true;
    });
    let topic_count = await contract.getTopicCount();
    let address = await eth.getAddress();
    this.my_total_contributions = 0;
    for(let i = 0; i < topic_count; i++)
    {
      let topic = await contract.getTopic(i);
      let supporters = await contract.getSupportersForTopic(topic);
      let total = 0;
      let supporter_count = 0;
      let my_contribution = 0;
      for(let iSupport = 0; iSupport < supporters[1].length; iSupport++)
      {
        let value = supporters[1][iSupport].toNumber();
        total += value;
        let supporter = supporters[0][iSupport];
        if(supporter == address)
        {
          my_contribution += value;
        }
        if(supporters[0].indexOf(supporter) == iSupport)
        {
          supporter_count++;
        }
      }
      total = await eth.fromWeiToEth(total);
      my_contribution = await eth.fromWeiToEth(my_contribution);
      this.my_total_contributions += my_contribution;
      this.topics.push({topic, supporter_count, total_support: total, my_contribution});
    }
  }
}
</script>

<style scoped>

</style>
