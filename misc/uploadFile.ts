import get from 'lodash/get'

const uploadFile = (): Promise<string> =>
  new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.style.display = 'none'
    input.onchange = (e) => {
      const file = get(e, 'target.files[0]')
      // TODO: upload to IPFS
      resolve(file)
    }
  })

export default uploadFile
