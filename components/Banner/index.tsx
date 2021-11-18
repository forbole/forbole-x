import { Card, CardMedia, Box, useTheme, alpha } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { CustomTheme } from '../../misc/theme'
import useStyles from './style'

const Banner: React.FC = () => {
  const banners: string[] = [
    '/static/images/banner_airdrop_announced.png',
    '/static/images/banner_airdrop_claimable.png',
  ]
  const [activeIndex, setActiveIndex] = useState(0)
  const classes = useStyles()
  const theme: CustomTheme = useTheme()

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => {
        if (prevIndex + 2 > banners.length) {
          return 0
        }
        return prevIndex + 1
      })
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Card className={classes.container}>
      <Box position="relative">
        <CardMedia
          className={classes.bannerImage}
          image={banners[activeIndex]}
          title="banner"
          component="img"
        />
        <Box
          position="absolute"
          display="flex"
          bottom={theme.spacing(0.5)}
          justifyContent="center"
          width="100%"
        >
          {banners.map((_, index) => (
            <Box
              bgcolor={alpha('#007FFF', activeIndex === index ? 1 : 0.6)}
              width={theme.spacing(0.75)}
              height={theme.spacing(0.75)}
              borderRadius={theme.spacing(3)}
              mr={1}
              onClick={() => {
                setActiveIndex(index)
              }}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>
    </Card>
  )
}

export default Banner
