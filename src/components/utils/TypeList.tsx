import { POKEMON_TYPES, PokemonType } from "../../features/type-compatibility";
import { TypeIconInput } from "./TypeIcon";
import { useState } from "react";

type OnInputChange = (typeName: PokemonType['name'], event: React.MouseEvent) => void

export function TypeList({ onInputChange, checkedList }: {
  onInputChange?: OnInputChange
  checkedList: PokemonType['name'][]
}) {
  const buttons = POKEMON_TYPES.map(t => t.name)
    .map(name => {
      const onChange = (e: React.MouseEvent) => onInputChange?.(name, e)
      return (
        <TypeIconInput checked={checkedList.includes(name)} key={name} name={name} onChange={onChange} />
      )
    })

  return (
    <div className="type-icons">
      {buttons}
    </div>
  )
}

export function useTypeList(maxChecked: number) {
  const [checkedList, setCheckedList] = useState<PokemonType['name'][]>([])
  const removeByChecked = (name: PokemonType['name']) => {
    const index = checkedList.indexOf(name)
    checkedList.splice(index, 1)
    setCheckedList([...checkedList]) // シャローコピー
  }

  const onInputChange: OnInputChange = (name) => {
    if (checkedList.includes(name)) {
      removeByChecked(name)
    } else {
      if (checkedList.length >= maxChecked) checkedList.pop()
      checkedList.push(name)
      setCheckedList([...checkedList])
    }
  }

  const component = <TypeList checkedList={checkedList} onInputChange={onInputChange} />
  const updateChecked = (set: PokemonType['name'][]) => setCheckedList(set)

  return { checkedList, typeList: component, updateChecked }
}
