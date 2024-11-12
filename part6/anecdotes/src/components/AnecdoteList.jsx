import { useDispatch, useSelector } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
    return (<li>{anecdote.quote} <br />
        has {anecdote.vote}
        <Button name="vote" handleClick={handleVote}></Button></li>)
}
const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    console.log(anecdotes)
    return <ul>{anecdotes.map((anecdote, index) => <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => dispatch(updateVote(index))}></Anecdote>)}</ul>

}


const Button = (props) => {

    return <button onClick={props.handleClick}>{props.name}</button>
}
export default AnecdoteList