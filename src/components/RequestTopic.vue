<template>
    <div class="row justify-content-center mt-3">
        <div class="card mb-3 text-center">
            <div class="modal-header bg-light">
                <h6 class="modal-title">
                    Request a New Topic
                </h6>
            </div>
            <div class="card-body">
                <div class="row justify-content-center">
                    <input class="topic" type="text" v-model="topic" placeholder="Topic You Would Like Reviewed">
                </div>
                <div class="row mt-3 justify-content-center align-middle">
                    <span class="aoeu">Tip:</span> 
                    &nbsp;<input type="number" v-model="value" :min="$root.min_for_new_topic" step="0.01">&nbsp;
                    <span class="aoeu">ETH {{ value | ethToUsd }}</span> 
                </div>
                <div class="row justify-content-center small">
                    {{ $root.min_for_new_topic | eth }} minimum
                </div>
                <div class="row mt-3 justify-content-center">
                    <button @click="requestTopic()" class="btn btn-primary" v-bind:disabled="topic.length <= 3 || value < $root.min_for_new_topic">Request Topic</button>
                </div>
            </div>
        </div>
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
            value: this.$root.min_for_new_topic,
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
            await contract.requestTopic(this.topic, this.value, this.$root.onTxPosted, this.$root.onTxComplete).catch(this.$root.onError);
        },
    }
}
</script>
<style scoped>
.topic
{
    width: 30em;
    max-width: 95%;
}
.aoeu
{
    line-height: 1.88;
    vertical-align: middle;
}
.card
{
    min-width: 31em;
}
</style>