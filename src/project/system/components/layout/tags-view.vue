<template lang="pug">
    div.tags-view-container
        scroll-pane.tags-view-wrapper(ref="scrollPane")
            router-link.tags-view-item(v-for="(tag,index) in gettersDynamicTags" :key="index" :to="tag.path"  
                                        :class="isActive(tag)?'active':''"
                                        @contextmenu.prevent.native="openMenu(tag,$event)"
                                        @dblclick.native="selectOption(tag)")
                                        
                | {{ tag.label }}
                span.el-icon-close(@click.prevent.stop="closeSelectedTag(index)")
        ul.contextmenu(v-show="visible" :style="{left:left+'px',top:top+'px'}")
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import ScrollPane from '@/components/scroll-pane/index.vue'
    import Types from '../../store/types'
    import { MenuList } from '@/model/Store.ts'
    @Component({
        components: {ScrollPane}
    })
    export default class TagsView extends Vue {
        public name = 'TagsView'
        visible = false
        top = 0 as number
        left = 0 as number
        selectedTag = {} as MenuList
        path = '' as string
        get gettersDynamicTags() {
            return this.$store.getters.dynamicTags
        }
        closeSelectedTag(index: number) {
            this.$store.dispatch(Types.REMOVE_DYNAMIC_TAGS, index)
        }
        openMenu(tag: MenuList, event: any) {
            console.log(tag)
        }
        isActive(route: MenuList) {
            console.log(route.path, '1')
            console.log(this.$route.path, '2')
            return route.path === this.$route.path
        }
        selectOption(tag: MenuList) {
            console.log(tag)
        }
    }
</script>
<style lang="less" scoped>
.tags-view-container {
    position: fixed;
    top: 75px;
    width: 100%;
    z-index: 1000;
    .tags-view-wrapper {
        background: #fff;
        height: 34px;
        border-bottom: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
        .tags-view-item {
            display: inline-block;
            position: relative;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 3px;
            text-decoration: none;
            &:first-of-type {
                margin-left: 15px;
            }
            &.active {
                background-color: #42b983;
                color: #fff;
                border-color: #42b983;
                &::before {
                content: '';
                background: #fff;
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                position: relative;
                margin-right: 2px;
                }
            }
        }
    }
    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 100;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
}
.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            vertical-align: 2px;
            border-radius: 50%;
            text-align: center;
            transition: all .3s cubic-bezier(.645, .045, .355, 1);
            transform-origin: 100% 50%;
            &:before {
                transform: scale(.6);
                display: inline-block;
                vertical-align: -3px;
            }
            &:hover {
                background-color: #b4bccc;
                color: #fff;
            }
            }
    }
}
</style>