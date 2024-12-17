import { useState } from "react"
import { type PokemonType, POKEMON_TYPES } from "../features/type-compatibility"
import { random } from "../utils"
import { Effective } from "../features/calc-effective"

export interface AttackLogItem {
  to: PokemonType['name'] // 技
  effect: Effective
}

export type AttackLogItemWithId = AttackLogItem & {
  id: number
}

function useAttackLog() {
  const [log, setLog] = useState<AttackLogItemWithId[]>([])
  const updateState = () => setLog([...log])

  const push = (item: AttackLogItem) => {
    log.unshift({...item, id: log.length}) // 先頭に追加する
    updateState()
  }

  const update = (log?: AttackLogItemWithId[]) => {
    if (log) setLog(log)
    update()
  }

  const reset = () => setLog([])

  return {
    attackLog: log,
    actions: { push, reset, update }
  }
}

export function useGame() {
  const [correct, setCorrect] = useState<PokemonType['name'][]>([])
  const { attackLog, actions } = useAttackLog()
  const [isStarted, setIsStarted] = useState(false)

  const start = () => {
    const names = POKEMON_TYPES.map(t => t.name)

    const first = names[random(0, 18)] // タイプは18種類のはず
    const second = names[random(0, 18)]
    if(random(0, 3) === 0 && first !== second) { // 33%かつfirst === secondじゃないなら複合タイプ
      setCorrect([first, second])
    } else {
      setCorrect([first])
    }

    actions.reset()
  }

  // useGameを最初に呼んだ時点で1回目のゲームを始める
  if (!isStarted) {
    start()
    setIsStarted(true)
  }

  return { correct, start, attackLog, attackLogActions: actions }
}
