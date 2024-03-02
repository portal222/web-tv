import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';

import GlobalContext from "../GlobalContext";
import ResultsTvTime from "./ResultsTvTime";
// import ResultsActorCelebs from "./ResultsActorCelebs";
import { useNavigate } from "react-router-dom";







const ResultsTvActors = () => {
    const [error, setError] = useState(null);
    const [tvShow, setTvShow] = useState([]);
    const [results, setResults] = useState([]);

    const navigate = useNavigate();




    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getTvShow(searchStringValue);
    }, [searchStringValue]);
    console.log("iz results tvShow", searchStringValue)

    const getTvShow = async (searchStringValue) => {
        const url = `https://api.tvmaze.com/search/people?q=${searchStringValue}`;

        try {
            const response = await axios.get(url);

            const data = response.data;




            console.log("rezultat glumci tvShowActors", data)

            setTvShow(data);
            setResults(data.length);
        } catch (err) {
            setError(err);

        }

    };

    const clickActor = (actorId) => {
        const LinkTo = `/actorDetails/${actorId}`;
        navigate(LinkTo);

    }


    return (
        <>
      
            <table className="showMain">




                {tvShow.map((dataObj) => (



                    <tbody key={dataObj.person.id}
                    >

                        <tr>
                            <td rowSpan={5} className="holdImg">
                                <img className="imgShow"
                                    src={dataObj.person.image?.original} />
                            </td>
                            <td colSpan={2}
                                className="showNameActor"
                                onClick={() => clickActor(dataObj.person.id)}>
                                {dataObj.person?.name}
                            </td>
                        </tr>
                        <tr>
                            <td className="language">
                                {dataObj.person.country?.name}
                            </td>
                            <td >
                                {dataObj.person.gender}

                            </td>
                        </tr>
                        <tr>
                            <td className="language">{dataObj.person.birthday}</td>
                            <td className="language">{dataObj.person.deathday}</td>
                        </tr>

                        <tr>
                            <td colSpan={2}>

                                <a href={dataObj.person.url} target="_blank">
                                    TvMaze</a>
                            </td>

                        </tr>
                        <tr>
                            <ResultsTvTime datum={dataObj.person.updated} />
                        </tr>
                        {/* <ResultsActorCelebs celebName={dataObj.person?.name}/> */}
                        <tr>
                            <td colSpan={3}><hr></hr></td>
                        </tr>

                    </tbody>

                ))}

            </table >

        </>
    );
};
export default ResultsTvActors;