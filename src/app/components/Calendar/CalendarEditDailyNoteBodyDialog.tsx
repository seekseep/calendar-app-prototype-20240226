import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { useCalendar } from "./hooks";
import { useForm } from "react-hook-form";
import { DailyNote } from "@/app/types";

function CalendarEditDailyNoteBodyForm ({
  dailyNote,
  onClose,
  onSubmit
}: {
  dailyNote: DailyNote
  onClose: () => void
  onSubmit: (dailyNote: DailyNote) => void
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
  const { dailyNoteToEditBody, closeDailyNoteBody, updateDailyNote  } = useCalendar()

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
            updateDailyNote(dailyNote)
            closeDailyNoteBody()
          }} />
      )}
    </Dialog>
  )
}
