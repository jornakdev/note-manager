import reducer, { initialStateNote } from '../index'
import { createActionClearErrors, getActions } from "../actions";
import { ActionNames, NOTE_CLEAR_ERRORS } from "../types";
import { produce } from "immer";

describe('note reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialStateNote)
    })

    it(`should handle ${getActions.fetchFail}`, () => {
        expect(
            reducer(initialStateNote, {
                type: getActions.fetchFail,
                payload: {
                    message: 'Internal Sever Error'
                }
            })
        ).toEqual(
            produce(initialStateNote, draft => {
                draft[ActionNames.NOTE_GET].error = 'Internal Sever Error'
                draft[ActionNames.NOTE_GET].progress = false
            })
        )

    })

    it(`should handle ${NOTE_CLEAR_ERRORS}`, () => {
        expect(
            reducer(produce(initialStateNote, draft => {
                draft[ActionNames.NOTE_GET].error = 'Internal Sever Error 1'
                draft[ActionNames.NOTE_POST].error = 'Internal Sever Error 2'
                draft[ActionNames.NOTE_PUT].error = 'Internal Sever Error 3'
            }), createActionClearErrors())
        ).toEqual(
            produce(initialStateNote, draft => {
                draft[ActionNames.NOTE_GET].error = null
                draft[ActionNames.NOTE_DELETE].error = null
                draft[ActionNames.NOTE_POST].error = null
                draft[ActionNames.NOTE_PUT].error = null
            })
        )

    })

})