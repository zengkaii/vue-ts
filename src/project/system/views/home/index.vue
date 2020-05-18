<template lang="pug">
	.home-container
		| home
</template>

<script type="text/jsx" lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import test from '../../api/test'
@Component({
})
export default class Home extends Vue {
    public name = 'Home'
    created() {
    console.log(1231312)
    test.all()
    }
}

</script>
