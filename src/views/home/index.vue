<template lang="pug">
	.home-container
		| home
		div(v-for="item,index in list" :key="index") {{item}}
		div
			el-button(type='primary' @click="handle()") 改变2
			el-button(type='primary' @click="handlePush()") push
			el-button(type='primary' @click="handleMap()") map
</template>

<script type="text/jsx" lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {all, allPost} from '../../api/stringApi'
// import test from '../../api/test'
@Component({
})
export default class Home extends Vue {
    public name = 'Home'
    list = [1, 2, 3, 4] as any[]
    created() {
        // console.log(requestAgents)
        // test.all()
        all({}).then(res => {
            console.log(res)
        })
        allPost({}).then(res => {
            console.log(res)
        })
    }
    handle() {
        this.list[1] = 3
        console.log(this.list)
    }
    handlePush() {
        this.list.push(3)
        console.log(this.list)
    }
    handleMap() {
        this.list = this.list.map(item => {
            item = item + 1
            return item
        })
        console.log(this.list)
    }
}

</script>
