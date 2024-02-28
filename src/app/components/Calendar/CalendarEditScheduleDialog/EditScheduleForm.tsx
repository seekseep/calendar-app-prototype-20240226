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
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";

import { Schedule } from "@/app/types";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { getScehduelStatusOrThrow } from "@/app/model/utilities";
import { useMemo } from "react";
import { FormValues, ScheduleTheme } from "./types";
import { useScheduleThemes } from "./hooks";
import ScheduleThemeButton from "./ScheduleThemeButton";

const statusFieldHidden = true

export default function EditScheduelForm ({
  schedule,
  onCancel,
  onSubmit
}: {
  schedule: Schedule
  onCancel: () => any
  onSubmit: (schedule: Schedule) => any
}) {
  const methods = useForm<FormValues>({
    defaultValues: {
      label: schedule.label,
      startedDate: format(schedule.startedAt, 'yyyy-MM-dd'),
      startedTime: format(schedule.startedAt, 'HH:mm'),
      finishedTime: format(schedule.finishedAt, 'HH:mm'),
      color: schedule.color,
      borderColor: schedule.borderColor,
      backgroundColor: schedule.backgroundColor,
      errorIcon: schedule.errorIcon ? 1 : 0,
      row: schedule.row,
      status: schedule.status
    }
  })

  const scheduleThemes = useScheduleThemes()

  return (
    <Box
      component="form"
      padding={2}
      onSubmit={methods.handleSubmit(values => {
        onSubmit({
          accountId: schedule.accountId,
          id: schedule.id,
          label: values.label,
          startedAt: new Date(`${values.startedDate} ${values.startedTime}`).toISOString(),
          finishedAt: new Date(`${values.startedDate} ${values.finishedTime}`).toISOString(),
          color: values.color,
          borderColor: values.borderColor,
          backgroundColor: values.backgroundColor,
          errorIcon: values.errorIcon === 1 ? true : false,
          row: values.row,
          status: getScehduelStatusOrThrow(schedule.status),
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
      <Accordion variant="outlined">
        <AccordionSummary>
          詳細
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column" gap={3}>
            <Stack direction="row" gap={2}>
              <TextField fullWidth label="表示名" {...methods.register('label')} />
              {!statusFieldHidden && (
                <FormControl fullWidth>
                  <InputLabel id="status-select-label">状態</InputLabel>
                  <Select
                    id="status-select"
                    labelId="status-select-label"
                    value={methods.watch('status')}
                    {...methods.register('status')}
                    label="状態">
                    <MenuItem value={"NORMAL"}>通常</MenuItem>
                    <MenuItem value={"ERROR"}>エラー</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Stack>
            <Stack direction="row" gap={2}>
              <TextField fullWidth label="日付" {...methods.register('startedDate')} type="date" />
              <TextField fullWidth label="行" {...methods.register('row')} type="number" />
              <TextField fullWidth label="開始" {...methods.register('startedTime')} type="time" />
              <TextField fullWidth label="終了" {...methods.register('finishedTime')} type="time" />
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <DialogActions>
        <Button onClick={() => onCancel()}>閉じる</Button>
        <Button type="submit">保存する</Button>
      </DialogActions>
    </Box>
  )
}
