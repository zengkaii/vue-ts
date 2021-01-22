<template lang="pug">
    div.menu-page
        | 菜单配置
        el-row(:gutter="88")
            el-col(:span="8")
                el-button(@click="createNewObj()") 新增一级目录
                el-tree(:data="treeData" node-key="id" default-expand-all :expand-on-click-node="false")
                    span.custom-tree-node(slot-scope="{ node, data }")
                        span {{node.label}}
                        span
                            el-button(type="text" size="mini" @click="() => append(data)") 添加
                            el-button(type="text" size="mini" @click="() => remove(node, data)") 删除
            el-col(:span="8")
                el-form(inline label-width="100px" label-position="left")
                    el-form-item(label="上级菜单：")
                        el-select(v-model="form.parentId" style="width:385px" placeholder="请选择上级菜单")
                            el-option(v-for="item in parentData" :key="item.id" :value="item.id" :label="item.label")
                    el-form-item(label="菜单名称：")
                        el-input(v-model="form.label" style="width:385px" placeholder="请输入菜单名称")
                    el-form-item(label="菜单英文：")
                        el-input(v-model="form.name" style="width:385px" placeholder="请输入菜单英文")
                    el-form-item(label="菜单路径：" )
                        el-input(v-model="form.path" style="width:385px" placeholder="请输入菜单路径")
                    el-form-item(label="菜单类型：")
                        el-select(v-model="form.type" style="width:385px" placeholder="请选择菜单类型")
                            el-option( label="可展开菜单" value="bar")
                            el-option( label="不可展开菜单" value="menu")
                    br
                    el-form-item.foot-btns(style="margin-top:40px;")
                        el-button(@click="resetForm()") 重置
                        el-button(type="success" @click="confirmHandle()") 确定
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {menuList, saveMenu} from '@/api/menuApi'
    import { MenuList } from '@/model/Store.ts'
    let id = 1000
    @Component({
    })
    export default class MenuPage extends Vue {
        public name = 'MenuPage'
        form = {
            label: '',
            path: '',
            type: '',
            name: '',
            parentId: ''
        } as any
        treeData = [] as any[]
        parentData = [] as any[]
        treeDataw = [
            {
                id: 1,
                label: '管理',
                type: 'bar',
                name: 'manage',
                children: [
                    {
                        parentId: 1,
                        id: 4,
                        label: '看板',
                        path: '/dashboard',
                        type: 'menu',
                        name: 'dashboard'
                    },
                    {
                        parentId: 1,
                        id: 10,
                        label: '菜单',
                        path: '/menu-page',
                        type: 'menu',
                        name: 'menu'
                    },
                    {
                        parentId: 1,
                        id: 8,
                        label: '管理',
                        type: 'bar',
                        name: '',
                        children: [
                            {
                                parentId: 8,
                                id: 9,
                                label: '看板',
                                path: '/dashboard',
                                type: 'menu',
                                name: ''
                            },
                            {
                                id: 7,
                                label: '菜单',
                                path: '/menu-page',
                                type: 'menu',
                                name: ''
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                label: '管理',
                type: 'bar',
                name: '',
                children: [
                    {
                        id: 5,
                        label: '看板',
                        path: '/dashboard',
                        type: 'menu',
                        name: ''
                    },
                    {
                        id: 6,
                        label: '菜单',
                        path: '/menu-page',
                        type: 'menu',
                        name: ''
                    }
                ]
            }
        ] as MenuList[]

        created() {
            this.initData()
        }

        async createNewObj() {
            try {
                await saveMenu(this.form)
            } catch (error) {
                console.log(error)
            }
        }

        async initData() {
            try {
                const { data } = await menuList()
                const menuData = data.array || []
                this.parentData = menuData.filter((item: MenuList) => item.type === 'bar')
                // const treeData = [] as MenuList[]
                this.initTreeData(menuData)
                // this.treeData = treeData
            } catch (error) {
                console.log(error)
            }
        }

        initTreeData(arr: MenuList[]) {
            const treeData = [] as MenuList[]
            let arrData = [] as MenuList[]
            arrData = arr.filter((item: MenuList) => {
                if (!item.parentId) {
                    treeData.push(item)
                } else {
                    return item.parentId
                }
            })
            this.treeData = this.findParent(treeData, arrData)
        }

        findParent(saveArray: MenuList[], filterArray: MenuList[]) {
            return saveArray.map((item: any) => {
                let filterLeft = [] as MenuList[]
                filterLeft = filterArray.filter((filt: MenuList) => {
                    if (item.id === filt.parentId) {
                        item.children =  item.children || []
                        item.children.push(filt)
                    } else {
                        return filt
                    }
                })
                if (item.children && item.children.length > 0 && filterLeft.length > 0) {
                    item.children = item.children.map((c: MenuList) => {
                        this.findParent([c], filterLeft)
                        return c
                    })
                }
                return item
            })
        }

        append(data: any) {
            const newChild = { id: id++, label: 'testtest', children: [] }
            if (!data.children) {
                this.$set(data, 'children', [])
            }
            data.children.push(newChild)
        }
        remove(node: any, data: any) {
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex((d: any) => d.id === data.id)
            children.splice(index, 1)
        }
        resetForm() {
            // this.$options.data()报错?
            this.form = {
                label: '',
                path: '',
                type: '',
                name: '',
                parentId: ''
            }
        }
        async confirmHandle() {
            console.log('confirmHandle')
            try {
                await saveMenu(this.form)
                this.$message.success('保存成功')
                this.resetForm()
                await this.initData()
            } catch (error) {
                console.log(error)
            }
        }
    }
</script>
<style lang="less" scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>