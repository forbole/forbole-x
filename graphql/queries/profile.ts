export const getProfile = (crypto: string): string => `
  query Profile($address: String!) {
    profile(where: {address: {_eq: $address}}) {
      bio
      cover_pic
      dtag
      nickname
      profile_pic
    }
  }
`
