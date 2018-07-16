<template>
<div>
    <div class="row mt-3 justify-content-center">
        Min for a new topic: <input v-model="min_for_new_topic" /> {{ min_for_new_topic | ethToUsd }}
    </div>
    <div class="row mt-3 justify-content-center">
        Min for an existing topic: <input v-model="min_for_existing_topic" /> {{ min_for_existing_topic | ethToUsd }}
    </div>
    <div class="row mt-3 justify-content-center">
        <button @click="setMins()" class="btn btn-secondary">Set Mins</button>
    </div>
    <div class="row mt-3 justify-content-center">
        Owner: <input v-model="owner"  style="min-width:25em" />
        <button @click="changeOwner()" class="btn btn-secondary">Change Owner</button>
    </div>
    <div class="row mt-3 justify-content-center">
        <button @click="declineAll()" v-if="$root.topics.length > 0" class="btn btn-secondary">Decline All</button>
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
            min_for_new_topic: this.$root.min_for_new_topic,
            min_for_existing_topic: this.$root.min_for_existing_topic,
            owner: ""
        }
    },
    methods:
    {
        async declineAll()
        {
            await contract.declineAll(this.$root.onTxPosted, this.$root.onTxComplete).catch(this.$root.onError);
        },
        async setMins()
        {
            await contract.setMins(eth.fromEthToWei(this.min_for_new_topic), eth.fromEthToWei(this.min_for_existing_topic), this.$root.onTxPosted, this.$root.onTxComplete).catch(this.$root.onError);
        },
        async changeOwner()
        {
            if(!this.owner || this.owner.length < 5)
            {
                return;
            }
            await contract.setOwner(this.owner, this.$root.onTxPosted, this.$root.onTxComplete).catch(this.$root.onError);
        },
    },
    async mounted()
    {
        this.owner = await contract.getOwner();
    }
}
</script>
<style scoped>

</style>