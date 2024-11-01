const Course = (props)=>{
    return (
      <div>
        <Header course={props.name}></Header>
        <Content parts={props.parts}></Content>
  
        <Total parts={props.parts}></Total>
  
  
      </div>
    )
  
  
  }
  const Header = ({ course }) => {
    return <h3>{course}</h3>
  
  }
  const Content = ({parts}) => {
    console.log(parts)
    return <div>{parts.map(part=><Part key={part.id} name={part.name} exercises={part.exercises}></Part>)}</div>
  
  }
  const Part = (props) => {
    return <p>
      {props.name} {props.exercises}
    </p>
  
  
  }
  const Total = (props) => {
    return <h3>total of {props.parts.reduce((acc, part)=>acc+part.exercises, 0)} exercises</h3>
  
  }
  export default Course