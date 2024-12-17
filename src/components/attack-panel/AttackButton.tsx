import { calcEffective, type Effective } from "../../features/calc-effective"
import { PokemonType } from "../../features/type-compatibility"

export type OnClickAttackButton = (obj: { effect: Effective, to: PokemonType['name'] }) => void

export function AttackButton({ from, to, onClick }: {
  from: PokemonType['name'][],
  to: PokemonType['name'][]
  onClick: OnClickAttackButton
}) {
  const _to = to[0] // 実際に使うほうのto
  const _onClick = () => {
    const effect = calcEffective(from, _to)
    onClick({ effect, to: _to })
  }

  return (
    <button
      className="button attack-panel-button attack"
      onClick={_onClick}
      disabled={to.length !== 1}
    >攻撃</button>
  )
}