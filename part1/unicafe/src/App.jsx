import { useState } from 'react'

const App = () => {
  // save clicks for each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(good + neutral + bad + 1)
    calculateAverage(good + 1, bad, total + 1)
    calculatePositive(good + 1, total + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(good + neutral + bad + 1)
    calculatePositive(good, total + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(good + neutral + bad + 1)
    calculateAverage(good, bad + 1, total + 1)
    calculatePositive(good, total + 1)
  }

  const calculateAverage = (goodAvg, badAvg, totalAvg) => {
    if (totalAvg != 0) {
      setAverage((goodAvg - badAvg) / totalAvg)
    }
  }

  const calculatePositive = (goodPos, totalPos) => {
    if (totalPos != 0) {
      setPositive(goodPos / totalPos * 100)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>total {total}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  )
}

export default App