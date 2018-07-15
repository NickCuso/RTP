<template>
    <div>
        <div v-if="$root.my_total_contributions > 0">
            Your Total Pending Contribution: {{ $root.my_total_contributions | eth }} 
            <br>
            <button @click="refundAll()" class="btn btn-secondary">Refund All</button>
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
            await contract.refundAll().catch(this.$root.onError);
            this.$root.onTxComplete();
        },
    }
}
</script>
<style scoped>

</style>