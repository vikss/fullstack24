import { useState } from 'react'



const App = () => {
  const [selected, setSelected] = useState(0)
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(anecdotes[0])
   
  
  const handleClick = ()=>{
    let randomNum = Math.floor(Math.random()*anecdotes.length)
    
    setSelected(randomNum)
    
  }
  const handleVote = ()=>{
    console.log(selected)

    let newArray = [...vote]
    newArray[selected] = newArray[selected]+1
    console.log(newArray)
    
    let mostVoted = newArray.indexOf(Math.max(...newArray))
    console.log(mostVoted)
    
    setVote(newArray)
    setMostVotes(anecdotes[mostVoted])

  }

  return (
    <div>
      <Header name="Anecdote of the day"></Header>
      <div>{anecdotes[selected]}</div>
      <div>has {vote[selected]} votes</div>
      <Button name="vote" handleClick={handleVote}></Button>
      <Button name="next anecdote" handleClick={handleClick}></Button>
      <Header name="Anecdote with most votes"></Header>
      <div>{mostVotes}</div>
    </div>
  )
}
const Button = (props)=>{

  return <button onClick={props.handleClick}>{props.name}</button>
}
const Header = (props)=>{
  return <h2>{props.name}</h2>
}


export default App
