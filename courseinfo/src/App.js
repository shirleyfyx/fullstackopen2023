const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const totalExercises = course.parts.reduce((total, part) => {
    return {
      exercises: total.exercises + part.exercises
    };
  });


  return (
    <div>
    <h1>{course.name}</h1>
    {course.parts.map(part => (
      <p key = {part.name}>
        {part.name} {part.exercises}
      </p>
    ))}
    <p> Total number of exercises: {totalExercises.exercises}</p>
    </div>
  )
}

export default App