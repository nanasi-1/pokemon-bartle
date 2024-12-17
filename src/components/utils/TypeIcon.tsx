import { type PokemonType } from "../../features/type-compatibility";
import { POKEMON_TYPES, getTypeByName } from "../../features/type-compatibility";
import './type-icon.css'

interface TypeIconProps { 
  name: PokemonType['name'], 
  width?: number 
}

// NOTE アイコン画像ではなく色を使用
export function TypeIconImg({ name, width }: TypeIconProps) {
  return (
    <div className="type-icon-img">
      <div className={`image size-${width ?? 65} color-${name}`} />
      <span className="text">{getTypeByName(name).localizedName}</span>
    </div>
  )
}

export function TypeIconInput({ name, width, checked, onChange }: TypeIconProps & {
  onChange?: (e: React.MouseEvent) => void
  checked: boolean
}) {
  return (
    <button onClick={onChange} className={`type-icon-button ${checked ? 'checked' : ''}`}>
      <TypeIconImg name={name} width={width} />
    </button>
  )
}

export type OnInputChange = (typeName: PokemonType['name'], event: React.MouseEvent) => void

export default function TypeIcons({ onInputChange }: {
  onInputChange?: OnInputChange
}) {
  const buttons = POKEMON_TYPES.map(t => t.name)
    .map(name => {
      const onChange = (e: React.MouseEvent) => onInputChange?.(name, e)
      return (
        <TypeIconInput checked key={name} name={name} onChange={onChange} />
      )
    })

  return (
    <div className="type-icons">
      {buttons}
    </div>
  )
}
