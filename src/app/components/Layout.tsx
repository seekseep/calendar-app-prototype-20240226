'use client'

import { PropsWithChildren } from "react";
import { AppBar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Star } from '@mui/icons-material'

const drawerWidth = 240

export default function Layout ({
  children
}: PropsWithChildren) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100svh"
      width="100%">
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        variant="outlined">
        <Toolbar>
          <Typography variant="h6">
            プロトタイプ
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        display="flex" flexDirection="row"
        flexGrow={1}>
        <Box
          width={drawerWidth}
          flexShrink={0}
          sx={{
            borderRightColor: 'divider',
            borderRightWidth: 0.5,
            borderRightStyle: 'solid'
          }}>
            <List>
              {Array.from({ length: 10 }).fill(null).map((_, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Star />
                    </ListItemIcon>
                    <ListItemText primary={`機能 ${i+1}`} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
        </Box>
        <Box height="100%" flexGrow={1} position="relative">
          <Box
            position="absolute"
            top={0} left={0} right={0} bottom={0}
            overflow="auto">
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
