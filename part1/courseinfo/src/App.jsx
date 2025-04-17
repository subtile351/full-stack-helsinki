const Header = (props) => {
  console.log('header component check')

  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props) => {
  console.log('content component check: ' + props.parts)
  
  return (
    <>
      {props.course.parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}

const Part = (props) => {
  console.log('part component check')

  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Total = (props) => {
  console.log('total component check')

  return (
    <>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Test part',
        exercises: 50,
        id: 4
      }
    ]
  }
  
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App