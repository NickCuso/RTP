import Vue from 'vue'
import App from './App'
import router from './router'
import VueLocalStorage from 'vue-localstorage'

import eth from "./js/eth.js";
import contract from "./js/contract.js";
import 'bootstrap'

Vue.config.productionTip = false
Vue.use(VueLocalStorage);

Vue.filter('eth', function (value) 
{
  return value.toString() + " ETH";
});


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data() {
    return {
      balance: null,
      no_account_found: false,
      is_owner: false,
      notifications: [],
      topics: [],
      my_total_contributions: 0,
    }
  },
  async beforeCreate() 
  {
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
      this.topics.push({topic, supporter_count, total_support: total, my_contribution});
    }

    if(address)
    {
      this.balance = await eth.getBalanceInEth();
      this.is_owner = await contract.getIsOwner();
    }
    else
    {
      this.no_account_found = true;
    }
  },
  methods: {
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
    onTxPosted(txhash)
    {
      this.showNotification("Transaction Posted", "wait for it..", null, 10000, true);
    },
    onTxComplete(txobject)
    {
      this.showNotification("Transaction Complete", "Thanks yo");
    },
  }
});
