<template lang="pug">
    el-submenu(:index='item.id' v-for="(item,index) in menus" :key="index" v-if="item.type === 'menu'")
        template(slot="title")
            span {{item.label}}
        el-menu-item-group(v-for="(citem,cindex) in item.children" v-if="item.type === 'menu'" :key="index")
            el-menu-item(index='') {{citem.label}}
            el-menu-item(index='') {{citem.label}}	
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Watch, Prop} from 'vue-property-decorator'
    import {Tree} from 'element-ui'
    import Types from '../../store/types'
    import { MenuList } from '@/model/Store.ts'
    @Component({
    })
    export default class AsideMenu extends Vue {
        @Prop({
            type: Array
        }) menus!: MenuList
    }
</script>
<style lang="less" scoped>
</style>