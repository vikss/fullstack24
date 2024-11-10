import deepFreeze from 'deep-freeze'
import feedbackReducer from './feedbackReducer'

describe('feedback reducer', () => {
    const initialState = {
        good: 0,
        neutral: 0,
        bad: 0
    }

    test('should return a proper initial state when called with undefined state', () => {
        const state = {
            good: 0,
            neutral: 0,
            bad: 0
        }
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = feedbackReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test('good is incremented', () => {
        const action = {
            type: 'good'
        }
        const state = initialState

        deepFreeze(state)
        const newState = feedbackReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            neutral: 0,
            bad: 0
        })
    })
    test('bad is incremented', () => {
        const firstAction = {
            type: 'bad'
        }

        const state = {
            good: 1,
            neutral: 0,
            bad: 0
        }

        deepFreeze(state)
        let newState = feedbackReducer(state, firstAction)
        console.log(`Newstate var is ${newState}`)

        expect(newState).toEqual({
            ...state, bad: 1
        })
    })
    test('neutral is incremented', () => {
        const firstAction = {
            type: 'neutral'
        }

        const state = {
            good: 1,
            neutral: 0,
            bad: 1
        }

        deepFreeze(state)
        let newState = feedbackReducer(state, firstAction)
        console.log(`Newstate var is ${newState}`)

        expect(newState).toEqual({
            ...state, neutral: 1
        })
    })
})