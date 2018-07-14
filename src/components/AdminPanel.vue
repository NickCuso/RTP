<template>
    <div>
        <div>
            <button @click="declineAll()" v-if="$root.topics.length > 0">Decline All</button>
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
        async declineAll()
        {
            await contract.declineAll();
            this.$root.onTxComplete();
        },
    }
}
</script>
<style scoped>

</style>