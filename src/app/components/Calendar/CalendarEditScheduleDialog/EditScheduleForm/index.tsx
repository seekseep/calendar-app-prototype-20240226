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
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material"
import { format } from "date-fns"
import { useForm } from "react-hook-form"

import { FormValues } from "./types"

import { getScehduelStatusOrThrow } from "@/app/model/utilities"
import { Schedule } from "@/app/types"

export default function EditScheduelForm ({
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
      label: schedule?.label ?? '',
      startedDate: schedule.startedAt ? format(schedule.startedAt, 'yyyy-MM-dd') : '',
      startedTime: schedule.startedAt ? format(schedule.startedAt, 'HH:mm') : '',
      finishedTime: schedule.finishedAt ? format(schedule.finishedAt, 'HH:mm') : '',
      color: schedule.color ?? '',
      hasProblems: schedule.hasProblems ? '1' : '0',
      row: typeof schedule.row == 'number' ? schedule.row.toString() : '0',
      status: schedule.status ?? "NORMAL"
    }
  })

  return (
    <Box
      component="form"
      padding={2}
      onSubmit={methods.handleSubmit(values => {
        onSubmit({
          label: values.label,
          startedAt: new Date(`${values.startedDate} ${values.startedTime}`).toISOString(),
          finishedAt: new Date(`${values.startedDate} ${values.finishedTime}`).toISOString(),
          color: values.color,
          hasProblems: values.hasProblems == '1' ? true : false,
          row: +values.row,
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
            <FormControl fullWidth>
              <InputLabel id="status-select-label">問題の有無</InputLabel>
              <Select
                id="status-select"
                labelId="status-select-label"
                value={methods.watch('hasProblems')}
                {...methods.register('hasProblems')}
                label="問題">
                <MenuItem value="1">あり</MenuItem>
                <MenuItem value="0">なし</MenuItem>
              </Select>
            </FormControl>
          </Stack>
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
              <FormControl fullWidth>
                <InputLabel id="status-select-label">状態</InputLabel>
                <Select
                  id="status-select"
                  labelId="status-select-label"
                  value={methods.watch('status')}
                  {...methods.register('status')}
                  label="状態">
                  <MenuItem value={"NORMAL"}>通常</MenuItem>
                  <MenuItem value={"CANCELED"}>振替待ち</MenuItem>
                </Select>
              </FormControl>
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
