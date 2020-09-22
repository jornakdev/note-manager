import reducer, { initialState } from '../index'
import { actions } from "../actions";

const data = [
    { id: '1', text: 'Hello' },
    { id: '2', text: 'Best Note' },
    { id: '3', text: 'Worst Note' },
]

describe('notes reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle NOTES_FETCH', () => {
        expect(
            reducer(undefined, {
                type: actions.fetch
            })
        ).toEqual(
            {
                NOTES: {
                    progress: true,
                },
            }
        )

    })

    it('should handle NOTES_FETCH_SUC', () => {
        expect(
            reducer(undefined, {
                type: actions.fetchSuc,
                payload: data
            })
        ).toEqual(
            {
                NOTES: {
                    progress: false,
                    data: data
                },
            }
        )

    })

    it('should handle NOTES_FETCH_FAIL', () => {
        expect(
            reducer(undefined, {
                type: actions.fetchFail,
                payload: {message: 'Server internal error'}
            })
        ).toEqual(
            {
                NOTES: {
                    progress: false,
                    data: data,
                    error: 'Server internal error'
                },
            }
        )

    })

    it('should handle NOTES_CLEAR_ERROR', () => {
        expect(
            reducer(undefined, {
                type: actions.clearError,
            })
        ).toEqual(
            {
                NOTES: {
                    progress: false,
                    data: data,
                    error: null
                },
            }
        )

    })

    it('should handle NOTES_CLEAR_DATA', () => {
        expect(
            reducer(undefined, {
                type: actions.clearData,
            })
        ).toEqual(
            {
                NOTES: {
                    progress: false,
                    data: null,
                    error: null
                },
            }
        )

    })
})