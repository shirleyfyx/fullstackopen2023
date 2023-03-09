import React from 'react';
import Course from'./course.js';

function ExerciseSum({parts}) {
  const sum = Course.reduce((accumulator, currentValue) => accumulator+currentValue.exercises, 0);
  return (
    <div>
      <strong><p></p>total of {sum} exercises</strong>
    </div>
  )
}

const App = () => {
  console.log(Course)
  return (
    <div>
      <h1>Web development curriculum</h1>
      {Course.map(part =>
          <div key={part.id}>
            <p></p>{part.name} 
            {' '}{part.exercises}
          </div>
        )}
        <ExerciseSum />
    </div>
  )
}

export default App;