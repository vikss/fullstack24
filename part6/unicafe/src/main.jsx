import ReactDOM from 'react-dom/client'
import feedbackReducer from './reducers/feedbackReducer'
import { createStore } from 'redux'



const store = createStore(feedbackReducer)
console.log(store.getState())
store.subscribe(() => {
    const storeNow = store.getState()
    console.log(`Store is ${storeNow}`)
    console.log("Rendering the app")
    renderApp()
})


const App = () => {

    /*
    old way of dealing with state changes
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

    }*/
    return <div>
        <Header name="give feedback"></Header>
        <Button name="good" handleClick={() => store.dispatch({ type: "good" })}></Button>
        <Button name="neutral" handleClick={() => store.dispatch({ type: "neutral" })}></Button>
        <Button name="bad" handleClick={() => store.dispatch({ type: "bad" })}></Button>
        <Header name="statistics"></Header>
        <Statistics stats={store.getState()}></Statistics>

    </div>

}

const StatisticLine = (props) => {

    return <tr><td>{props.name} {props.value}</td></tr>
}
const Statistics = ({ stats }) => {

    console.log({ stats })
    if (!stats)
        return <div>No feedback given</div>

    else if (stats.good > 0 || stats.bad > 0 || stats.neutral > 0) {
        let sum = stats.good + stats.bad + stats.neutral
        let avg = (stats.good * 1 + stats.bad * -1 + stats.neutral * 0) / sum;
        let positivePercent = (stats.good / sum) * 100;
        return <div>

            <table>
                <tbody>
                    <StatisticLine name="good" value={stats.good} />
                    <StatisticLine name="neutral" value={stats.neutral} />
                    <StatisticLine name="bad" value={stats.bad} />
                    <StatisticLine name="all" value={sum} />
                    <StatisticLine name="average" value={avg}></StatisticLine>
                    <StatisticLine name="positive" value={positivePercent + " %"} ></StatisticLine>
                </tbody>
            </table>
        </div>

    }
    return <div>No feedback given</div>


}

const Header = (props) => {

    console.log(`Header props are ${props}`)
    return <h2>{props.name}</h2>

}

const Button = (props) => {
    console.log(`Button props are ${props}`)
    return <button onClick={props.handleClick}>{props.name}</button>


}
const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App />)
}
renderApp()
store.subscribe(renderApp)

