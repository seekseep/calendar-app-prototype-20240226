import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Button, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material"

import CalendarScheduleColorMenu from '../CalenarScheduleColorMenu'
import { useCalendar } from "../hooks"

export default function ToolbarSelectionContents () {
  const {
    selectedSchedules,
    clearSelectedSchedules,
    selectAllSchedules,
    startToEditSchedules,
    startToDeleteSchedules,
    bulkUpdateSchedules,
  } = useCalendar()

  const selectedSchedulesCount = selectedSchedules.length

  const [editMenuAnchorEle, setEditMenuAnchorEle] = useState<null | HTMLElement>(null)
  const [colorMenuAnchorEle, setColorMenuAnchorEle] = useState<null | HTMLElement>(null)

  return (
    <Stack direction="row" gap={2} alignItems="center">
      <Tooltip title="選択を解除する">
        <IconButton onClick={clearSelectedSchedules}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <Typography>{selectedSchedulesCount} 件選択中</Typography>
      <Button size="small" onClick={selectAllSchedules}>
        すべてを選択する
      </Button>
      <Stack direction="row" gap={1}>
        <Tooltip title="編集する">
          <IconButton onClick={(event) => {
            setEditMenuAnchorEle(event.currentTarget)
          }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ width: 200 }}
          open={!!editMenuAnchorEle} anchorEl={editMenuAnchorEle} onClose={() => setEditMenuAnchorEle(null)}>
          <MenuItem dense onClick={() => startToEditSchedules(selectedSchedules, 'BASIC')}>基本</MenuItem>
          <MenuItem dense onClick={() => startToEditSchedules(selectedSchedules, 'DATE')}>日付</MenuItem>
          <MenuItem dense onClick={() => startToEditSchedules(selectedSchedules, 'SUBJECT')}>科目</MenuItem>
          <MenuItem dense onClick={() => startToEditSchedules(selectedSchedules, 'STUDENTS')}>生徒</MenuItem>
          <MenuItem dense onClick={() => startToEditSchedules(selectedSchedules, 'TEACHERS')}>講師</MenuItem>
        </Menu>
        <Tooltip title="色を変える">
          <IconButton onClick={(event) => setColorMenuAnchorEle(event.currentTarget)}>
            <ColorLensIcon />
          </IconButton>
        </Tooltip>
        <CalendarScheduleColorMenu
          open={!!colorMenuAnchorEle} anchorEl={colorMenuAnchorEle} onClose={() => setColorMenuAnchorEle(null)}
          onColorSelect={(color) => {
            bulkUpdateSchedules(
              selectedSchedules.map(({ id }) => ({ id, color }))
            )
            setColorMenuAnchorEle(null)
          }} />
        <Tooltip title="削除する">
          <IconButton onClick={() => {
            startToDeleteSchedules(selectedSchedules)
            clearSelectedSchedules()
          }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  )
}
