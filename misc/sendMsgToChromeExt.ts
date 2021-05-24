const sendMsgToChromeExt = (msg: ChromeMessage) =>
  new Promise<any>((resolve, reject) => {
    console.log(msg)
    chrome.runtime.sendMessage(process.env.NEXT_PUBLIC_CHROME_EXT_ID, msg, (response) => {
      console.log(response)
      if (response.err) {
        reject(new Error(response.err))
      } else {
        resolve(response)
      }
    })
  })

export default sendMsgToChromeExt
