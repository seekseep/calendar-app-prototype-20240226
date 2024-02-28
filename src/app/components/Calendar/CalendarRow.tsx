import { CSSProperties } from "react"

import CalendarRowGroup from "./CalendarRowGroup"
import CalendarScheduleRowGroup from "./CalendarScheduleRowGroup"
import { CalendaRowPayload } from "./types"

export default function CalendarRow ({
  row,
  depth = 0,
  style
}: {
  depth?: number
  row: CalendaRowPayload
  style?: CSSProperties
}) {
  if (row.type === 'schedule') {
    return (
      <CalendarScheduleRowGroup
        depth={depth}
        row={row}
        style={style} />
    )
  } else {
    return (
      <CalendarRowGroup
        depth={depth}
        row={row}
        style={style} />
    )
  }
}
