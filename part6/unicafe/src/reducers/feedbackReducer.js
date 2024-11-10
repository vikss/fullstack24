const initialState = {
  good: 0,
  neutral: 0,
  bad: 0
}
const feedbackReducer = (state = initialState, action) => {

  console.log(action)
  console.log(state)
  switch (action.type) {

    case "good":
      return { ...state, good: state.good + 1 }

    case "bad":
      return { ...state, bad: state.bad + 1 }

    case "neutral":
      return { ...state, neutral: state.neutral + 1 }
  }
  return state

}
export default feedbackReducer