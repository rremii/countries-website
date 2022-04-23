import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./ReduxStore";
import {countriesAPI} from "../api/api";

enum ResultCodes {
    Success = 'OK',
    notFound = 'Error: Request failed with status code 404'
}

export type Nullable<T> = null | T

export type currency = { code: string, name: string, symbol: string }
export type language = { iso639_1: string, iso639_2: string, name: string, nativeName: string }
export type region = { acronym: string, name: string }
export type countryType = {
    alpha2Code: string
    alpha3Code: string
    altSpellings: Array<string>
    area: number
    borders: Array<string>
    callingCodes: Array<string>
    capital: string
    cioc: string
    currencies: Array<currency>
    demonym: string
    flag: string
    flags: { svg: string, png: string }
    independent: boolean
    languages: Array<language>
    latlng: Array<number>
    name: string
    nativeName: string
    numericCode: string
    population: number
    region: string
    regionalBlocs: Array<region>
    subregion: string
    timezones: Array<string>
    topLevelDomain: Array<string>
    translations: {
        br: string
        de: string
        es: string
        fa: string
        fr: string
        hr: string
        hu: string
        it: string
        ja: string
        nl: string
        pt: string
    }
}
export const fetchCountries = createAsyncThunk(
    'MainSlice/fetchCountries',
    async (filter: Nullable<string>) => {
        try {
            let response = await countriesAPI.getCountries(filter)
            if (response.statusText !== 'OK') {
                throw new Error('serverError')
            }
            return (response.data) as Array<countryType>

        } catch (e: any) {
            throw new Error(e)
        }
    }
)

export const fetchSearch = createAsyncThunk(
    'MainSlice/fetchSearch',
    async (name: string) => {
        try {
            if (name) {
                let response = await countriesAPI.getSearch(name)
                if (response?.statusText !== ResultCodes.Success) {
                    throw new Error('serverError')
                }
                return (response.data) as Array<countryType>
            }

        } catch (e: any) {
            throw new Error(e)
        }
    }
)
export const fetchSearchData = createAsyncThunk(
    'MainSlice/fetchSearchData',
    async (name: string) => {
        try {
            let response = await countriesAPI.getSearchDAta(name)
            if (response?.statusText !== 'OK') {
                throw new Error('serverError')
            }
            return (response.data) as Array<countryType>

        } catch (e: any) {
            throw new Error(e)

        }
    }
)
type initialStateType = {
    countries: Array<countryType>,
    filter: Nullable<string>,
    search: Nullable<Array<string>>,
    infoData: Nullable<countryType>,
    isLight: boolean,
}
let initialState = {
    countries: [],
    filter: '',
    search: [],
    infoData: null,
    isLight: false,
} as initialStateType
const MainSlice = createSlice({
    name: 'MainSlice',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<Nullable<string>>) {
            state.filter = action.payload
        },
        toggleLight(state) {
            state.isLight = !state.isLight
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCountries.fulfilled, (state, action) => {
            state.countries = action.payload
        })
        builder.addCase(fetchCountries.rejected, (state, action) => {
            alert(action.error.message)
        })
        //
        builder.addCase(fetchSearch.fulfilled, (state, action) => {
            if (!action.payload) return
            state.search = action.payload.map(({name}) => {
                return name
            })
        })
        builder.addCase(fetchSearch.rejected, (state, action) => {
            if (action.error.message === ResultCodes.notFound) state.search = []
            else alert(action.error.message)
        })
        //
        builder.addCase(fetchSearchData.fulfilled, (state, action) => {
            [state.infoData] = action.payload
            state.search = null
        })
        builder.addCase(fetchSearchData.rejected, (state, action) => {
            alert(action.error.message)
        })
    }


})
export const {setFilter, toggleLight} = MainSlice.actions
export default MainSlice.reducer

export const selectCountries = (state: RootState) => state.MainReducer.countries


