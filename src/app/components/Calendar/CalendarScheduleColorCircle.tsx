import Box from '@mui/material/Box'

export default function CalendarScheduleColorCircle ({
  color, size
} : {
  size: string
  color: string
}) {
  return (
    <Box sx={{
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: 'divider',
      backgroundColor: color,
      borderRadius: '50%',
      width: size,
      height: size,
    }} />
  )
}
