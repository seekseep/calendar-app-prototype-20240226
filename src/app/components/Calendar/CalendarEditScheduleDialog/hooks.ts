import { useTheme } from "@mui/material"
import { useMemo } from "react"
import { ScheduleTheme } from "./types"

function convertToHex(color: string): string {
  if (color.startsWith('#') && color.length === 4) {
    return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
  }

  if (color.startsWith('rgb')) {
    const rgb = color.match(/\d+/g)?.map(Number); // 数字の部分を抽出して配列に変換
    if (rgb && rgb.length === 3) {
      return '#' + rgb.map((n) => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex; // 1桁の場合は0を足して2桁にする
      }).join('');
    }
  }

  if (color.startsWith('#') && color.length === 7) return color;
  throw new Error('Invalid color format');
}

export function useScheduleThemes () {
  const theme = useTheme()

  return useMemo((): ScheduleTheme[] => {
    return [
      {
        color: theme.palette.primary.contrastText,
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.main,
        errorIcon: false
      },
      {
        color: theme.palette.secondary.contrastText,
        borderColor: theme.palette.secondary.dark,
        backgroundColor: theme.palette.secondary.main,
        errorIcon: false
      },
      {
        color: theme.palette.error.contrastText,
        borderColor: theme.palette.error.dark,
        backgroundColor: theme.palette.error.main,
        errorIcon: false
      },
      {
        color: theme.palette.warning.contrastText,
        borderColor: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.main,
        errorIcon: false
      },
      {
        color: theme.palette.info.contrastText,
        borderColor: theme.palette.info.dark,
        backgroundColor: theme.palette.info.main,
        errorIcon: false
      },
      {
        color: theme.palette.success.contrastText,
        borderColor: theme.palette.success.dark,
        backgroundColor: theme.palette.success.main,
        errorIcon: false
      },
      {
        color: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.common.white,
        errorIcon: false
      },
      {
        color: theme.palette.secondary.dark,
        borderColor: theme.palette.secondary.dark,
        backgroundColor: theme.palette.common.white,
        errorIcon: false
      },
      {
        color: theme.palette.error.dark,
        borderColor: theme.palette.error.dark,
        backgroundColor: theme.palette.common.white,
        errorIcon: false
      },
      {
        color: theme.palette.warning.dark,
        borderColor: theme.palette.warning.dark,
        backgroundColor: theme.palette.common.white,
        errorIcon: false
      },
      {
        color: theme.palette.info.dark,
        borderColor: theme.palette.info.dark,
        backgroundColor: theme.palette.common.white,
        errorIcon: false
      },
      {
        color: theme.palette.success.dark,
        borderColor: theme.palette.success.dark,
        backgroundColor: theme.palette.common.white,
        errorIcon: false
      },
      {
        color: theme.palette.common.black,
        borderColor: theme.palette.common.black,
        backgroundColor: theme.palette.common.white,
        errorIcon: false
      }
    ].map((theme) => ({
      ...theme,
      backgroundColor: convertToHex(theme.backgroundColor),
      borderColor: convertToHex(theme.borderColor),
      color: convertToHex(theme.color),
    }))
  }, [theme.palette.common.black, theme.palette.common.white, theme.palette.error.contrastText, theme.palette.error.dark, theme.palette.error.main, theme.palette.info.contrastText, theme.palette.info.dark, theme.palette.info.main, theme.palette.primary.contrastText, theme.palette.primary.dark, theme.palette.primary.main, theme.palette.secondary.contrastText, theme.palette.secondary.dark, theme.palette.secondary.main, theme.palette.success.contrastText, theme.palette.success.dark, theme.palette.success.main, theme.palette.warning.contrastText, theme.palette.warning.dark, theme.palette.warning.main])
}
