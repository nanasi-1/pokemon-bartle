import './result.css'

export type ResultId = 'no-answer' | 'answer' | 'default'

export default function Result({ restart, result }: {
  restart: () => void
  result: ResultId
}) {
  if (result === 'default') return null

  return (
    <div className="result">
      <span className="result-text">
        {result === 'answer' ? '正解！' : '不正解...' }
      </span>
      {result === 'answer' ?
        <button className="button restart-button" onClick={restart}>もう一度プレイ</button>
        : null
      }
    </div>
  )
}