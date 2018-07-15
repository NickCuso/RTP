<template>
  <div>
    <Header />

    <About />
    <Loading v-if="$root.loading" />
    <span v-else>
      <NoAccountFound v-if="$root.no_account_found" />
      <NetworkUnsupported v-if="!$root.networkIsSupported" />

      <Topic v-for="topic in $root.topics" v-bind:key="topic.topic" :topic="topic" />
      <NoTopics v-if="$root.topics.length == 0" />

      <RequestTopic v-if="!$root.no_account_found && $root.networkIsSupported" />

      <UserPanel v-if="!$root.no_account_found" />

      <AdminPanel v-if="$root.is_owner" />
    </span>

    <Footer />
  </div>
</template>

<script>
import eth from "../js/eth.js";
import contract from "../js/contract.js";

import About from './About';
import AdminPanel from './AdminPanel';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import NetworkUnsupported from './NetworkUnsupported';
import NoAccountFound from './NoAccountFound';
import NoTopics from './NoTopics';
import RequestTopic from './RequestTopic';
import Topic from './Topic';
import UserPanel from './UserPanel';

export default 
{
  components: 
  {
    About,
    AdminPanel,
    Footer,
    Header,
    Loading,
    NetworkUnsupported,
    NoAccountFound,
    NoTopics,
    RequestTopic,
    Topic,
    UserPanel,
  },
}
</script>
<style scoped>

</style>
