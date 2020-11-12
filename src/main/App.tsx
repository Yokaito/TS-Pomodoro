import React from 'react'
import Pomodoro from '../components/Pomodoro'

const App = (): JSX.Element => {
  return (
    <div className="container">
      <Pomodoro
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    </div>
  )
}

export default App
