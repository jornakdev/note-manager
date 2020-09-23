import reducer, { initialState } from '../index'
import { createActionLocaleSet } from "../actions";
import { LOCALE_SET } from "../types";
import { produce } from "immer";
import { Locales } from "../../../utils/types";
import { stringToLocale } from "../util";

describe('util', () => {
    it('should return default', () => {
        expect(stringToLocale('sk')).toEqual(Locales.en)
        expect(stringToLocale(null)).toEqual(Locales.en)
    })
})

describe('locale reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it(`should handle ${LOCALE_SET}`, () => {
        expect(
            reducer(initialState, createActionLocaleSet('cs'))
        ).toEqual(
            produce(initialState, draft => {
                draft.usersLocale = 'cs'
            })
        )
    })
})