<template lang="pug">
    el-container
        el-header
            HeaderContent
        el-container
            el-aside(width="200px")
                AsideMenu
            .view-container
                MainContent
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import AsideMenu from './aside-menu.vue'
    import HeaderContent from './header-content.vue'
    import MainContent from './main-content.vue'
    @Component({
        components: {
            AsideMenu,
            HeaderContent,
            MainContent
        }
    })
    export default class LayoutContainer extends Vue {
        public name = 'LayoutContainer'
    }
</script>
<style lang="less" scoped>
.el-header, .el-footer {
    background-color: @light-color;
    color: @font-dark-color;
    line-height: 60px;
    border-bottom: 1px solid @border-color;
}
.el-header{
    height: 8vh!important;
    line-height: 8vh;
    // background: linear-gradient(to right, @dark-color , @third-color);
    background: @second-color;
}
.el-aside {
    height: 92vh;
    background-color: @second-color;
    color: @light-color;
}
  
.el-main {
    background-color: @light-color;
    color: @font-dark-color;
    padding: 0;
}

body > .el-container {
    margin-bottom: 40px;
}
  
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}
  
.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
.view-container{
    width: 100%;
    height: 100%;
}
</style>