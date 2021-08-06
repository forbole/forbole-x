const sendMsgToChromeExt = (msg: ChromeMessage) =>
  new Promise<any>((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(process.env.NEXT_PUBLIC_CHROME_EXT_ID, msg, (response) => {
        if (response.err) {
          console.log(msg, response)
          reject(new Error(response.err))
        } else {
          resolve(response)
        }
      })
    } catch (err) {
      console.log(err)
    }
  })

export default sendMsgToChromeExt
