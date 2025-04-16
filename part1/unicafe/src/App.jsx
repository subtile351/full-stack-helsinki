import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <>
      <p>{props.text} {props.value}</p>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const total = good + neutral + bad

  let average
  if (total === 0) {
    average = 0
  } else {
    average = (good - bad) / total;
  }

  let positive
  if (total === 0) {
    positive = 0
  } else {
    positive = (good / total) * 100
  }

  if (total === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>total</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{average.toFixed(1)}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{positive.toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
      </>
    )

  }

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
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App