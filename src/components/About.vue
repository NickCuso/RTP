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
                <p class="card-text">
                    Help support HardlyDifficult by suggesting content for our next video. 
                </p>
                <h5 class="card-text">
                    Step 1
                </h5>
                <p class="card-text step">
                    Pick a topic you'd like reviewed.
                </p>
                <h5 class="card-text">
                    Step 2
                </h5>
                <p class="card-text step">
                    Send a tip (in ETH) for making a video on that topic.
                </p>
                <h5 class="card-text">
                    Step 3
                </h5>
                <p class="card-text step">
                    Watch the video you requested, or get a refund*.
                </p>
                <p class="card-text">
                    Anyone is welcome to request content this way, from hobbyists interested in a tech deep dive to an ICO hoping for exposure.
                    The video will be of our usual style, I will not promise a positive review.
                </p>
                <p class="card-text">
                    Switch to Ropsten testnet to see a few examples and to test the dapp.
                </p>
                <p class="card-text">
                    <span class="small">
                        * You can get your money back anytime, up until I accept the request.  
                        If I decline the money will be returned to you automatically.
                    </span>
                </p>
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