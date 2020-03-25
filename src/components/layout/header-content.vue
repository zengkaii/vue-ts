<template lang="pug">
    div
        | 这是一个头部
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    @Component({
    })
    export default class HeaderContent extends Vue {
        public name = 'HeaderContent'
        // created() {}
    }
</script>
<style lang="less" scoped>
    
</style>