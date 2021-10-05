import get from 'lodash/get'

const uploadIPFSImage = (): Promise<string> =>
  new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.style.display = 'none'
    input.onchange = (e) => {
      const file = get(e, 'target.files[0]')
      const formData = new FormData()
      formData.append('file', file)
      fetch(`${process.env.NEXT_PUBLIC_IPFS_URL}/api/v0/add`, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          resolve(`${process.env.NEXT_PUBLIC_IPFS_URL}/ipfs/${result.Hash}`)
        })
        .catch((err) => reject(err))
    }
    input.click()
  })

export default uploadIPFSImage
