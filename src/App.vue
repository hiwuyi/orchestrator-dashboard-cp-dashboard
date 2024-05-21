<template>
    <div class="landing">
        <router-view/>
    </div>
</template>

<script>
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
export default {
    name: 'app',
}
</script>
<style lang="less">
@import './assets/css/style.css';
@import './assets/css/variables.css';
</style>
