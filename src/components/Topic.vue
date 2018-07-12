<template>
    <div class="row mt-3">
        {{ topic.topic }}
        {{ topic.total_support }}
        ({{ topic.supporter_count }})
        <input type="number" v-model="value">
        <button @click="add()">Add Tip</button>
        <span v-if="topic.my_contribution > 0">
            My Contribution: {{ topic.my_contribution }}
            <button @click="refund()">Refund</button>
        </span>
        <div class="row">
            <textarea v-model="comment" />
            <button @click="postComment()">Comment</button>
            <button @click="accept()">Accept</button>
            <button @click="decline()">Decline</button>
        </div>
    </div>
</template>

<script>
import contract from "../js/contract.js";
import neb from "../js/nebcontract.js";
  export default {
    name: "Topic",
    props : ['status', 'topic'],
    data(){
      return {
          comment: "",
          value: 0,
      }
    },
    methods:
    {
        async accept()
        {
            await contract.accept(this.topic.topic, this.status.onTxPosted);
            this.status.onTxComplete();
        },
        async add()
        {
            await contract.requestTopic(this.topic.topic, this.value, this.status.onTxPosted);
            this.status.onTxComplete();
        },
        async decline()
        {
            await contract.decline(this.topic.topic, this.status.onTxPosted);
            this.status.onTxComplete();
        },
        async refund()
        {
            await contract.refund(this.topic.topic, this.status.onTxPosted);
            this.status.onTxComplete();
        },
        async postComment()
        {
            await neb.setMessage(this.topic.topic, this.comment, this.status.onTxPosted, this.onError);
            this.status.onTxComplete();
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