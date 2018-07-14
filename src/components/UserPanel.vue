<template>
    <div>
        <div v-if="$root.my_total_contributions > 0">
            {{ $root.my_total_contributions }}
            <button @click="refundAll()">Refund All</button>
        </div>
    </div>
</template>

<script>
import eth from "../js/eth.js";
import contract from "../js/contract.js";

export default 
{
    methods:
    {
        async refundAll()
        {
            await contract.refundAll();
            this.$root.onTxComplete();
        },
    }
}
</script>
<style scoped>

</style>