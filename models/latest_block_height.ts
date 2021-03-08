class LatestBlockHeight {
  public height: number;
  public timestamp: string;

  constructor(payload: any) {
    this.height = payload.height;
    this.timestamp = payload.timestamp;
  }

  static fromJson(data: any) {
    return new LatestBlockHeight({
      height: data.height ?? 0,
      timestamp: data.timestamp,
    });
  }
}

export default LatestBlockHeight;
