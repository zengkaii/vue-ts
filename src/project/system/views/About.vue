<template lang='pug'>
  .about
    el-button(type='primary') 按钮
    router-view
</template>
<script lang='ts'>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  @Component({
  })
  export default class About extends Vue {
    public name = 'About'
  }
</script>
