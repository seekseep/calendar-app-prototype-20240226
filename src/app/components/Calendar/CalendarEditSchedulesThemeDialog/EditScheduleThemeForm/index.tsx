import {
  DialogActions,
  Button,
  Box,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material"
import { useForm } from "react-hook-form"

import { useScheduleThemes } from "./hooks"
import { FormValues } from "./types"

import { Schedule } from "@/app/types"

export default function EditScheduleThemeForm ({
  schedule,
  onCancel,
  onSubmit
}: {
  schedule: Partial<Schedule>
  onCancel: () => any
  onSubmit: (schedule: Partial<Schedule>) => any
}) {
  const methods = useForm<FormValues>({
    defaultValues: {
      color: schedule.color ?? '',
    }
  })

  const scheduleThemes = useScheduleThemes()

  return (
    <Box
      component="form"
      padding={2}
      onSubmit={methods.handleSubmit(values => {
        onSubmit({
          color: values.color,
        })
      })}>
      <Accordion defaultExpanded variant="outlined">
        <AccordionSummary>
          テーマ
        </AccordionSummary>
        <AccordionDetails>
          <TextField fullWidth label="色" value={methods.watch('color')} {...methods.register('color')} type="color" />
        </AccordionDetails>
      </Accordion>
      <DialogActions>
        <Button onClick={() => onCancel()}>閉じる</Button>
        <Button type="submit">保存する</Button>
      </DialogActions>
    </Box>
  )
}
