<template>
  <div>
    <Header />

    <Loading v-if="$root.loading" />
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
import Header from './Header';
import Loading from './Loading';
import NoAccountFound from './NoAccountFound';
import RequestTopic from './RequestTopic';
import Topic from './Topic';
import UserPanel from './UserPanel';

export default 
{
  components: 
  {
    AdminPanel,
    Balance,
    Footer,
    Header,
    Loading,
    NoAccountFound,
    RequestTopic,
    Topic,
    UserPanel,
  },
}
</script>
<style scoped>

</style>
