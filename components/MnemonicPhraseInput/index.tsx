import { Box, Grid, Typography } from '@material-ui/core'
import times from 'lodash/times'
import React from 'react'
import useStyles from './styles'

interface MnemonicPhraseInputProps {
  mnemonic: string
  onChange(mnemonic: string): void
  disabled?: boolean
}

const MnemonicPhraseInput: React.FC<MnemonicPhraseInputProps> = ({
  mnemonic,
  onChange,
  disabled,
}) => {
  const classes = useStyles()

  const mnemonicArr = React.useMemo(() => {
    if (!mnemonic) {
      return times(24).map(() => '')
    }
    const arr = mnemonic.split(/\s+/)
    return times(24).map((i) => arr[i] || '')
  }, [mnemonic])

  const moveToNextInput = React.useCallback((i: number) => {
    const nextInput = document.getElementById(`mnemonic-${i + 1}`)
    if (nextInput) {
      nextInput.focus()
    } else {
      document.getElementById(`mnemonic-${i}`).blur()
    }
  }, [])
  return (
    <Grid container spacing={2}>
      {times(24).map((i) => (
        <Grid item xs={3}>
          <Box position="relative">
            {disabled ? (
              <Typography className={classes.input}>{mnemonicArr[i]}</Typography>
            ) : (
              <input
                id={`mnemonic-${i}`}
                value={mnemonicArr[i]}
                onChange={(e) =>
                  onChange(
                    mnemonicArr
                      .map((m, j) => (j === i ? e.target.value.replace(/^. + [^ ]*$/, '') : m))
                      .join(' ')
                      .replace(/\s+/g, ' ')
                      .trim()
                  )
                }
                onKeyPress={(e) => {
                  if (e.key === ' ') {
                    moveToNextInput(i)
                  }
                }}
                className={classes.input}
              />
            )}
            <Typography variant="caption" className={classes.label} color="textSecondary">
              {i + 1}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default React.memo(MnemonicPhraseInput)
