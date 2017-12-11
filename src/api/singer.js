import jsonp from '../common/js/jsonp'
import {
  commonParams,
  options
} from './config'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    platform: 'yqq'
    // g_tk: 102338496
  })
  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
    // g_tk: 102338496,
  })

  return jsonp(url, data, options)
}

// test
// export function getQQSong(num, songmid) {
//   num = 1512954968669
//   songmid = '000YcSHE2q75dr'
//   const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?_=${num}`
//   const data = Object.assign({}, {
//     'comm': {
//       'g_tk': 5381,
//       'uin': 0,
//       'format': 'json',
//       'inCharset': 'utf-8',
//       'outCharset': 'utf-8',
//       'notice': 0,
//       'platform': 'h5',
//       'needNewCode': 1
//     },
//     'url_mid': {
//       'module': 'vkey.GetVkeyServer',
//       'method': 'CgiGetVkey',
//       'param': {
//         'guid': '4515150727',
//         'songmid': [songmid],
//         'songtype': [0],
//         'uin': '0',
//         'loginflag': 0,
//         'platform': '23'
//       }
//     }
//   })
//   return jsonp(url, data, options)
// }
