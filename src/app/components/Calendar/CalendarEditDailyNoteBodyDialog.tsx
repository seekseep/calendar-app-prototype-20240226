import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { v4 as uuid } from "uuid"

import { useCalendar } from "./hooks"

import { DailyNote } from "@/app/types"

function CalendarEditDailyNoteBodyForm ({
  dailyNote,
  onClose,
  onSubmit
}: {
  dailyNote: Partial<Pick<DailyNote, 'id'>> & Omit<DailyNote, 'id'>
  onClose: () => void
  onSubmit: (dailyNote: Partial<Pick<DailyNote, 'id'>> & Omit<DailyNote, 'id'>) => void
}) {
  const methods = useForm<{ body: string }>({
    defaultValues: {
      body: dailyNote.body ?? ''
    }
  })
  return (
    <Box
      component="form"
      onSubmit={methods.handleSubmit(values => {
        onSubmit({
          ...dailyNote,
          body: values.body
        })
      })}>
      <Box p={2}>
        <TextField
          multiline
          rows={10} fullWidth
          label="内容" {...methods.register('body')} />
      </Box>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button type="submit">保存</Button>
      </DialogActions>
    </Box>
  )
}

export default function CalednarEditDailyNoteBodyDialog () {
  const { dailyNoteToEditBody, closeDailyNoteBody, updateDailyNote, createDailyNote } = useCalendar()

  return (
    <Dialog
      maxWidth="sm" fullWidth
      open={!!dailyNoteToEditBody}
      onClose={closeDailyNoteBody}>
      <DialogTitle>メモの編集</DialogTitle>
      {dailyNoteToEditBody && (
        <CalendarEditDailyNoteBodyForm
          dailyNote={dailyNoteToEditBody}
          onClose={closeDailyNoteBody}
          onSubmit={(dailyNote) => {
            const id = dailyNote.id
            if (typeof id == 'string') {
              updateDailyNote({
                id,
                ...dailyNote
              })
            } else {
              createDailyNote({
                id: uuid(),
                ...dailyNote
              })
            }
            closeDailyNoteBody()
          }} />
      )}
    </Dialog>
  )
}
