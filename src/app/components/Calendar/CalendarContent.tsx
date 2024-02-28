'use client'

import { HTMLAttributes, forwardRef, useEffect, useRef, useState } from "react"

import { Box } from "@mui/material"
import { VariableSizeList } from 'react-window'

import CaelndarRow from "./CalendarRow"
import CalendarTimeRuler from "./CalendarTimeRuler"
import { useCalendar } from "./hooks"
import { useCalendarTheme } from "./theme/hooks"
import { CalendaRowPayload } from "./types"

const ListInner = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ListInner ({ children, ...props}, ref) {
    return (
      <div ref={ref} {...props}>
        <CalendarTimeRuler />
        {children}
      </div>
    )
  }
)

export default function CalendarContent () {
  const [scrollOffset, setScrollOffset] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const listInnerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 })
  const { rowsUpdatedAt, rows } = useCalendar()
  const { scheduleRowHeight, hourHeight } = useCalendarTheme()

  useEffect(() => {
    const container = containerRef.current
    if (!container) throw Error('container is not found')

    const changeSizeEventNames = ['resize']

    const changeSize = () => {
      const width = container.clientWidth || 0
      const height = container.clientHeight || 0
      setSize({ width, height })
    }

    changeSize()
    changeSizeEventNames.forEach(eventName => window.addEventListener(eventName, changeSize))
    return () => {
      changeSizeEventNames.forEach(eventName => window.removeEventListener(eventName, changeSize))
    }
  }, [])
  const key = `${rowsUpdatedAt}_${size.width}x${size.height}`

  return (
    <Box sx={{ gridArea: 'content' }} position="relative" overflow="hidden">
      <Box
        ref={containerRef} position="absolute"
        top="0" left="0" width="100%" height="100%">
        <VariableSizeList<CalendaRowPayload[]>
          key={key}
          initialScrollOffset={scrollOffset}
          onScroll={({ scrollOffset }) => setScrollOffset(scrollOffset)}
          height={size.height}
          width={size.width}
          itemData={rows}
          itemCount={rows.length}
          innerRef={listInnerRef}
          innerElementType={ListInner}
          itemSize={index => rows[index].rowCount * scheduleRowHeight}>
          {({
            data, index, style
          }: {
            data: CalendaRowPayload[]
            index: number
            style: Record<string, any>
          }) => (
            <CaelndarRow
              key={index}
              row={data[index]}
              style={{
                ...style,
                top: (style.top as number) + hourHeight,
              }} />
          )}
        </VariableSizeList>
      </Box>
    </Box>
  )
}
