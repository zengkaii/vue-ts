<template lang="pug">
  .home
    el-button(type='success') 按钮
    | xxx
</template>

<script type="text/jsx" lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import HelloWorld from '@/components/HelloWorld.vue'
  @Component({
    components: {
      HelloWorld
      }
  })
  export default class Home extends Vue {
    public name = 'Home'
    created() {
      console.log(1231312)
    }
  }

</script>
