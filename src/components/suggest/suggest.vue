<template>
    <scroll ref="suggest" class="suggest" 
            :data="result" 
            :pullup="pullup" 
            :beforeScroll="beforeScroll" 
            @beforeScroll="listScorll" 
            @scrollToEnd="searchMore">
        <ul class="suggest-list">
            <li @click="selectItem(item)" class="suggest-item" v-for="(item,index) in result" :key="index">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>

<script>
import { search } from '../../api/search'
import { ERR_OK } from '../../api/config'
import { createSong } from '../../common/js/song'
import scroll from '../../base/scroll/scroll'
import loading from '../../base/loading/loading'
import Singer from '../../common/js/singer'
import noResult from '../../base/noResult/no-result'
import { mapMutations, mapActions } from 'vuex'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
    props: {
        query: {
            type: String,
            default: ''
        },
        showSinger: {
            type: Boolean,
            default: true
        }
    },
    components: {
        scroll,
        loading,
        noResult
    },
    data() {
        return {
            page: 1,
            result: [],
            pullup: true,
            beforeScroll: true,
            hasMore: true
        }
    },
    watch: {
        query() {
            this._search()
        }
    },
    methods: {
        selectItem(item) {
            if (item.type === TYPE_SINGER) {
                const singer = new Singer({
                    id: item.singermid,
                    name: item.singername
                })
                this.$router.push({
                    path: `/search/${singer.id}`
                })
                this.setSinger(singer)
            } else {
                this.insertSong(item)
            }
            this.$emit('select')
        },
        getIconCls(item) {
            if (item.type === TYPE_SINGER) {
                return 'icon-mine'
            } else {
                return 'icon-music'
            }
        },
        getDisplayName(item) {
            if (item.type === TYPE_SINGER) {
                return item.singername
            } else {
                return `${item.name}-${item.singer}`
            }
        },
        searchMore() {
            if (!this.hasMore) {
                return
            }
            this.page++
            search(this.query, this.page, this.showSinger, perpage).then(res => {
                if (res.code === ERR_OK) {
                    this.result = this.result.concat(this._genResult(res.data).slice(1))
                    this._checkMore(res.data)
                }
            })
        },
        listScorll() {
            this.$emit('listScroll')
        },
        refresh() {
            this.$refs.suggest.refresh()
        },
        _search() {
            this.page = 1
            this.hasMore = true
            this.$refs.suggest.scrollTo(0, 0)
            search(this.query, this.page, this.showSinger, perpage).then(res => {
                if (res.code === ERR_OK) {
                    this.result = this._genResult(res.data)
                    this._checkMore(res.data)
                }
            })
        },
        _checkMore(data) {
            const song = data.song
            if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
                this.hasMore = false
            }
        },
        _genResult(data) {
            let ret = []
            if (data.zhida && data.zhida.singerid) {
                ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
            }
            if (data.song) {
                ret = ret.concat(this._normalizeSongs(data.song.list))
            }
            return ret
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach(item => {
                if (item.songid && item.albumid) {
                    ret.push(createSong(item))
                }
            })
            return ret
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }),
        ...mapActions([
            'insertSong'
        ])
    }
}
</script>


<style scoped lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 40%
      transform: translateY(-50%)
</style>