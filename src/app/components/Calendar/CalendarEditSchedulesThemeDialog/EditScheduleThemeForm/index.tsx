import {
  DialogActions,
  Button,
  Box,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material"
import { useForm } from "react-hook-form"

import ScheduleThemeButton from "./ScheduleThemeButton"
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
      borderColor: schedule.borderColor ?? '',
      backgroundColor: schedule.backgroundColor ?? '',
      errorIcon: schedule.errorIcon ? 1 : 0,
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
          borderColor: values.borderColor,
          backgroundColor: values.backgroundColor,
          errorIcon: values.errorIcon === 1 ? true : false,
        })
      })}>
      <Accordion defaultExpanded variant="outlined">
        <AccordionSummary>
          テーマ
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" gap={2} mb={2}>
            <TextField fullWidth label="色" value={methods.watch('color')} {...methods.register('color')} type="color" />
            <TextField fullWidth label="枠色" value={methods.watch('borderColor')} {...methods.register('borderColor')} type="color" />
            <TextField fullWidth label="背景色" value={methods.watch('backgroundColor')} {...methods.register('backgroundColor')} type="color" />
            <FormControl fullWidth>
                <InputLabel id="status-select-label">エラーアイコン</InputLabel>
                <Select
                  id="status-select"
                  labelId="status-select-label"
                  value={methods.watch('errorIcon')}
                  {...methods.register('errorIcon')}
                  label="エラーアイコン">
                  <MenuItem value={1}>あり</MenuItem>
                  <MenuItem value={0}>なし</MenuItem>
                </Select>
              </FormControl>
          </Stack>
          <Grid container spacing={2}>
            {scheduleThemes.map((theme, index) => (
              <Grid key={index} item xs={2}>
                <ScheduleThemeButton
                  value={theme}
                  onClick={(theme) => {
                    methods.setValue('color', theme.color)
                    methods.setValue('borderColor', theme.borderColor)
                    methods.setValue('backgroundColor', theme.backgroundColor)
                    methods.setValue('errorIcon', theme.errorIcon ? 1 : 0)
                  }} />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <DialogActions>
        <Button onClick={() => onCancel()}>閉じる</Button>
        <Button type="submit">保存する</Button>
      </DialogActions>
    </Box>
  )
}
