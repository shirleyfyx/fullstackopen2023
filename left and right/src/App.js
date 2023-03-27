import { useState } from 'react'

const History = (props) => {
  console.log(props.allClicks)
  if (props. allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const hello = (who) => () => {
  console.log('hello,',who)
}

const Display = props => <div>{props.value}</div>

const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
    const [total, setTotal] = useState(0)
    const [value, setValue] = useState(10)

    const setToValue = (newValue) => () => {
      console.log('value now', newValue)
      setValue(newValue)
    }

    

    const handleClick = () => {
      setValue(0)
      console.log('click the button')
  }
   

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updateRight = right + 1
    setRight(updateRight)
    setTotal(left + updateRight)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />

      <Display value={value} />
      <button onClick={handleClick}>button</button>
      <button onClick={hello('Shirley')}> hello </button>
      <button onClick={hello('world')}> hello </button>
      <button onClick={hello('hello')}> hello </button>
      <Button handleClick={setToValue(1000)} text='thousand' />
      <button onClick={setToValue(0)}>zero</button>
      <button onClick={setToValue(value + 1)}>+1</button>
      <p>total {total}</p>
    </div>
  )
}

  
export default App