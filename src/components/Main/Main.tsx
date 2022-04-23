import css from './Main.module.sass'
import {useDispatch, useSelector} from "react-redux";
import {fetchCountries, fetchSearchData} from "../../Redux/MainSlice";
import {useNavigate} from "react-router-dom";
import {selectCountries} from "../../Redux/MainSlice";
import {RootState} from "../../Redux/ReduxStore";
import * as React from "react";
import {FC, useEffect} from 'react';

const Main: FC = () => {
    let dispatch = useDispatch()
    let filter = useSelector((state: RootState) => state.MainReducer.filter)
    // let allCountries = useSelector(state => state.MainReducer.countries)
    let allCountries = useSelector((state: RootState) => selectCountries(state))
    let isLight = useSelector((state: RootState) => state.MainReducer.isLight)
    let navigate = useNavigate()


    useEffect(() => {
        if (!filter) dispatch(fetchCountries(filter))
        else dispatch(fetchCountries(filter.toLowerCase()))
    }, [dispatch, filter])
    const goToCard = (name: string) => {
        dispatch(fetchSearchData(name))
        navigate('/info')
    }
    return <main className={isLight ? css.Light : ''}>
        {allCountries?.map(({name, capital, region, population, flags}) => {
            return <div onClick={() => goToCard(name)} key={name} className={css.card}>
                <img src={flags.png}
                     alt={name}/>
                <div>
                    <h1>{name}</h1>
                    <h1>Population: <span>{population}</span></h1>
                    <h1>Region: <span>{region}</span></h1>
                    <h1>Capital: <span>{capital}</span></h1>
                </div>
            </div>
        })}


    </main>
};

export default Main;