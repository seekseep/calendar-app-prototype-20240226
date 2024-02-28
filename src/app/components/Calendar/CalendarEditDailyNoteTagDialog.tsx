import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { useCalendar } from "./hooks";
import { useForm } from "react-hook-form";
import { DailyNote } from "@/app/types";

function CalendarEditDailyNoteTagForm ({
  dailyNote,
  onClose,
  onSubmit
}: {
  dailyNote: DailyNote
  onClose: () => void
  onSubmit: (dailyNote: DailyNote) => void
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
  const { dailyNoteToEditTag, closeDailyNoteTag, updateDailyNote  } = useCalendar()

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
            updateDailyNote(dailyNote)
            closeDailyNoteTag()
          }} />
      )}
    </Dialog>
  )
}
