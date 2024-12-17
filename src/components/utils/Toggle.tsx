import { useState } from "react"
import "./toggle.css"

export function Toggle({ value, setValue }: {
  value: boolean
  setValue: (v: boolean) => void
}) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked)
  }
  return (
    <label className="toggle-button-1">
      <input type="checkbox" checked={value} onChange={onChange} />
    </label>
  )
}


export function useToggle() {
  const [value, setValue] = useState(false)
  const component = <Toggle value={value} setValue={setValue} />
  return { value, toggle: component, setValue }
}