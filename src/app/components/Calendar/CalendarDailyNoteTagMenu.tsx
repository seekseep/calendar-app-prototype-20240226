import { Menu, MenuItem, Divider } from '@mui/material'
import { v4 as uuid } from 'uuid'

import { useCalendar } from './hooks'

export default function CalendarDailyNoteTagMenu () {
  const {
    tags, tagMenu,
    closeTagMenu,
    updateDailyNote, createDailyNote, startToEditDailyNoteTag,
  } = useCalendar()

  if (!tagMenu) return null
  const { anchorEle, dailyNote } = tagMenu

  function updateTag (tag: string) {
    if (dailyNote.id) {
      updateDailyNote({ ...dailyNote, tag })
    } else {
      createDailyNote({ ...dailyNote, tag, id: uuid() })
    }
    closeTagMenu()
  }

  return (
    <Menu
      open
      onClose={closeTagMenu}
      anchorEl={anchorEle}>
      {tags.map((tag) => (
        <MenuItem
        key={tag}
        onClick={() => updateTag(tag)}>
        {tag}
      </MenuItem>
    ))}
    <Divider />
    <MenuItem onClick={() => updateTag('')}>
      削除する
    </MenuItem>
    <MenuItem onClick={() => {
      startToEditDailyNoteTag(dailyNote)
      closeTagMenu()
    }}>
      新しく作る
    </MenuItem>
  </Menu>
  )
}
