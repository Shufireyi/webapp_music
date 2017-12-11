<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import musicList from '../music-list/musicList'
import { mapGetters } from 'vuex'
import { getSongList } from '../../api/recommend'
import { ERR_OK } from '../../api/config'
import { createSong } from '../../common/js/song'
export default {
    components: {
        musicList
    },
    data() {
        return {
            songs: []
        }
    },
    computed: {
        ...mapGetters([
            'disc'
        ]),
        title() {
            return this.disc.dissname
        },
        bgImage() {
            return this.disc.imgurl
        }
    },
    created() {
        this._getSongList()
    },
    methods: {
        _getSongList() {
            if (!this.disc.dissid) {
                this.$router.push('/recommend')
                return
            }
            getSongList(this.disc.dissid).then((res) => {
                if (res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.cdlist[0].songlist)
                }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach(song => {
                if (song.songid && song.albumid) {
                    ret.push(createSong(song))
                }
            })
            return ret
        }
    }
}
</script>

<style lang="stylus" scoped>
    .slide-enter-active,.slide-leave-active
        transition all .3s

    .slide-enter,.slide-leave-to
        transform translate3d(100%,0,0)
</style>
