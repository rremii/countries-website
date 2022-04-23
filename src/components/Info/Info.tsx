import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import css from './Info.module.sass';
import {RootState} from "../../Redux/ReduxStore";
import {FC} from "react";

const Info:FC = () => {
    let country = useSelector((state: RootState) => state.MainReducer?.infoData)
    let isLight = useSelector((state: RootState) => state.MainReducer.isLight)
    let navigate = useNavigate()
    const GoBack = () => {
        return navigate('/')
    }
    return <div className={[css.Info, isLight ? css.light : ''].join(' ')}>
        <article>
            <div onClick={GoBack}>← Back</div>
        </article>
        <h1>{country?.name}</h1>
        <section>

            <img src={country?.flags?.png}
                 alt={country?.name}/>
            <div>
                <h2>Population: <span>{country?.population}</span></h2>
                <h2>Region: <span>{country?.region}</span></h2>
                <h2>Sub Region: <span>{country?.subregion}</span></h2>
                <h2>Top Level Domain: <span>{country?.topLevelDomain}</span></h2>
                <h2>Currencies: <span>{country?.currencies?.map((cur) => <span
                    key={cur.name}> {cur.name} </span>)}</span></h2>
                <h2>Languages: <span>{country?.languages?.map((lan) => <span
                    key={lan.name}> {lan.name} </span>)}</span>
                </h2>
                <h2>Capital: <span>{country?.capital}</span></h2>
            </div>
        </section>
    </div>
};

export default Info;