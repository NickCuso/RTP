<template>
    <div class="row justify-content-center mt-3">
        <div class="card info-card mb-3 text-center" v-if="$root.show_about">
             <div class="card-body text-left">
                <div class="modal-header text-white bg-secondary">
                    <h6 class="modal-title">
                        About 'Review This Please'
                    </h6>
                    <button type="button" class="close" @click="show_tip = false" aria-label="Close">
                        <span aria-hidden="true" class="x" @click="$root.showAbout(false)">&times;</span>
                    </button>
                </div>
                <div class="card-text">
<h5>What is this, exactly?</h5>
                <p>
'Review This Please' is a simple dapp that allows you to request and contribute to content ideas you’d like to see us produce.</p>

<h5>What kind of content can I request?</h5>
<p>
    Pretty much anything. We’re a team of varied interests and skills. We’ll consider requests including, but certainly not limited to:
</p>
<div class=row>
<div class=col>
<!-- <ul>
<li>Whitepaper deep dives and Coin/Token/ICO reviews</li>
<li>Tutorials</li>
<li>Crypto concept discussions (e.g. What’s a security token? What are the differences between various consensus algorithms?)</li>
<li>Open-source development commissions (dapps, etc)</li>
</ul> -->
</div>  
</div>
<p>
We produce both video and written content.
</p>
<h5>How do I use it?</h5>
<p>
Select a topic you'd like covered and contribute a small amount in ETH using the form below.
We currently support both Metamask and Ledger. 
</p>

            <p>
                Switch to Ropsten testnet to see a few examples and to test this dapp.
            </p>
<h5>What happens to the money I contribute?</h5>
<p>
Funding is held in escrow by the smart contract. 
You are free to have your contributions refunded at any time before we accept or decline the request.
</p>
<p>
If we accept your request, the funding is transferred to us. If we decline it, it goes right back to you.
</p>
<p>
All funds support content creation.
</p>
<small>
Disclaimer: This is not an shilling service! If you'd like us to review your ICO, we'll be happy to take a look, 
but we will not promise a positive review.

</small> 
        </div>
    </div>
    </div>
    </div>
</template>

<script>


export default 
{
}
</script>
<style scoped>
.step
{
    padding-left: 3em;
}
</style>