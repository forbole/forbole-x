import get from 'lodash/get'

const uploadIPFSImage = (onLoadStart?: () => void): Promise<string> =>
  new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.style.display = 'none'
    input.onchange = (e) => {
      const file = get(e, 'target.files[0]')
      if (!file) {
        input.remove()
        reject(new Error('no file'))
      }
      const formData = new FormData()
      formData.append('file', file)
      if (onLoadStart) {
        onLoadStart()
      }
      fetch(`${process.env.NEXT_PUBLIC_IPFS_URL}/api/v0/add`, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          input.remove()
          resolve(`${process.env.NEXT_PUBLIC_IPFS_URL}/ipfs/${result.Hash}`)
        })
        .catch((err) => {
          input.remove()
          reject(err)
        })
    }
    input.click()
  })

export default uploadIPFSImage
