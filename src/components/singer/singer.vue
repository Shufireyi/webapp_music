<template>
    <div class="singer">
       <list-view :data="singers"></list-view>
    </div>
</template>

<script>
import { getSingerList } from '../../api/singer'
import { ERR_OK } from '../../api/config'
import Singer from '../../common/js/singer'
import listView from '../../base/listView/listView'
const HOT_NAME = '热门'
const HOT_SINGER_LENGTH = 10
export default {
    components: {
        listView
    },
    data() {
        return {
            singers: []
        }
    },
    created() {
        this._getSingerList()
    },
    methods: {
        _getSingerList() {
            getSingerList().then((res) => {
                if (res.code === ERR_OK) {
                    this.singers = this._normalizeSinger(res.data.list)
                }
            })
        },
        _normalizeSinger(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }
            list.forEach((element, index) => {
                if (index < HOT_SINGER_LENGTH) {
                    map.hot.items.push(new Singer({
                        id: element.Fsinger_mid,
                        name: element.Fsinger_name
                    }))
                }

                const key = element.Findex
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                map[key].items.push(new Singer({
                    id: element.Fsinger_mid,
                    name: element.Fsinger_name
                }))
            })
            let hot = []
            let ret = []
            for (let key in map) {
                let val = map[key]
                if (val.title.match(/[a-zA-Z]/)) {
                    ret.push(val)
                } else if (val.title === HOT_NAME) {
                    hot.push(val)
                }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })

            return hot.concat(ret)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .singer
        position fixed
        top 88px
        bottom 0
        width 100%
</style>
