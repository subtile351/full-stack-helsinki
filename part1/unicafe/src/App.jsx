import { useState } from 'react'

const Statistics = (props) => {
  const updatedGood = props.good
  const updatedNeutral = props.neutral
  const updatedBad = props.bad

  const updatedTotal = updatedGood + updatedNeutral + updatedBad
  const updatedAverage = updatedTotal === 0 ? 0 : (updatedGood - updatedBad) / updatedTotal
  const updatedPositive = updatedTotal === 0 ? 0 : (updatedGood / updatedTotal) * 100

  return(
    <div>
      <h1>statistics</h1>
      <p>good {updatedGood}</p>
      <p>neutral {updatedNeutral}</p>
      <p>bad {updatedBad}</p>
      <p>total {updatedTotal}</p>
      <p>average {updatedAverage}</p>
      <p>positive {updatedPositive}%</p>
    </div>
  )
}

const App = () => {
  // save clicks for each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(good + neutral + bad + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(good + neutral + bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App