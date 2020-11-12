import React, { useEffect, useState, useCallback } from 'react'
import { useInterval } from '../hooks/use-interval'
import { secondToTime } from '../utils/seconds-to-time'

const bellStart = require('../sounds/bell-start.mp3')
const bellFinish = require('../sounds/bell-finish.mp3')

const audioStartWorking = new Audio(bellStart)
const audioStopWorking = new Audio(bellFinish)

import Button from './Button'
import Timer from './Timer'

interface Props {
  pomodoroTime: number
  shortRestTime: number
  longRestTime: number
  cycles: number
}

const Pomodoro = ({
  pomodoroTime,
  shortRestTime,
  longRestTime,
  cycles,
}: Props): JSX.Element => {
  const [mainTime, setMainTime] = useState(pomodoroTime)
  const [timeCounting, setTimeCounting] = useState(false)
  const [working, setWorking] = useState(false)
  const [resting, setResting] = useState(false)
  const [cyclesQtManager, setCyclesQtManager] = useState(
    new Array(cycles - 1).fill(true)
  )
  const [completedCycles, setCompletedCycles] = useState(0)
  const [fullWorkingTime, setFullWorkingTime] = useState(0)
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0)

  useInterval(
    () => {
      setMainTime(mainTime - 1)
      if (working) setFullWorkingTime(fullWorkingTime + 1)
    },
    timeCounting ? 1000 : null
  )

  const configWorker = useCallback(() => {
    setTimeCounting(true)
    setWorking(true)
    setResting(false)
    setMainTime(pomodoroTime)
    audioStartWorking.load()
  }, [setTimeCounting, setWorking, setResting, setMainTime, pomodoroTime])

  const configRest = useCallback(
    (Long: boolean) => {
      setTimeCounting(true)
      setWorking(false)
      setResting(true)
      if (Long) setMainTime(longRestTime)
      else setMainTime(shortRestTime)
      audioStopWorking.load()
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMainTime,
      longRestTime,
      shortRestTime,
    ]
  )

  useEffect(() => {
    if (working) document.body.classList.add('working')
    if (resting) document.body.classList.remove('working')

    if (mainTime > 0) return

    if (working && cyclesQtManager.length > 0) {
      configRest(false)
      cyclesQtManager.pop()
    } else if (working && cyclesQtManager.length <= 0) {
      configRest(false)
      setCyclesQtManager(new Array(cycles - 1).fill(true))
      setCompletedCycles(completedCycles + 1)
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1)
    if (resting) configWorker()
  }, [
    working,
    resting,
    mainTime,
    cyclesQtManager,
    numberOfPomodoros,
    completedCycles,
    configRest,
    setCyclesQtManager,
    configWorker,
    cycles,
  ])

  return (
    <div className="pomodoro">
      <h2>You are: {working ? 'Working' : 'Resting'}</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Work" onClick={() => configWorker()}></Button>
        <Button text="Rest" onClick={() => configRest(false)}></Button>
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        ></Button>
      </div>
      <div className="details">
        <p>Ciclos Concluídos: {completedCycles}</p>
        <p>Horas Trabalhadas: {secondToTime(fullWorkingTime)}</p>
        <p>Pomodoros Concluídos: {numberOfPomodoros}</p>
      </div>
    </div>
  )
}

export default Pomodoro
