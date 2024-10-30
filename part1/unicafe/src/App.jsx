import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleClick = (name) => {

    if (name == "good") {
      setGood(good + 1)

    }
    else if (name == "bad") {
      setBad(bad + 1)

    }
    else {
      setNeutral(neutral + 1)
    }

  }
  return <div>
    <Header name="give feedback"></Header>
    <Button name="good" handleClick={()=>handleClick("good")}></Button>
    <Button name="neutral" handleClick={()=>handleClick("neutral")}></Button>
    <Button name="bad" handleClick={()=>handleClick("bad")}></Button>

 
    <Header name="statistics"></Header>
    <Statistics good={good} neutral={neutral} bad={bad}></Statistics>

  </div>

}

const StatisticLine=(props)=>{

  return <tr><td>{props.name} {props.value}</td></tr>
}
const Statistics = (props) => {
  console.log(props)
 
  if(props.good>0 || props.bad>0 || props.neutral>0){
    let sum = props.good+props.bad+props.neutral
    let avg = (props.good *1 +props.bad*-1 + props.neutral*0)/sum;
    let positivePercent = (props.good/sum)*100;
  return <div>
   
    <table>
      <tbody>
    <StatisticLine name="good" value = {props.good}/>
    <StatisticLine name="neutral" value = {props.neutral}/>
    <StatisticLine name="bad" value = {props.bad}/>
    <StatisticLine name="all" value={sum}/>
    <StatisticLine name="average" value={avg}></StatisticLine>
    <StatisticLine name="positive" value={positivePercent+" %"} ></StatisticLine>
    </tbody>
    </table>
  </div>

  }
  return <div>No feedback given</div>


}

const Header = (props) => {

  console.log(props)
  return <h2>{props.name}</h2>

}

const Button = (props) => {
  console.log(props)
  return <button onClick={props.handleClick}>{props.name}</button>


}

export default App
