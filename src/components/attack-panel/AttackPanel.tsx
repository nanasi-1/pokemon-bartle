import { PokemonType } from "../../features/type-compatibility"
import { AttackLogItem } from "../../hooks/useGame"
import { useToggle } from "../utils/Toggle"
import { useTypeList } from "../utils/TypeList"
import { AttackButton } from "./AttackButton"
import AnswerButton, { OnClickAnswer } from "./AnswerButton"
import Result, { ResultId } from "./Result"
import { useState } from "react"
import "./attack-panel.css"

export default function AttackPanel({ correct, pushToAttackLog, restart }: {
  correct: PokemonType['name'][]
  pushToAttackLog: (obj: AttackLogItem) => void
  restart: () => void
}) {
  const { value: isAnswer, toggle, setValue: setIsAnswer } = useToggle()
  const max = isAnswer ? 2 : 1 // フックでもちゃんと動くらしい（安心）
  const { typeList, checkedList, updateChecked } = useTypeList(max)

  // default=未解答
  const [result, setResult] = useState<ResultId>('default')

  const attack = (item: AttackLogItem) => {
    setResult('default')
    pushToAttackLog(item)
    updateChecked([])
  }

  const answer: OnClickAnswer = (isAnswer: boolean) => {
    setResult(isAnswer ? 'answer' : 'no-answer')
  }

  const _restart = () => {
    setIsAnswer(false)
    updateChecked([])
    setResult('default')
    restart()
  }

  return (
    <div className="attack-panel">
      {typeList}
      {result === 'answer' ? null : isAnswer ?
        <AnswerButton correct={correct} answer={checkedList} onClick={answer} /> :
        <AttackButton from={correct} to={checkedList} onClick={attack} />
      }
      {result === 'answer' ? null :
        <div className="attack-toggle-wrapper">
          {toggle}
          <span className={`toggle-label ${isAnswer ? 'answer' : 'attack'}`}>解答する</span>
        </div>
      }
      <Result result={result} restart={_restart} />
    </div>
  )
}