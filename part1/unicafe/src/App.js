import { useState } from 'react'
import Button from './Button'
import StatisticLine from './StatisticLine'

const Statistics = (props) => {
  const {updatedBad, updatedGood, updatedNeutral, total} = props
  const average = total === 0 ? 0 :(updatedGood - updatedBad) / total;
  const roundAverage = average.toFixed(1);
  const positive = total === 0 ? 0 :updatedGood/total * 100;
  const roundPositive = positive.toFixed(1);

  if (props.allClicks === 0) {
    return (
      <div>
        no feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <td><StatisticLine text='good' /></td>
            <td><StatisticLine value={updatedGood} /></td>
          </tr>
          <tr>
            <td><StatisticLine text='bad' /></td>
            <td><StatisticLine value={updatedBad} /></td></tr>
          <tr>
            <td>
            <StatisticLine text='bad'/>
            </td>
            <td>
              <StatisticLine value={updatedBad} />
            </td>
          </tr>
          <tr>
            <td>
            <StatisticLine text='all' />
            </td>
            <td><StatisticLine value={total} /></td>
          </tr>
          <tr>
            <td>
            <StatisticLine text='average'  />
            </td>
            <td>
              <StatisticLine value={roundAverage}/>
            </td>
          </tr>
          <tr>
            <td>
            <StatisticLine text='positive' />
            </td>
            <td>
              <StatisticLine  value={roundPositive} />
            </td>
            <td>%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [allClicks, setAll] = useState(0)

  const Good = () => {
    const updatedGood = good + 1
    console.log("good")
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    setAll(allClicks+1)
  }

  const Neutral = () => {
    const updatedNeutral = neutral + 1
    console.log("neutral")
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
    setAll(allClicks+1)
  }

  const Bad = () => {
    const updatedBad = bad + 1
    console.log("bad")
    setBad(updatedBad)
    setTotal(updatedBad + neutral + good)
    setAll(allClicks+1)
  }

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick={Good} text='good' />
      <Button handleClick={Neutral} text='neutral' />
      <Button handleClick={Bad} text='bad' />
      <Statistics updatedGood = {good} updatedBad = {bad} updatedNeutral = {neutral}
      total ={total} allClicks={allClicks}>
      </Statistics>
    </div>
  )
}

export default App