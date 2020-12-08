<template lang="pug">
.main-container
    //- .tag-row(v-if="gettersDynamicTags.length > 0")
    tags-view
        //- el-tag.margin-right-10(v-for="(tag,index) in gettersDynamicTags" :key="index" closable type="success" @contextmenu.prevent.native="openMenu(tag,$event)" @close="handleClose(index)" size="medium") {{tag.label}}
    .container
        router-view
</template>
<script lang="ts">
    import Vue from 'vue'
    import { MenuList } from '@/model/Store.ts'
    import Component from 'vue-class-component'
    import {StoreState} from '../../store'
    import Types from '../../store/types'
    import ScrollPane from '@/components/scroll-pane/index.vue'
    import TagsView from './tags-view.vue'
    @Component({
        components: {
            ScrollPane, TagsView
        }
    })
    export default class MainContent extends Vue {
        public name = 'MainContent'
        dynamicTags = [] as MenuList[]
        handleClose(index: number) {
            this.$store.dispatch(Types.REMOVE_DYNAMIC_TAGS, index)
        }
        get state() {
            const state = this.$store.state as StoreState
            return state
        }
        get gettersDynamicTags() {
            return this.$store.getters.dynamicTags
        }
        openMenu() {
            console.log(123123)
        }
    }
</script>
<style lang="less" scoped>
.main-container{
    .tag-row{
        overflow-y: scroll;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        box-shadow: 0px 5px 5px -5px @dark-color;
    }
    .tag-row::-webkit-scrollbar{
        width: 6px;
    }
    .tag-row::-webkit-scrollbar-track {
		border-radius:10px;
	}
	.tag-row::-webkit-scrollbar-thumb {
		border-radius:10px;
		background: @waring-color;
    }
    .container{
        padding: 40px 20px;
    }
}   
</style>