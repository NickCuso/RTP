<template>
    <div class="row justify-content-center">
        <div class="card info-card mb-3 text-center">
             <div class="card-body">
                <h5 class="card-title">No Topics Pending</h5>
                <p class="card-text">
                    There's nothing here yet.  Please suggest a topic below.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import local from "../js/localstorage.js";
import eth from "../js/eth.js";

export default 
{
    data() 
    {
        return {
            ledger: local.getWalletType() == 1,
            metamask_installed: eth.getIsMetamaskInstalled(),
        }
    },
}
</script>
<style scoped>

.card
{
    margin-top: 1em;
    margin-bottom: 3em;
    padding: .5em;
}
</style>