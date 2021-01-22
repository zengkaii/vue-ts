import Vue, {CreateElement, VNode} from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import { MenuList } from '@/model/Store.ts'
import {Menu, MenuItem, MenuItemGroup, Submenu} from 'element-ui'
@Component({
    inheritAttrs: false
})
export default  class TsMenu extends Vue  {
    name = 'TsMenu'
    @Prop()
    menuList: MenuList[]
    @Prop()
    backgroundColor: string
    @Prop()
    activeTextColor: string
    @Prop()
    textColor: string
    render(h: CreateElement) {
        const that = this
        const children: VNode[] = []
        function menuRender(item: MenuList): VNode {
            let subNode: VNode
            if (item.children && item.children.length > 0) {
                let menuItemNodes: VNode[]
                menuItemNodes =  item.children.map( i => {
                    if (i.children && i.children.length > 0) {
                        return menuRender(i)
                    } else {
                        return h(MenuItem,
                                {
                                    props: {
                                        index: i.id.toString()
                                    },
                                    on: {
                                        click() {
                                            that.$emit('menuClick', i)
                                        }
                                    }
                                },
                                [
                                    h('span', i.label)
                                ]
                            )
                    }
                })
                subNode = h(Submenu,
                    {
                        props: {
                            index: item.id.toString()
                        },
                    },
                    [
                        h(
                            'template', {
                                slot: 'title'
                            }, [
                                h(
                                    'span', item.label
                                )
                            ]
                        ),

                        h(MenuItemGroup, {}, menuItemNodes )
                    ]
                )
            } else {
                subNode = h(MenuItem,
                    {
                        props: {
                            index: item.id.toString()
                        },
                        on: {
                            click() {
                                that.$emit('menuClick', item)
                            }
                        }
                    },
                    [
                        h(MenuItemGroup, {}, [
                            h('span', item.label)
                        ])
                    ]
                )
            }
            return subNode
        }
        this.menuList.forEach(item => {
            children.push(menuRender(item))
        })
        return h(Menu, {
            props: {
                backgroundColor: this.backgroundColor,
                textColor: this.textColor,
                activeTextColor: this.activeTextColor
            }
            }, children
        )
    }
}
