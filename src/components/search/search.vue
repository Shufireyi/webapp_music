<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @query="onQueryChange"></search-box>
        </div>
        <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
            <scroll :refreshDelay="refreshDelay" ref="shortcut" class="shortcut" :data="shortcut">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                            <li @click="addQuery(item.k)" class="item" v-for="(item,index) in hotKey" :key="index">
                                <span>{{item.k}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="search-history" v-show="searchHistory.length">
                        <h1 class="title">
                            <span class="text">搜索历史</span>
                            <span @click="showConfirm" class="clear">
                                <i class="icon-clear"></i>
                            </span>
                        </h1>
                        <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
                    </div>
                </div>
            </scroll>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <suggest ref="suggest" :query="query" @select="saveSearch" @listScroll="blurInput"></suggest>
        </div>
        <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
        <router-view></router-view>
    </div>
</template>

<script>
import scroll from '../../base/scroll/scroll'
import searchBox from '../../base/searchBox/searchBox'
import suggest from '../suggest/suggest'
import searchList from '../../base/searchList/searchList'
import confirm from '../../base/confirm/confirm'
import { getHotKey } from '../../api/search'
import { ERR_OK } from '../../api/config'
import { mapActions } from 'vuex'
import { playListMixin, searchMixin } from '../../common/js/mixin'

export default {
    mixins: [playListMixin, searchMixin],
    components: {
        scroll,
        searchBox,
        suggest,
        searchList,
        confirm
    },
    data() {
        return {
            hotKey: [],
            refreshDelay: 100
        }
    },
    computed: {
        shortcut() {
            return this.hotKey.concat(this.searchHistory)
        }
    },
    watch: {
        query(newquery) {
            if (!newquery) {
                setTimeout(() => {
                    this.$refs.shortcut.refresh()
                }, 20)
            }
        }
    },
    created() {
        this._getHotKey()
    },
    methods: {
        showConfirm() {
            this.$refs.confirm.show()
        },
        handlePlaylist(playList) {
            const bottom = playList.length > 0 ? '60px' : ''
            this.$refs.shortcutWrapper.style.bottom = bottom
            this.$refs.shortcut.refresh()
            this.$refs.searchResult.style.bottom = bottom
            this.$refs.suggest.refresh()
        },
        _getHotKey() {
            getHotKey().then(res => {
                if (res.code === ERR_OK) {
                    this.hotKey = res.data.hotkey.slice(0, 10)
                }
            })
        },
        ...mapActions([
            'clearSearchHistory'
        ])
    }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
