import { useDispatch, useSelector } from "react-redux"
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm=()=>{
    const dispatch = useDispatch()
    const anecdotes = useSelector(state=>state)
    console.log(anecdotes)
    console.log("*")
    const getRandomId = ()=>{

        return Math.floor(Math.random()*10000)
    }
    const handleAdd=(event)=>{
        event.preventDefault()
        const anecdote = event.target.add.value
        const anecdoteObj = {quote: anecdote, vote: 0, id:getRandomId()}
        dispatch(addAnecdote(anecdoteObj))
        event.target.add.value = ''

    
    }
return<form onSubmit={handleAdd}><input name="add"></input><button type="submit">Submit</button></form>


}


export default AnecdoteForm