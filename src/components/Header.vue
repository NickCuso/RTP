<template>
<span>
<nav id="navbar-example2" class="navbar navbar-light bg-light" style="width:100vw;left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;">
  <span class="navbar-brand">
    <div class="subtitle">HardlyDifficult</div>
    Review This Please
    
    <div v-if="!$root.show_about">
        <button class="btn btn-link small" @click="$root.showAbout(true)">About</button>
    </div>
  </span>
  
  <ul class="nav nav-pills">
    <li class="nav-item text-right" v-if="!$root.loading">
      <WalletType />
      <Network />
      <GasPrice />
      <Balance v-if="$root.balance != null" />
    </li>
  </ul>
</nav>
    <Notifications />
</span>
</template>



<script>
import Balance from './Balance';
import GasPrice from './GasPrice';
import Network from './Network';
import Notifications from './Notifications';
import WalletType from './WalletType';

export default 
{
  components: 
  {
    Balance,
    GasPrice,
    Network,
    Notifications,
    WalletType,
  },
}
</script>
<style scoped>
.subtitle
{
  font-size: 1rem;
  color: grey;
}
</style>