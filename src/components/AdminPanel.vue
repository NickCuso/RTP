<template>
    <div class="row mt-3 justify-content-center">
        <div>
            <button @click="declineAll()" v-if="$root.topics.length > 0" class="btn btn-secondary">Decline All</button>
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
            await contract.declineAll(this.$root.onTxPosted, this.$root.onTxComplete).catch(this.$root.onError);
        },
    }
}
</script>
<style scoped>

</style>