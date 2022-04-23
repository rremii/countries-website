import React, {ChangeEvent, MouseEventHandler, useEffect, useState} from 'react';
import css from './Nav.module.sass'
import {useDispatch, useSelector} from "react-redux";
import {fetchSearch, fetchSearchData, Nullable, setFilter} from "../../Redux/MainSlice";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../Redux/ReduxStore";

const Nav: React.FC = () => {
    let dispatch = useDispatch()
    let [isOpen, setOpen] = useState(false)
    let filter = useSelector((state: RootState) => state.MainReducer.filter)
    let allSearchNames = useSelector((state: RootState) => state.MainReducer.search)
    let isLight = useSelector((state: RootState) => state.MainReducer.isLight)
    let navigate = useNavigate()
    const SetRegion = (region: Nullable<string>) => {
        return dispatch(setFilter(region))
    }
    const FetchSearch = (name: string) => {
        return dispatch(fetchSearch(name))
    }
    const FetchSearchData = (name: string) => {
        navigate('/info')
        return dispatch(fetchSearchData(name))
    }
    return <nav className={isLight ? css.Light : ''}>
        <section>
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="black"
                 className="bi bi-search cursor-pointer dark:text-darkModeTextAndDarkModeElements" viewBox="0 0 16 16">
                <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            </svg>
            <input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                FetchSearch(e.target.value)
            }} type="text" placeholder='Search for a country...'/>
            <div>
                {allSearchNames?.map((name: string) => {
                    return <span onClick={() => FetchSearchData(name)} key={name}>{name}</span>
                })}
            </div>
        </section>

        <article onClick={() => setOpen(!isOpen)}>
            {!filter ? 'Whole world' : filter}
            {isOpen && <div>
                <span onClick={() => SetRegion('')}>Whole world</span>
                <span onClick={() => SetRegion('Africa')}>Africa</span>
                <span onClick={() => SetRegion('America')}>America</span>
                <span onClick={() => SetRegion('Asia')}>Asia</span>
                <span onClick={() => SetRegion('Europe')}>Europe</span>
                <span onClick={() => SetRegion('Oceania')}>Oceania</span>
            </div>}
        </article>
    </nav>
};

export default Nav;