<template>
<span>
<nav id="navbar-example2" class="navbar navbar-light bg-light">
  <a class="navbar-brand" href="#">Review This Please</a>
  <ul class="nav nav-pills">
    <li class="nav-item text-right" v-if="!$root.loading">
        <WalletType />
        <Network />
        <GasPrice />
    </li>
      </ul>
</nav>
    <Notifications />
</span>
</template>



<script>
import GasPrice from './GasPrice';
import Network from './Network';
import WalletType from './WalletType';
import Notifications from './Notifications';

export default 
{
  components: 
  {
    GasPrice,
    Network,
    Notifications,
    WalletType,
  },
}
</script>
<style scoped>

</style>