<template>
    <transition name="slide">
        <music-list :bg-image="bgImage" :songs="songs" :title="title"></music-list>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '../../api/singer'
import { ERR_OK } from '../../api/config'
import { createSong } from '../../common/js/song'
import musicList from '../music-list/musicList'
export default {
    data() {
        return {
            songs: []
        }
    },
    computed: {
        ...mapGetters([
            'singer'
        ]),
        title() {
            return this.singer.name
        },
        bgImage() {
            return this.singer.avatar
        }
    },
    components: {
        musicList
    },
    created() {
        this._getDetail()
    },
    methods: {
        _getDetail() {
            if (!this.singer.id) {
                this.$router.push('/singer')
                return
            }
            getSingerDetail(this.singer.id).then(res => {
                if (res.code === ERR_OK) {
                    this.songs = this._normlizeSongs(res.data.list)
                }
            })
        },
        _normlizeSongs(list) {
            let ret = []
            list.forEach(element => {
                let { musicData } = element
                if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable'
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
