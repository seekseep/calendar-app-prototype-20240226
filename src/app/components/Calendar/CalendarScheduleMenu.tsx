import { ReactNode, useMemo, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Grid, Menu, Popover, IconButton, PopoverProps, Stack, Box, Typography, List, ListItem, ListItemButton, ListItemText, ButtonBase } from '@mui/material'
import * as colors from '@mui/material/colors'
import { format, getDate, getDay, startOfMonth } from 'date-fns'
import { ja as locale } from 'date-fns/locale/ja'

import { useCalendar } from './hooks'

import { Schedule } from '@/app/types'

interface CalendarScheduleMenuProps extends PopoverProps {
  close: () => any
  schedule: Schedule
}

function PropertyRow ({
  label, value
}: {
  label: ReactNode
  value: ReactNode
}) {
  return (
    <Stack direction="row" gap={2}>
      <Box width={80} flexShrink={0}>
        <Typography variant="body2">{label}</Typography>
      </Box>
      <Box flexGrow={1}>
        <Typography
          variant="body2"
          whiteSpace="pre"
          sx={{
            textWrap: 'wrap'
          }}>
          {value}
        </Typography>
      </Box>
    </Stack>
  )
}

function ColorCircle ({ color, size } : { size: string, color: string }) {
  return (
    <Box sx={{
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: 'divider',
      backgroundColor: color,
      borderRadius: '50%',
      width: size,
      height: size,
    }} />
  )
}

export default function CalendarScheduleMenu ({ schedule, ...props }: CalendarScheduleMenuProps) {
  try {
    const { updateSchedule, openSchedule, deleteSchedule } = useCalendar()
    const weekNumber = Math.ceil(
      (getDay(startOfMonth(schedule.startedAt)) + getDate(schedule.startedAt)) / 7
    )

    const date = format(schedule.startedAt, 'M月d日 (EEEEE)', { locale })
    const dateLabel = format(schedule.startedAt, `yyyy年MM月${weekNumber}週（EEEEE）`, { locale })
    const startTime = format(schedule.startedAt, 'HH:mm')
    const endTime = format(schedule.finishedAt, 'HH:mm')

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const scheduleColors = useMemo(() => {
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
      <Popover {...props}>
        <Box width={350}>
          <Stack direction="row" justifyContent="end" px={1} py={0.5} gap={0.5}>
            <IconButton onClick={() => deleteSchedule(schedule)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => openSchedule(schedule)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={props.close}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box px={2}>
            <Stack direction="column" gap={0.5}>
              <Stack direction="row" spacing={1}>
                <ButtonBase
                  onClick={(event) => setAnchorEl(event.target as HTMLElement)}
                  sx={{
                    width: '2rem',
                    height: '2rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                  }}>
                  <ColorCircle size="1.5rem" color={schedule.color} />
                </ButtonBase>
                <Menu open={!!anchorEl} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
                  <Grid container sx={{ width: 200}}>
                    {scheduleColors.map(color => (
                      <Grid key={color} item xs={2}>
                        <IconButton onClick={() => {
                          updateSchedule({
                            ...schedule,
                            color: color,
                          })
                          setAnchorEl(null)
                        }}>
                          <ColorCircle size="1rem" color={color} />
                        </IconButton>
                      </Grid>
                    ))}
                  </Grid>
                </Menu>
                <Typography variant="h6" sx={{ flexGrow:1 }}>
                  {schedule.label}
                </Typography>
              </Stack>
              <Stack direction="row" gap={0.5}>
                <Typography variant="body2">{schedule.subject}</Typography>
                <Typography variant="body2">{schedule.format}</Typography>
              </Stack>
              <Stack direction="row" gap={0.5}>
                <Typography variant="body1">{date}</Typography>
                <Typography>・</Typography>
                <Typography variant="body1">{startTime} - {endTime}</Typography>
              </Stack>
              <Typography variant="caption">{dateLabel}</Typography>
            </Stack>
            <Stack py={3} gap={1}>
              <PropertyRow label="講師" value="西壁花子" />
              <PropertyRow label="生徒" value={"木下藤吉郎\n本間勇輔"} />
              <PropertyRow label="登録番号" value="XXXXXXXXXX" />
              <PropertyRow label="問題" value={
                <List dense disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="問題 1" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="問題 2" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="問題 3" />
                    </ListItemButton>
                  </ListItem>
                </List>
              } />
              <PropertyRow label="備考" value="この備考はメモです。サンプルとしてどのように表示されるかを確認するためのものであり編集することはできません。" />
            </Stack>
          </Box>
        </Box>
      </Popover>
    )
  } catch (error: any) {
    console.log(schedule)
    throw error
  }
}
