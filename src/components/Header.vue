<template>
    <div class="row">
        <div class="col text-right">
            <WalletType />
            <Network />
            <GasPrice />
        </div>

        <Notifications />
    </div>
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