<template lang="pug">
.aside-container
	.aside-search
		el-input( placeholder="输入关键字进行过滤" v-model="filterText")
	el-tree.filter-tree(:data="menuList"
                        :props="defaultProps"
                        default-expand-all
                        :filter-node-method="filterNode"
                        @node-click="nodeClick"
                        ref="tree")
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Watch} from 'vue-property-decorator'
    import {Tree} from 'element-ui'
    import Types from '../../store/types'
    import { MenuList } from '@/model/Store.ts'
    @Component({
    })
    export default class AsideMenu extends Vue {
        public name = 'AsideMenu'
        // created() {}
        isCollapse = false
        filterText = ''
        defaultProps = {
          children: 'children',
          label: 'label'
        } as {
            children: string,
            label: string
        }
        menuList = [
            {
                id: 1,
                label: '数据看板',
                children: [
                {
                    id: 4,
                    label: '看板一',
                    path: '/dashboard'
                },{
                    id: 10,
                    label: '看板二',
                    path: '/home'
                },{
                    id: 9,
                    label: '看板三',
                    path: '/dashboard3'
                },
                ]
            },
            {
                id: 2,
                label: '一级 2',
                children: [
                {
                id: 5,
                label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }
                ]
            },
            {
                id: 3,
                label: '一级 3',
                children: [
                {
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }
                ]
            },
            {
                id: 3,
                label: '一级 3',
                children: [
                {
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }
                ]
            },
            {
                id: 3,
                label: '一级 3',
                children: [
                {
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }
                ]
            },
            {
                id: 3,
                label: '一级 3',
                children: [
                {
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }
                ]
            },
            {
                id: 3,
                label: '一级 3',
                children: [
                {
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }
                ]
            },
            {
                id: 3,
                label: '一级 3',
                children: [
                {
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }
                ]
            },
            {
                id: 3,
                label: '一级 3',
                children: [
                {
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }
                ]
            },
            {
                id: 3,
                label: '一级 3',
                children: [
                {
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }
                ]
            },
            {
                id: 3,
                label: '一级 3',
                children: [
                {
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }
                ]
            }
        ] as any[]
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
        handleClose(key: string, keyPath: string[]) {
            console.log(key, keyPath)
        }
        nodeClick(row: MenuList, node: any, data: any) {
            if(!row.path) {
                return
            }
            const dynamicTags = this.$store.getters.dynamicTags
            if(dynamicTags.find((i: MenuList) => i.id === row.id)) {
                return
            }
            const path: string = row.path
            const currentPath: string = this.$route.path
            this.$store.dispatch(Types.SET_DYNAMIC_TAGS, row)
            if(path === currentPath) {
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
	// position: relative;
	padding: 5px;
	// margin-top: 40px;
	padding-top: 30px;
	.aside-search{
		position: fixed;
		top: 75px;
		left: 0px;
		// right: 0px;
		z-index: 100;
		/deep/ .el-input{
			width: 183px;
		}
		/deep/ .el-input__inner{
			border-radius: 0px;
		}
	}
    .filter-tree{
        background-color: @second-color;
        color: @light-color;
    }
    /deep/ .el-tree-node__content:hover{
        background: @dark-color!important;
    }
    /deep/ .el-tree-node:focus>.el-tree-node__content{
        background: @dark-color!important;
    }
}
</style>