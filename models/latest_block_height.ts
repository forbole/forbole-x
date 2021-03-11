interface Height {
  height?: number
  timestamp?: string
}

class LatestBlockHeight {
  public height: number
  public timestamp: string

  constructor(payload: Height) {
    this.height = payload.height
    this.timestamp = payload.timestamp
  }

  static fromJson(data: Height): LatestBlockHeight {
    return new LatestBlockHeight({
      height: data.height ?? 0,
      timestamp: data.timestamp,
    })
  }
}

export default LatestBlockHeight
