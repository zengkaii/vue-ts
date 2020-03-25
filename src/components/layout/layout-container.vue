<template lang="pug">
    el-container
        el-header Header
        el-container
            el-aside(width="200px") Aside
            el-main Main
                router-view
</template>
<style lang="less" scoped>
// .container{
//     height: 100vh;
// }
.el-header, .el-footer {
    background-color: @light-color;
    color: @font-color;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid @border-color;
}
.el-header{
    height: 10vh!important;
    line-height: 10vh;
}
.el-aside {
    height: 90vh;
    background-color: @second-color;
    color: @light-color;
    text-align: center;
}
  
.el-main {
    background-color: @light-color;
    color: @font-color;
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
</style>