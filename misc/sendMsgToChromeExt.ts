const sendMsgToChromeExt = (msg: ChromeMessage) =>
  new Promise<any>((resolve, reject) => {
    chrome.runtime.sendMessage(process.env.NEXT_PUBLIC_CHROME_EXT_ID, msg, (response) => {
      if (response.err) {
        return reject(new Error(response.err))
      }
      resolve(response)
    })
  })

export default sendMsgToChromeExt
