chrome.runtime.onInstalled.addListener(
  function (details) {
    if (details.reason == 'install') {
      chrome.tabs.create({ active: true })
    }
  },
)

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    if (msg == 'newtab')
      chrome.tabs.create({ active: true })
    else return
  })
})