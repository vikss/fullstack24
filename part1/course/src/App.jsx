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

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>

      <Total parts={course.parts}></Total>


    </div>
  )
}
const Header = ({ course }) => {
  return <h1>{course}</h1>

}
const Content = ({parts}) => {
  console.log(parts)
  return <div><Part name={parts[0].name} exercises={parts[0].exercises}></Part>

    <Part name={parts[1].name} exercises={parts[1].exercises}></Part>
    <Part name={parts[2].name} exercises={parts[2].exercises}></Part>
  </div>
}
const Part = (props) => {
  return <p>
    {props.name} {props.exercises}
  </p>


}
const Total = (props) => {
  return <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>

}
export default App