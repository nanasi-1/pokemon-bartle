import { type PokemonType, getTypeByName } from './type-compatibility'

// 効果
type EffSingle = 0 | 0.5 | 1 | 2
export type Effective = EffSingle | 0.25 | 4

function calcEffSingle(from: PokemonType['name'], to: PokemonType['name']): EffSingle {
  const toTypeRelations = getTypeByName(to).damage_relations

  if (toTypeRelations.double_damage_to.includes(from)) return 2
  if (toTypeRelations.half_damage_to.includes(from)) return 0.5
  if (toTypeRelations.no_damage_to.includes(from)) return 0
  return 1
}

/**
 * タイプ相性を計算する
 * @param from 技を受けるポケモンのタイプ
 * @param to fromに攻撃する技のタイプ
 * @example
 * calcEffective(['normal'], 'fighting') // 2
 * calcEffective(['grass'], 'water') // 0.5
 */
export function calcEffective(from: PokemonType['name'][], to: PokemonType['name']): Effective {
  const first = calcEffSingle(from[0], to)
  const second = calcEffSingle(from[1], to)
  return first * second as Effective
}
