import { PokemonType } from "../../features/type-compatibility"

/** 
 * 順不同で配列が同じかどうか比較する 
 * 簡易的なものなので他では動作しない
 */
function equalArray<T>(array1: T[], array2: T[]): boolean {
  // 長さチェック
  if (array1.length !== array2.length) return false

  // array1の要素はすべてarray2に含まれている
  if (!array1.every(v => array2.includes(v))) return false
  if (!array2.every(v => array1.includes(v))) return false

  // もういいや（思考放棄）
  return true
}

export type OnClickAnswer = (
  isAnswer: boolean, 
  info: { answer: PokemonType['name'][], correct: PokemonType['name'][] }
) => void

export default function AnswerButton({ answer, correct, onClick }: {
  correct: PokemonType['name'][]
  answer: PokemonType['name'][]
  onClick: OnClickAnswer
}) {
  const _onClick = () => {
    const isAnswer = equalArray(answer, correct) // 正解かどうか
    onClick(isAnswer, { answer, correct })
  }

  return (
    <button
      className="button attack-panel-button answer"
      disabled={answer.length === 0}
      onClick={_onClick}
    >タイプを解答</button>
  )
}