const anecdotes = [
    { quote: 'If it hurts, do it more often.', vote: 0, id: 0 },
    { quote: 'Adding manpower to a late software project makes it later!', vote: 0, id: 1 },
    { quote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', vote: 0, id: 2 },
    { quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', vote: 0, id: 3 },
    { quote: 'Premature optimization is the root of all evil.', vote: 0, id: 4 },
    { quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', vote: 0, id: 5 },
    { quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', vote: 0, id: 6 },
    { quote: 'The only way to go fast, is to go well.', vote: 0, id: 7 }
]

const anecdoteReducer = (state = anecdotes, action) => {
    console.log(state)

    switch (action.type) {


        case "UPDATE_VOTES":
            const num = action.payload.index
            const changedAnecdote = { ...state[num], vote: state[num].vote + 1 }
            const newCopy = [...state]
            newCopy[num] = changedAnecdote
            console.log("New copy is ", newCopy)
            return newCopy.sort((ele1, ele2) => {
                if (ele1.vote > ele2.vote)
                    return -1
                else if (ele1.vote < ele2.vote)
                    return 1
                return 0



            })
            case "ADD_ANECDOTE":
                let obj = {quote: action.payload.quote, vote: action.payload.vote, id: action.payload.id
                }
                console.log(obj)
                return state.concat(obj)




    }
    return [...state]


}
export const addAnecdote=(obj)=>{

    return {

        type: "ADD_ANECDOTE",
        payload:{
            quote: obj.quote,
            vote: obj.vote,
            id: obj.id
        }
    }


}
export const updateVote = (index) => {

    return {
        type: "UPDATE_VOTES",
        payload: {
            index: index

        }


    }
}



export default anecdoteReducer