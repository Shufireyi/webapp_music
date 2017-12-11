import {
  getLyric
} from '../../api/song'
import {
  ERR_OK
} from '../../api/config'
import {
  Base64
} from 'js-base64'
import {
  getQQSong
} from '../../api/singer'

export default class Song {
  constructor({
    id,
    mid,
    singer,
    name,
    album,
    duration,
    img,
    url
  }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.img = img
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(res => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    img: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=99`
    url: _getQQSong(musicData.songmid)
  })
}

export function filterSinger(singer) {
  let ret = []
  singer.forEach(element => {
    ret.push(element.name)
  })
  return ret.join('/')
}

function _getQQSong(songmid) {
  return getQQSong(songmid).then(res => {
    if (res.code === ERR_OK) {
      return `http://dl.stream.qqmusic.qq.com/C400${res.data.items[0].songmid}.m4a?vkey=${res.data.items[0].vkey}&guid=4515150727&uin=0&fromtag=66`
    }
  })
}
