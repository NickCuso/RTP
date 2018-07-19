<template>
<span>
  <nav id="navbar-example2" class="navbar navbar-light bg-light" style="width:100%;">
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
  <div id="app" class="container">
    <router-view/>
  </div>
  </span>
</template>

<script>
import Balance from './components/Balance';
import GasPrice from './components/GasPrice';
import Network from './components/Network';
import WalletType from './components/WalletType';

export default 
{
  components: 
  {
    Balance,
    GasPrice,
    Network,
    WalletType,
  },
}
</script>

<style>
@import 'bootstrap';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
