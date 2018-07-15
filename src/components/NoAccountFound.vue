<template>
    <div class="row justify-content-center">
        <div class="card text-white bg-info mb-3 text-center">
             <div class="card-body">
                <h5 class="card-title">No Account Detected</h5>
                <p class="card-text">
                    <span v-if="ledger">
                        Please connect your device and open the Ethereum app.
                        Enable both browser support and contract data.  Then refresh this page.
                    </span>
                    <span v-else-if="metamask_installed">
                         metamask locked (or no wallet)
                    </span>
                    <span v-else>
                         Get Metamask
                    </span>
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