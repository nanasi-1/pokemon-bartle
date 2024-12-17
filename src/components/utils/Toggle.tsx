import { useState } from "react"
import "./toggle.css"

export function Toggle({ value, onChange }: {
  value: boolean
  onChange: (v: boolean) => void
}) {
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }
  return (
    <label className="toggle-button-1">
      <input type="checkbox" checked={value} onChange={_onChange} />
    </label>
  )
}


export function useToggle({ onChange }: {
  onChange?: (v: boolean) => void
} = {}) {
  const [value, setValue] = useState(false)

  const _onChange = (v: boolean) => {
    setValue(v)
    onChange?.(v)
  }

  const component = <Toggle value={value} onChange={_onChange} />
  return { value, toggle: component, setValue }
}