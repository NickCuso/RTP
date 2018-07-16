<template>
<div class="row mt-3 justify-content-center">
    <div class="card">
        <div class="row mt-3">
            <div class="col">
                <h3>
                    {{ topic.topic }}
                </h3>
            </div>
        </div>
        <div class="row small text-secondary">
            <div class="col">
                {{ topic.total_support | eth }} 
                ({{ topic.supporter_count }} supporter<span v-if="topic.supporter_count>1">s</span>)
            </div>
        </div> 
        <div class="row mt-2 card-text text-left" v-if="comment && !$root.is_owner">
            <div class="col">HardlyDifficult said "<span class="font-italic">{{ comment }}</span>"
            </div>
        </div>
        <div class="row mt-2" v-if="topic.my_contribution > 0">
            <div class="col">
                Your Contribution: {{ topic.my_contribution | eth }}
                <button @click="refund()" class="btn btn-secondary">Refund</button>
            </div>
        </div>
        <div class="row mt-3 justify-content-center" v-if="show_tip">
            <div class="card text-center">
                <div class="modal-header text-white bg-secondary">
                    <h6 class="modal-title">
                        Tip This Topic
                    </h6>
                    <button type="button" class="close" @click="show_tip = false" aria-label="Close">
                        <span aria-hidden="true" class="x">&times;</span>
                    </button>
                </div>
                <div class="card-body">
                        <div class="col-12">
                            Tip: <input type="number" v-model="value" :min="$root.min_for_existing_topic" step="0.01"/> ETH ({{ value | ethToUsd }})
                        </div>
                        <div class="col-12 mt-1 small">
                            {{ $root.min_for_existing_topic | eth }} minimum
                        </div>
                        <div class="col-12 mt-3">
                            <button @click="add()" class="btn btn-primary" v-bind:disabled="value < $root.min_for_existing_topic">Add Tip</button>
                        </div>
                </div>
            </div>
        </div>
        <div class="row mt-1 mb-2">
            <div class="col">
                <span v-if="!$root.no_account_found && !show_tip">
                    <button class="btn btn-link" @click="show_tip = true">Tip This Topic</button>
                </span>
            </div>
        </div> 
        <div class="row mt-3" v-if="$root.is_owner">
            <div class="col">
                <textarea v-model="comment" class="comment" />
            </div>
        </div>
        <div class="row mt-3 mb-3" v-if="$root.is_owner">
            <div class="col">
                <button @click="accept()" class="btn btn-primary">Accept</button>
                <button @click="decline()" class="btn btn-secondary">Decline</button>
                <button @click="postComment()" class="btn btn-secondary">Comment</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import contract from "../js/contract.js";
import neb from "../js/nebcontract.js";
import eth from "../js/eth.js";

export default 
{
    props : ['topic'],
    data()
    {
        return {
            comment: "",
            value: null,
            show_tip: false,
        }
    },
    methods:
    {
        async accept()
        {
            await contract.accept(this.topic.topic, this.$root.onTxPosted, this.$root.onTxComplete).catch(this.$root.onError);
        },
        async add()
        {
            await contract.requestTopic(this.topic.topic, this.value, (data) => 
            {
                this.show_tip = false;
                this.$root.onTxPosted(data);
            }, this.$root.onTxComplete).catch(this.$root.onError);
        },
        async decline()
        {
            await contract.decline(this.topic.topic, this.$root.onTxPosted, this.$root.onTxComplete).catch(this.$root.onError);
        },
        async refund()
        {
            await contract.refund(this.topic.topic, this.$root.onTxPosted, this.$root.onTxComplete).catch(this.$root.onError);
        },
        async postComment()
        {
            await neb.setMessage(this.topic.topic, this.comment, this.$root.onTxPosted, this.$root.onTxComplete).catch(this.$root.onError);
        },
    },
    async mounted()
    {
        this.comment = await neb.getMessage(this.topic.topic);
        this.value = this.$root.min_for_existing_topic;
    },
}
</script>
<style scoped>
.comment 
{
    width: 85%;
}
</style>