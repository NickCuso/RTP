<template>
    <div>
        Gas Price: <input type="number" v-model="gasPrice" @change="onChange" />
    </div>
</template>

<script>
import local from "../js/localstorage.js";
import eth from "../js/eth.js";

export default 
{
    data() 
    {
        return {
            gasPrice: 0
        }
    },
    methods:
    {
        onChange()
        {
            local.setGasPriceInWei(eth.fromGweiToWei(this.gasPrice));
        }
    },
    mounted()
    {
        this.gasPrice = eth.fromWeiToGwei(local.getGasPriceInWei());
    },
}
</script>
<style scoped>

</style>