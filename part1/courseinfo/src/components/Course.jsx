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

const Course = (props) => {
  console.log('course component check')

  return (
    <>
      {props.courses.map(course => (
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </div>
      ))}
    </>
  )
}

export default Course