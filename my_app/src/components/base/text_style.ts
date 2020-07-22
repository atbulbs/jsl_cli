/**
 * @description 字体样式
 */

declare type TextConfig = {
  color?: string
  fontSize?: number
  fontFamily?: string
}

export default function TextStyle (obj: TextConfig): TextConfig {
  return obj
}