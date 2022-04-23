import axios from 'axios'
import {Nullable} from "../Redux/MainSlice";

const instance = axios.create({
    withCredentials: false,
    baseURL: `https://restcountries.com/v2/`,
    headers: {}
})
export const countriesAPI = {
    getCountries: (region: Nullable<string>) => {
        if (region) return instance.get(`region/${region}`)
        return instance.get(`all`)
    },
    getSearch: (name: string) => {
        if (!name) return
        return instance.get(`name/${name}`)
    },
    getSearchDAta: (name: string) => {
        if (!name) return
        return instance.get(`name/${name}`)
    }
}