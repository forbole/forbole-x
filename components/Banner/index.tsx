import { Card, CardMedia, alpha } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import useStyles from './style'

const Banner: React.FC = () => {
  const banners: string[] = [
    '/static/images/banner_airdrop_announced.png',
    '/static/images/banner_airdrop_claimable.png',
  ]

  const classes = useStyles()
  return (
    <Card className={classes.container}>
      <Carousel
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            bottom: 0,
          },
        }}
        indicatorIconButtonProps={{
          style: {
            color: '#007FFF',
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: alpha('#007FFF', 0.6),
          },
        }}
      >
        {banners.map((banner) => (
          <CardMedia
            className={classes.bannerImage}
            image={banner}
            title="banner"
            component="img"
          />
        ))}
      </Carousel>
    </Card>
  )
}

export default Banner
