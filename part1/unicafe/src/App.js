import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const Display = (props) => {
    return (
      <div>
        <div>good {props.upDatedGood}</div>
        <div>neutral {props.upDatedNeutral}</div>
        <div>bad {props.upDatedBad}</div>
      </div>
    )
  }

  const Good = () => {
    const upDatedGood = good + 1
    console.log("good")
    setGood(upDatedGood)
    setTotal(upDatedGood + neutral + bad)
  }

  const Neutral = () => {
    const upDatedNeutral = neutral + 1
    console.log("neutral")
    setNeutral(upDatedNeutral)
    setTotal(upDatedNeutral + good + bad)
  }

  const Bad = () => {
    const upDatedBad = bad + 1
    console.log("bad")
    setBad(upDatedBad)
    setTotal(upDatedBad + neutral + good)
  }

  return (
    <div>
      <h1> give feedback </h1>
      <button onClick={Good}>good</button>
      <button onClick={Neutral}>neutral</button>
      <button onClick={Bad}>bad</button>
      <h1>statistics</h1>
      <Display upDatedGood = {good} upDatedBad = {bad} upDatedNeutral = {neutral}></Display>
      all {total}
      <br />average {(good-bad)/total}
      <br />positive {good/total}

    </div>
  )
}

export default App