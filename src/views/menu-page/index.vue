<template lang="pug">
    div.menu-page
        el-row(:gutter="88")
            el-col(:span="8")
                el-button(@click="createNewObj()") 新增一级目录
                el-tree(:data="treeData" node-key="id" default-expand-all :expand-on-click-node="false")
                    span.custom-tree-node(slot-scope="{ node, data }")
                        span {{node.label}}
                        span
                            el-button(v-if="data.type === 'bar'" type="text" size="mini" @click="() => append(data)") 添加
                            el-button(v-if="!data.children || data.children.length<=0" type="text" size="mini" @click="() => remove(node, data)" style="color:red") 删除
            el-col(:span="8" v-if="showEditMenu")
                el-form(inline label-width="100px" label-position="left")
                    el-form-item(label="上级菜单：" v-if="showParentSelect")
                        el-select(v-model="form.parentId" style="width:385px" placeholder="请选择上级菜单" :disabled="parentDisabled")
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
                        el-button(@click="showEditMenu=false") 关闭
                        el-button(@click="resetForm()") 重置
                        el-button(type="success" @click="confirmHandle()") 确定
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {menuList, saveMenu, deleteMenu} from '@/api/menuApi'
    import { MenuList } from '@/model/Store.ts'
    const id = 1000
    export interface Form {
    label: string
    path?: string,
    type: string,
    name: string,
    parentId?: number | string,
    children?: MenuList[]
}

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
        } as Form
        treeData = [] as any[]
        parentData = [] as any[]
        parentDisabled = false as boolean
        showEditMenu = false as boolean
        showParentSelect = false as boolean

        created() {
            this.initData()
        }

        async createNewObj() {
            this.showParentSelect = false
            this.parentDisabled = false
            this.showEditMenu = true
            this.form = {
                label: '',
                path: '',
                type: '',
                name: '',
                parentId: ''
            }
        }

        async initData() {
            try {
                const { data } = await menuList()
                const menuData = data.array || []
                this.parentData = menuData.filter((item: MenuList) => item.type === 'bar')
                this.initTreeData(menuData)
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
            return saveArray.map((item: MenuList) => {
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

        append(data: MenuList) {
            this.form.parentId = data.id
            this.parentDisabled = true
            this.showEditMenu = true
            this.showParentSelect = true
        }
        async remove(node: any, data: any) {
            try {
                await this.$confirm(`确定删除菜单${data.label}吗？`, '提示')
                await deleteMenu({id: data.id}).then(() => {
                this.$message.success('删除成功')
                this.initData()
            })
            } catch (error) {
                this.$message.error(error.msg)
            }
        }
        resetForm() {
            // this.$options.data()报错?
            this.form = {
                label: '',
                path: '',
                type: '',
                name: '',
                parentId: this.form.parentId
            }
        }
        async confirmHandle() {
            try {
                await saveMenu(this.form)
                this.$message.success('保存成功')
                this.resetForm()
                this.showEditMenu = false
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