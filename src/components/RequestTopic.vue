<template>
    <div>
        <br>
        <br>
        <hr>
        <br>
        <input type="text" v-model="topic">
        <input type="number" v-model="value">
        <button @click="requestTopic()">Request Topic</button>
        <br>
        <hr>
        <br>
        <br>
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
            topic: "",
            value: 0,
        }
    },
    methods:
    {
        async requestTopic()
        {
            // TODO: Error on success with ledger: "Failed to subscribe to new newBlockHeaders to confirm the transaction receipts.
            // {
            //   "message": "Method not found",
            //   "code": -32601
            // }"
            await contract.requestTopic(this.topic, this.value, this.$root.onTxPosted);
            this.$root.onTxComplete();
        },
    }
}
</script>
<style scoped>

</style>