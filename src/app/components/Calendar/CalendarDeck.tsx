'use client'

import { Box } from '@mui/material'

import { useDeckWidth } from './theme/hooks'

export default function CalendarDeck () {
  const deckWidth = useDeckWidth()
  return (
    <Box
      width={deckWidth}
      flexShrink="0"
      bgcolor="background.default"
      sx={{
        gridArea: 'deck',
        borderLeftWidth: 0.5,
        borderLeftColor: 'divider',
        borderLeftStyle: 'solid'
      }}>
    </Box>
  )
}
