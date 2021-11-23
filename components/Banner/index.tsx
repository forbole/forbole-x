import Link from 'next/link'
import { Card, CardMedia, alpha, useTheme } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import useStyles from './style'

const Banner: React.FC = () => {
  const banners: string[] = [
    '/static/images/banner_airdrop_announced.png',
    '/static/images/banner_airdrop_claimable.png',
  ]

  const classes = useStyles()
  const theme = useTheme()

  return (
    <Card className={classes.container}>
      <Carousel
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            bottom: 0,
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: theme.palette.primary.main,
          },
        }}
        indicatorIconButtonProps={{
          style: {
            color: alpha(theme.palette.primary.main, 0.6),
          },
        }}
      >
        {banners.map((banner) => (
          <Link href="/dsm-airdrop">
            <CardMedia className={classes.bannerImage} image={banner} component="img" />
          </Link>
        ))}
      </Carousel>
    </Card>
  )
}

export default Banner
