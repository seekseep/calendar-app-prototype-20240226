import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { v4 as uuid } from "uuid"

import { useCalendar } from "./hooks"

import { DailyNote } from "@/app/types"

function CalendarEditDailyNoteTagForm ({
  dailyNote,
  onClose,
  onSubmit
}: {
  dailyNote: Partial<Pick<DailyNote, 'id'>> & Omit<DailyNote, 'id'>
  onClose: () => void
  onSubmit: (dailyNote: Partial<Pick<DailyNote, 'id'>> & Omit<DailyNote, 'id'>) => void
}) {
  const methods = useForm<{ tag: string }>({
    defaultValues: {
      tag: dailyNote.tag ?? ''
    }
  })
  return (
    <Box
      component="form"
      onSubmit={methods.handleSubmit(values => {
        onSubmit({
          ...dailyNote,
          tag: values.tag
        })
      })}>
      <Box p={2}>
        <TextField
          label="タグ"
          fullWidth
          {...methods.register('tag')} />
      </Box>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button type="submit">保存</Button>
      </DialogActions>
    </Box>
  )
}

export default function CalendarEditDailyNoteTagDialog () {
  const {
    dailyNoteToEditTag,
    updateDailyNote,
    createDailyNote,
    finishToEditDailyNoteTag
  } = useCalendar()

  return (
    <Dialog
      maxWidth="xs" fullWidth
      open={!!dailyNoteToEditTag}
      onClose={finishToEditDailyNoteTag}>
      <DialogTitle>タグの追加</DialogTitle>
      {dailyNoteToEditTag && (
        <CalendarEditDailyNoteTagForm
          dailyNote={dailyNoteToEditTag}
          onClose={finishToEditDailyNoteTag}
          onSubmit={(dailyNote) => {
            if (dailyNote.id) {
              updateDailyNote({
                id: dailyNote.id,
                ...dailyNote
              })
            } else {
              createDailyNote({
                id: uuid(),
                ...dailyNote
              })
            }
            finishToEditDailyNoteTag()
          }} />
      )}
    </Dialog>
  )
}
