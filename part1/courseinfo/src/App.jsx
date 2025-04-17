const Header = (props) => {
  console.log('header component check')

  return (
    <>
      <h2>{props.course.name}</h2>
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

  const total = props.course.parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <>
      <p><strong>Total number of exercises {total}</strong></p>
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => (
        <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
      ))}
    </>
  )
}

export default App