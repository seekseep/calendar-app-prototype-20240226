import { useMemo } from 'react'

import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Menu, { MenuProps } from "@mui/material/Menu"
import * as colors from '@mui/material/colors'

import CalendarScheduleColorCircle from "./CalendarScheduleColorCircle"

interface CalendarScheduleColorMenuProps extends MenuProps {
  onColorSelect: (color: string) => any
}

export default function CalendarScheduleColorMenu ({
  onColorSelect,
  ...props
}: CalendarScheduleColorMenuProps) {
  const colorOptions = useMemo(() => {
    return [
      colors.grey[100].toString(),
      colors.amber[500].toString(),
      colors.blue[500].toString(),
      colors.blueGrey[500].toString(),
      colors.brown[500].toString(),
      colors.cyan[500].toString(),
      colors.deepOrange[500].toString(),
      colors.deepPurple[500].toString(),
      colors.green[500].toString(),
      colors.indigo[500].toString(),
      colors.lightBlue[500].toString(),
      colors.lightGreen[500].toString(),
      colors.lime[500].toString(),
      colors.orange[500].toString(),
      colors.pink[500].toString(),
      colors.purple[500].toString(),
      colors.red[500].toString(),
      colors.teal[500].toString(),
      colors.yellow[500].toString(),
    ]
  }, [])

  return (
    <Menu {...props}>
      <Grid container sx={{ width: 200}}>
        {colorOptions.map(color => (
          <Grid key={color} item xs={2}>
            <IconButton onClick={() => onColorSelect(color)}>
              <CalendarScheduleColorCircle size="1rem" color={color} />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </Menu>
  )
}
