import originJSONP from 'jsonp'
/**
 * 封装jsonp 返回一个promise对象
 * @export
 * @param {any} url 服务端url
 * @param {any} data 参数对象 通过param函数
 * @param {any} option jsonp原始参数对象
 * @returns
 */
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

/**
 * 合并url
 * @param {any} data 参数对象
 * @returns
 */
function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substr(1) : ''
}
