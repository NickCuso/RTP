<template>
    <div>
        Gas Price: <input type="number" v-model="gasPrice" @change="onChange" class="gasPrice" step="0.1" /> Gwei
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
input[type=number]
{
    width: 3.5em;
    height: 1.25em;
}
</style>