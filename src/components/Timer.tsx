import React from 'react'
import { secondToMinute } from '../utils/seconds-to-minute'

interface Props {
  mainTime: number
}

const Button = ({ mainTime }: Props): JSX.Element => {
  return <div className="timer">{secondToMinute(mainTime)}</div>
}

export default Button
