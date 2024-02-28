import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { v4 as uuid } from "uuid"

import { useCalendar } from "./hooks"
import { DailyNoteDraft } from "./types"

function CalendarEditDailyNoteTagForm ({
  dailyNote,
  onClose,
  onSubmit
}: {
  dailyNote: DailyNoteDraft
  onClose: () => void
  onSubmit: (dailyNote: DailyNoteDraft) => void
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
  const { dailyNoteToEditTag, closeDailyNoteTag, updateDailyNote, createDailyNote } = useCalendar()

  return (
    <Dialog
      maxWidth="xs" fullWidth
      open={!!dailyNoteToEditTag}
      onClose={closeDailyNoteTag}>
      <DialogTitle>タグの追加</DialogTitle>
      {dailyNoteToEditTag && (
        <CalendarEditDailyNoteTagForm
          dailyNote={dailyNoteToEditTag}
          onClose={closeDailyNoteTag}
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

            closeDailyNoteTag()
          }} />
      )}
    </Dialog>
  )
}
