<template lang="pug">
.main-container
    .tag-row(v-if="dynamicTags.length > 0")
        el-tag.margin-right-10(v-for="(tag,index) in dynamicTags" :key="index" closable type="success" @close="handleClose(tag)" size="medium") {{tag.label}}
    .container
        router-view
</template>
<script lang="ts">
    import Vue from 'vue'
    import { MenuList } from '@/model/Store.ts'
    import Component from 'vue-class-component'
    @Component({
    })
    export default class MainContent extends Vue {
        public name = 'MainContent'
        // created() {}
        dynamicTags = [
            { label: '标签一', id: 0, path: '' },
            { label: '标签二', id: 1, path: '' },
            { label: '标签三', id: 2, path: '' },
            { label: '标签四', id: 3, path: ''  },
            { label: '标签五', id: 4, path: ''  },
        ] as MenuList[]
        handleClose(item: MenuList) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(item), 1)
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
        padding-left: 20px;
        padding-right: 20px;
    }
}   
</style>