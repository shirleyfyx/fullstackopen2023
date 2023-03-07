import { useState, useEffect } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(8).fill(0))
  const [max, setMax] = useState(0)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const maxNumber = Math.max(...points)
    setMax(maxNumber)
    const maxIndex = points.indexOf(maxNumber)
    setIndex(maxIndex)
    console.log('haha',maxNumber)
  },[points])

  const Vote = () => {
    const copy = [...points]
    copy[selected] +=1
    setPoints(copy)
    console.log(copy)
  }
  
  const Select = () => {
    let min = 0;
    let max = 7;
    let selected = Math.floor(Math.random() * (max - min + 1)) + min
    setSelected(selected)
    console.log(selected)
  }

  return (
    <div>
      <h2>Anecdote of the day </h2>
      {anecdotes[selected]} <br></br>
      has {points[selected]} votes <br></br>
      <button onClick={Vote}>vote</button>
      <button onClick={Select}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {anecdotes[index]} <br></br>
      has {max} votes
    </div>
  )
}
export default App