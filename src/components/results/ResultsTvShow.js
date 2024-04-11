import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import ResultsTvTime from "./ResultsTvTime";
import { useNavigate } from "react-router-dom";
import BackToTop from "../BackToTop";

const ResultsTvShow = () => {
    const [error, setError] = useState(null);
    const [tvShow, setTvShow] = useState([]);
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getTvShow(searchStringValue);
    }, [searchStringValue]);
    console.log("iz results tvShow", searchStringValue)

    const getTvShow = async (searchStringValue) => {
        const url = `https://api.tvmaze.com/search/shows?q=${searchStringValue}`;

        try {
            const response = await axios.get(url);

            const data = response.data;

            console.log("rezultat serija tvShow", data);

            setTvShow(data);
            setResults(data.length);
        } catch (err) {
            setError(err);
        }
    };

    const clickShow = (showId) => {
        const LinkTo = `/showDetails/${showId}`;
        navigate(LinkTo);
    }

    return (
        <>
            <table className="showMain">
                {tvShow.map((dataObj) => (
                    <tbody key={dataObj.show.id}>
                        <tr>
                            <td rowSpan={7} className="holdImg">
                                <img className="imgShow"
                                    src={dataObj.show.image?.original}
                                    onClick={() => clickShow(dataObj.show.id)} />
                            </td>
                            <td className="clickShow"
                                onClick={() => clickShow(dataObj.show.id)}>
                                {dataObj.show.name}
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <ul className="genres">
                                    <li>{dataObj.show.genres?.[0]}</li>
                                    <li>{dataObj.show.genres?.[1]}</li>
                                    <li>{dataObj.show.genres?.[2]}</li>
                            
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="language">{dataObj.show.language}</td>
                        </tr>
                        <tr>
                            <td>Premiered:{" " + dataObj.show.premiered}</td>
                        </tr>
                        <tr>
                            <td className="summaryRes" dangerouslySetInnerHTML={{ __html: dataObj.show.summary }}>
                            </td>
                        </tr>
                        <tr>
                            <ResultsTvTime datum={dataObj.show.updated} />
                        </tr>
                        <tr>
                            <td>
                                <a href={dataObj.show.url} target="_blank">TvMaze</a>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><hr></hr></td>
                        </tr>
                    </tbody>
                ))}
            </table >
            <BackToTop />
        </>
    );
};
export default ResultsTvShow;