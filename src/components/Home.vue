<template>
  <div>
    <Notifications />

    <WalletType />
    <Network />
    <GasPrice />

    <Loading v-if="$root.balance == null && !$root.no_account_found" />
    <Balance v-if="$root.balance != null" />
    <NoAccountFound v-if="$root.no_account_found" />

    <Topic v-for="topic in $root.topics" v-bind:key="topic.topic" :topic="topic" />

    <RequestTopic v-if="!$root.no_account_found" />

    <UserPanel v-if="!$root.no_account_found" />

    <AdminPanel v-if="$root.is_owner" />

    <Footer />
  </div>
</template>

<script>
import eth from "../js/eth.js";
import contract from "../js/contract.js";

import AdminPanel from './AdminPanel';
import Balance from './Balance';
import Footer from './Footer';
import GasPrice from './GasPrice';
import Loading from './Loading';
import Network from './Network';
import Notifications from './Notifications';
import NoAccountFound from './NoAccountFound';
import RequestTopic from './RequestTopic';
import Topic from './Topic';
import UserPanel from './UserPanel';
import WalletType from './WalletType';

export default 
{
  components: 
  {
    AdminPanel,
    Balance,
    Footer,
    GasPrice,
    Loading,
    Network,
    Notifications,
    NoAccountFound,
    RequestTopic,
    Topic,
    UserPanel,
    WalletType,
  },
}
</script>
<style scoped>

</style>
