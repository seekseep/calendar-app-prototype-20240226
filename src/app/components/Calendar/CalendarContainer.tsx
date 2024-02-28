'use client'

import { PropsWithChildren } from "react";
import { Box } from '@mui/material'
import { useDeckWidth } from "./theme/hooks";

export default function CalendarContainer ({
  children
}: PropsWithChildren) {
  const deckWidth = useDeckWidth()
  return (
    <Box
      display="grid"
      width="100%" height="100%"
      sx={{
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: `1fr ${deckWidth}px`,
        gridTemplateAreas: `"toolbar deck" "content deck"`
      }}>
      {children}
    </Box>
  )
}
