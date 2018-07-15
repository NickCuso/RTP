import Vue from 'vue'
import App from './App'
import router from './router'
import VueLocalStorage from 'vue-localstorage'

import local from "./js/localstorage.js";
import eth from "./js/eth.js";
import contract from "./js/contract.js";
import 'bootstrap'
require('./css/style.css');

Vue.config.productionTip = false
Vue.use(VueLocalStorage);

Vue.filter('eth', function (value) 
{
  if(this.eth_to_usd)
  {
    return value.toString() + " ETH (~$" + (value * this.eth_to_usd) + " USD";
  }
  return value.toString() + " ETH";
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data() {
    return {
      networkType: 0,
      networkIsSupported: null,
      balance: null,
      no_account_found: false,
      loading: true,
      is_owner: false,
      notifications: [],
      topics: [],
      my_total_contributions: 0,
      min_for_existing_topic: null,
      min_for_new_topic: null,
      show_about: local.getShowAbout(),
      eth_to_usd: null,
    }
  },
  async mounted() 
  {
    await this.refreshData();
    this.loading = false;
    this.eth_to_usd = await eth.getEthToUsd();
  },
  methods: {
    showAbout(visible)
    {
        this.show_about = visible;
        local.setShowAbout(this.show_about);
    },
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
    async onTxPosted(txhash)
    {
      this.showNotification("Transaction Posted", "wait for it...", await eth.getTxUrl(txhash), "View On EtherScan", 0, true);
    },
    onTxComplete(txobject)
    {
      this.showNotification("Transaction Complete", "Thanks!");
      this.refreshData();
    },
    onError(error)
    {
      this.showNotification("Transaction Failed", error);
    },
    async refreshData()
    {
      let topics = [];
      if(local.getWalletType() == 0 && !this.$root.no_account_found)
      { // fall back to metamask instead
        this.networkType = await eth.getNetworkType();
        this.networkIsSupported = this.networkType == 1 || this.networkType == 3;
      }
      else
      {
          this.networkType = local.getNetworkType();
      }

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
          let value = parseInt(supporters[1][iSupport]);
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
        topics.push({topic, supporter_count, total_support: total, my_contribution});
      }
      topics.sort((a, b) =>
      {
        return b.total_support - a.total_support;
      });
      this.topics = topics;

      this.min_for_existing_topic = eth.fromWeiToEth(await contract.getMinForExistingTopic());
      this.min_for_new_topic = eth.fromWeiToEth(await contract.getMinForNewTopic());

      if(address)
      {
        this.balance = await eth.getBalanceInEth();
        this.is_owner = await contract.getIsOwner();
      }
      else
      {
        this.no_account_found = true;
      }
    }
  }
});
