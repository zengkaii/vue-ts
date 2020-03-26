import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'

@Component
export default class DialogMix extends Vue {
    @Prop(Boolean)
    show!: boolean

    get dialogShow() {
        return this.show
    }

    set dialogShow(val) {
        this.$emit('update:show', val)
    }
}
