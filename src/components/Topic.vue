<template>
    <div class="row mt-3">
        {{ topic.topic }}
        {{ topic.total_support }}
        ({{ topic.supporter_count }})
        <span v-if="!$root.no_account_found">
            <input type="number" v-model="value">
            <button @click="add()">Add Tip</button>
        </span>
        <span v-if="topic.my_contribution > 0">
            My Contribution: {{ topic.my_contribution }}
            <button @click="refund()">Refund</button>
        </span>
        <div class="row" v-if="$root.is_owner">
            <textarea v-model="comment" />
            <button @click="postComment()">Comment</button>
            <button @click="accept()">Accept</button>
            <button @click="decline()">Decline</button>
        </div>
        <div class="row" v-else>
            {{ comment }}
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
            value: 0,
        }
    },
    methods:
    {
        async accept()
        {
            await contract.accept(this.topic.topic, this.$root.onTxPosted);
            this.$root.onTxComplete();
        },
        async add()
        {
            await contract.requestTopic(this.topic.topic, this.value, this.$root.onTxPosted);
            this.$root.onTxComplete();
        },
        async decline()
        {
            await contract.decline(this.topic.topic, this.$root.onTxPosted);
            this.$root.onTxComplete();
        },
        async refund()
        {
            await contract.refund(this.topic.topic, this.$root.onTxPosted);
            this.$root.onTxComplete();
        },
        async postComment()
        {
            await neb.setMessage(this.topic.topic, this.comment, this.$root.onTxPosted, this.onError);
            this.$root.onTxComplete();
        },
        onError()
        {
            // TODO
        }
    },
    async mounted()
    {
        this.comment = await neb.getMessage(this.topic.topic);
    },
}
</script>
<style scoped>

</style>