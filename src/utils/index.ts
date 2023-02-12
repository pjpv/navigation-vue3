const REGX_CHROME_EXTENSION = /^chrome-extension:\/\//
export const throttle = (fn: any, delay: number) => {
  let timer: any
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
      timer = null
    }, delay)
  }
}

// 生成随机UUID
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const openUrlWithJS = (url: string, isNewWin: boolean = false) => {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.setAttribute('href', url)
  a.setAttribute('target', isNewWin ? '_blank' : '_self')
  // a.setAttribute('id', 'openUrlWithJS')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
export const openUrlWithChrome = (url: string, isNewWin: boolean = false) => {
  //@ts-ignore
  // eslint-disable-next-line
  const tabs = chrome.tabs
  if (isNewWin || REGX_CHROME_EXTENSION.test(url)) {
    tabs.create({ url })
  } else {
    tabs.getCurrent((e: any) => {
      tabs.update(e.id, { url })
    })
  }
}
export const openUrl = (url: string, isNewWin: boolean = false) => {
  // @ts-ignore
  if (window.chrome && window.chrome.tabs) {
    openUrlWithChrome(url, isNewWin)
  } else {
    openUrlWithJS(url, isNewWin)
  }
}
