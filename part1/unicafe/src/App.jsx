import { useState } from 'react'

const App = () => {
  // save clicks for each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      some other code here
      <p>test p for git</p>
    </div>
  )
}

export default App