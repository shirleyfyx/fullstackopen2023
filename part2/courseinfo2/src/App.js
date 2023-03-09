import React from 'react';
import Course from'./course.js';

function ExerciseSum({parts}) {
  const sum = parts.reduce((accumulator, currentValue) => accumulator+currentValue.exercises, 0);
  return (
    <div>
      <strong><p></p>total of {sum} exercises</strong>
    </div>
  )
}

function Part ({part}) {
  return (
    <div key = {part.id}>
      <p>{part.name} {' '} {part.exercises}</p>
    </div>
  )
}

function Courses({course}) {
  return (
    <div> 
      <h2>{course.name}</h2>
      {course.parts.map(part =>
        <Part key = {part.id} part = {part} />
      )}
      <ExerciseSum parts = {course.parts} />
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {Course.map(course => 
      <Courses key={course.id} course = {course} />
      )}
    </div>
  )
}

export default App;