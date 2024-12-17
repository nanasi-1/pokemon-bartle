import { useRef } from "react";
import { AttackLogItem, AttackLogItemWithId } from "../../hooks/useGame"
import { TypeIconImg } from "../utils/TypeIcon"
import  "./attack-log.css";

function LogItem({ to, effect }: AttackLogItem) {
  return (
    <li className="attack-log-item">
      <TypeIconImg name={to} width={40} />
      <span>-&gt;</span>
      <span>{effect}</span>
    </li>
  )
}

export function AttackLog({ log, _ref }: {
  log: AttackLogItemWithId[]
  _ref: React.MutableRefObject<HTMLUListElement | null>
}) {
  return (
    <ul className="attack-log" ref={_ref}>
      {log.map(item => <LogItem key={item.id} {...item} />)}
    </ul>
  )
}

export function useAttackLog(log: AttackLogItemWithId[]) {
  const ref = useRef<HTMLUListElement>(null)
  const attackLog = <AttackLog _ref={ref} log={log}/>

  // スクロール関数
  const scrollTop = () => {
    if (!ref.current?.scrollTop) return
    ref.current.scrollTop = 0
  }

  return { scrollTop, attackLog }
}