<template lang="pug">
.aside-container
	.aside-search
		TsMenu(:menuList="menuList" :backgroundColor="'#545c64'" :textColor="'#fff'" :activeTextColor="'#ffd04b'" @menuClick="menuClick")
		//- el-menu(default-active='1' background-color="#545c64" text-color="#fff" active-text-color="#ffd04b")
		//- 	el-submenu(:index='item.id' v-for="(item,index) in menuList" :key="index" v-if="item.type === 'menu'")
		//- 		template(slot="title")
		//- 			span {{item.label}}
		//- 		el-menu-item-group(v-for="(citem,cindex) in item.children" v-if="item.type === 'menu'" :key="index")
		//- 			el-menu-item(index='') {{citem.label}}
		//- 			el-menu-item(index='') {{citem.label}}
	//- 	el-input( placeholder="输入关键字进行过滤" v-model="filterText")
	//- el-tree.filter-tree(:data="menuList"
	//-                     :props="defaultProps"
	//-                     default-expand-all
	//-                     :filter-node-method="filterNode"
	//-                     @node-click="nodeClick"
	//-                     ref="tree")
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Watch} from 'vue-property-decorator'
    import {Tree} from 'element-ui'
    import Types from '../../store/types'
    import { MenuList } from '@/model/Store.ts'
    import TsMenu from './ts-menu'
    @Component({
        // TsMenu
        components: {
            TsMenu
        }
    })
    export default class AsideMenu extends Vue {
        public name = 'AsideMenu'
        isCollapse = false
        filterText = ''
        defaultProps = {
          children: 'children',
          label: 'label'
        } as {
            children: string,
            label: string
        }
        get menuList() {
            return this.$store.getters.menuList
        }
        $refs!: {
            tree: Tree
        }
        filterNode(value: string, data: any) {
            console.log(value, data)
            if (!value) {
                return true
            }
            return data.label.indexOf(value) !== -1

        }
        menuClick(item: MenuList) {
            console.log(item)
            if (!item.path) {
                return
            }
            const dynamicTags = this.$store.getters.dynamicTags
            if (dynamicTags.find((i: MenuList) => i.id === item.id)) {
                return
            }
            const path: string = item.path
            const currentPath: string = this.$route.path
            this.$store.dispatch(Types.SET_DYNAMIC_TAGS, item)
            if (path === currentPath) {
                return
            }
            this.$router.push(path)
        }
        handleClose(key: string, keyPath: string[]) {
            console.log(key, keyPath)
        }
        nodeClick(row: MenuList, node: any, data: any) {
            if (!row.path) {
                return
            }
            const dynamicTags = this.$store.getters.dynamicTags
            if (dynamicTags.find((i: MenuList) => i.id === row.id)) {
                return
            }
            const path: string = row.path
            const currentPath: string = this.$route.path
            this.$store.dispatch(Types.SET_DYNAMIC_TAGS, row)
            if (path === currentPath) {
                return
            }
            this.$router.push(path)
        }
        @Watch('filterText')
        filterTree(val: string) {
            this.$refs.tree.filter(val)
        }
    }
</script>
<style lang="less" scoped>
.aside-container{
    // width: 201px;
    .aside-search{
        /deep/ .el-submenu .el-menu-item{
            min-width: 199px;
        }
    }
}
// .aside-container{
// 	// position: relative;
// 	padding: 5px;
// 	// margin-top: 40px;
// 	padding-top: 30px;
// 	.aside-search{
// 		position: fixed;
// 		top: 75px;
// 		left: 0px;
// 		// right: 0px;
// 		z-index: 100;
// 		/deep/ .el-input{
// 			width: 202px;
// 		}
// 		/deep/ .el-input__inner{
// 			border-radius: 0px;
// 		}
// 	}
//     .filter-tree{
//         background-color: @second-color;
//         color: @light-color;
//     }
//     /deep/ .el-tree-node__content:hover{
//         background: @dark-color!important;
//     }
//     /deep/ .el-tree-node:focus>.el-tree-node__content{
//         background: @dark-color!important;
//     }
// }
</style>