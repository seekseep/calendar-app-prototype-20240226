import { ReactNode, useMemo, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Popover, IconButton, PopoverProps, Stack, Box, Typography, List, ListItem, ListItemButton, ListItemText, ButtonBase } from '@mui/material'
import { format, getDate, getDay, startOfMonth } from 'date-fns'
import { ja as locale } from 'date-fns/locale/ja'

import CalendarScheduleColorMenu from './CalenarScheduleColorMenu'
import CalendarScheduleColorCircle from './CalendarScheduleColorCircle'
import { useCalendar } from './hooks'

import { Account, Schedule } from '@/app/types'

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

export default function CalendarScheduleMenu ({ schedule, ...props }: CalendarScheduleMenuProps) {
  const { updateSchedule, startToDeleteSchedule, startToEditSchedule, accounts } = useCalendar()
  const weekNumber = Math.ceil(
    (getDay(startOfMonth(schedule.startedAt)) + getDate(schedule.startedAt)) / 7
  )

  const date = format(schedule.startedAt, 'M月d日 (EEEEE)', { locale })
  const dateLabel = format(schedule.startedAt, `yyyy年MM月${weekNumber}週（EEEEE）`, { locale })
  const startTime = format(schedule.startedAt, 'HH:mm')
  const endTime = format(schedule.finishedAt, 'HH:mm')

  const { students, teachers } = useMemo(() => {
    const accountById = accounts.reduce((acc, account) => {
      acc[account.id] = account
      return acc
    }, {} as Record<string, Account>)
    return {
      students: schedule.studentIds.map(id => accountById[id]),
      teachers: schedule.teacherIds.map(id => accountById[id]),
    }
  }, [accounts, schedule.studentIds, schedule.teacherIds])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <Popover {...props}>
      <Box width={350}>
        <Stack direction="row" justifyContent="end" px={1} py={0.5} gap={0.5}>
          <IconButton onClick={() => {
            startToDeleteSchedule(schedule)
            props.close()
          }}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => {
            startToEditSchedule(schedule)
            props.close()
          }}>
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
                <CalendarScheduleColorCircle size="1.5rem" color={schedule.color} />
              </ButtonBase>
              <CalendarScheduleColorMenu
                open={!!anchorEl} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}
                onColorSelect={(color) => {
                  updateSchedule({ ...schedule, color })
                  setAnchorEl(null)
                }} />
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
            <PropertyRow label="講師" value={teachers.map(account => account.name).join('\n')} />
            <PropertyRow label="生徒" value={students.map(account => account.name).join('\n')} />
            <PropertyRow label="登録番号" value={schedule.createId} />
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
            <PropertyRow label="備考" value={schedule.note} />
          </Stack>
        </Box>
      </Box>
    </Popover>
  )
}
