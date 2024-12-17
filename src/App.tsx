import { AttackLogItem, useGame } from "./hooks/useGame"
import { TypeIconImg } from "./components/utils/TypeIcon"
import { useAttackLog } from "./components/attack-log/AttackLog"
import AttackPanel from "./components/attack-panel/AttackPanel"
import './App.css'

function App() {
  const game = useGame()
  const { attackLog, scrollTop } = useAttackLog(game.attackLog)

  const pushToAttackLog = (item: AttackLogItem) => {
    game.attackLogActions.push(item)
    scrollTop()
  }

  return (
    <>
      <h1 className="title">簡易式 Pokemon Bartle</h1>
      <main>
        <div className="content-wrapper">
          {attackLog}
          <AttackPanel restart={game.start} correct={game.correct} pushToAttackLog={pushToAttackLog} />
        </div>
      </main>
      <div hidden>
        correct: {game.correct.map(name => (<TypeIconImg key={name} name={name} />))}
      </div>
    </>
  )
}

export default App
