<template>
    <div>
        <a v-bind:href="contract_url" target="_blank">View Smart Contract ({{ contract_address }})</a>
    </div>
</template>

<script>
import eth from "../js/eth.js";
import contract from "../js/contract.js";

export default 
{
    data() 
    {
        return {
            contract_url: null,
            contract_address: null,
        }
    },
    methods:
    {
        async declineAll()
        {
            await contract.declineAll();
            this.$root.onTxComplete();
        },
    },
    async mounted()
    {
        this.contract_address = await contract.getContractAddress();
        this.contract_url = await contract.getContractUrl();
    }
}
</script>
<style scoped>

</style>