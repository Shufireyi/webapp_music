export function addClass(ele, className) {
  if (hasClass(ele, className)) {
    return
  }
  let classList = ele.className.split(' ')
  classList.push(className)
  ele.className = classList.join(' ')
}

export function hasClass(ele, className) {
  let reg = new RegExp('(^|\\s)' + className + '($|\\s)')
  return reg.test(ele.className)
}

export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}
