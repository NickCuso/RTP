<template>
    <div>
        <div>
            <div class="row mt-3">
                <hr>
                <br>
            </div> 
            <div class="row tips">
                You're also welcome to send tips directly:
            </div>
            <div class="row mt-1 justify-content-center">
                <ul class="text-left tips">
                    <li>
                        BTC: 3FQdCDmZcXXE8psTfazXxHKsdaLsXgxfWs
                    </li>
                    <li>
                        ETH (incl any ERC20): 0x7A23608a8eBe71868013BDA0d900351A83bb4Dc2
                    </li>
                    <li>
                        LTC: MGF4vG8QT68otdbKT1ZjpqmFmkir67Wnjk
                    </li>
                    <li>
                        NANO: xrb_377ketnssiicfmruy6y7urhmbt1dkqprjwoob1nr8y7nxeixo4kuqx6gdm84
                    </li>
                    <li>
                        DASH: XcCCFMgbNmCHiNEj1EbNGvSQBcRM8VCNNM
                    </li>
                    <li>
                        NAS: n1S5JNP13pnoyswKbGtrtE3Bexz6pbtKaPj
                    </li>
                    <li>
                        NEO (incl any NEP5): AKSB636yR6wi4ivM7kJX3i999u3JGVgp5A
                    </li>
                    <li>
                        BAN: ban_1597i1ybctywb37n5oikw79jyrrj7ocndaqad4foay861yeb1afppy3zxebz
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="contract_address">
            <a v-bind:href="contract_url" target="_blank">View Smart Contract ({{ contract_address }})</a>
        </div>
        <div>
            <a href="https://youtube.com/HardlyDifficult">YouTube</a>
            | 
            <a href="https://twitch.tv/HardlyDifficult">Twitch</a>
            | 
            <a href="https://steemit.com/@HardlyDifficult">SteemIt</a>
            | 
            <a href="https://Twitter.com/HardlyDifficult">Twitter</a>
        </div>
        <br><br>
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
            contract_url: null,
            contract_address: null,
        }
    },
    methods:
    {
        async declineAll()
        {
            await contract.declineAll(this.$root.onTxPosted, this.$root.onTxComplete);
        },
    },
    async mounted()
    {
        this.contract_address = await contract.getContractAddress();
        this.contract_url = await contract.getContractUrl();
    }
}
</script>
<style scoped>
.tips
{
    display: inline-block;
    width: 40em;
    font-size: .75em;
}
</style>