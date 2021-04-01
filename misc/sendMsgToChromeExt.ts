const sendMsgToChromeExt = (msg: ChromeMessage) =>
  new Promise<any>((resolve, reject) => {
    console.log('msg', msg)
    const msgT = {
      event: 'addFavValidators',
      data: {
        address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z6',
      },
    }
    chrome.runtime.sendMessage(process.env.NEXT_PUBLIC_CHROME_EXT_ID, msg, (response) => {
      console.log('response', response)
      if (response.err) {
        reject(new Error(response.err))
      } else {
        resolve(response)
      }
    })
  })

export default sendMsgToChromeExt
