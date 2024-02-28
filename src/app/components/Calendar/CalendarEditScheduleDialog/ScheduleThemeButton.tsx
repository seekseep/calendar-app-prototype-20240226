import CalendarSchedule from "../CalendarSchedule"
import { useCalendarTheme } from "../theme/hooks"

import { ScheduleTheme } from "./types"

export default function ScheduleThemeButton ({
  value: theme,
  onClick,
}: {
  value: ScheduleTheme
  onClick: (theme: ScheduleTheme) => any
}) {
  const { scheduleHeight } = useCalendarTheme()
  return (
    <CalendarSchedule
      onClick={() => onClick(theme)}
      schedule={{
        label: 'サンプルテキスト',
        color: theme.color,
        borderColor: theme.borderColor,
        backgroundColor: theme.backgroundColor,
        errorIcon: theme.errorIcon
      }}
      sx={{
        height: scheduleHeight,
      }} />
  )
}
