import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';

import GlobalContext from "../GlobalContext";
import Footers from "../Footers";
import SearchPlaceTv from "../search/SearchPlaceTv";
import ResultsTvTime from "./ResultsTvTime";

// import ResultsCollapsableTv from "./ResultsCollapsabl?eTv";
import { useNavigate } from "react-router-dom";







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
            <SearchPlaceTv />
            <table className="showMain">




                {tvShow.map((dataObj) => (



                    <tbody key={dataObj.show.id}
                    >

                        <tr>
                            <td rowSpan={7} className="holdImg">
                                <img className="imgShow"
                                    src={dataObj.show.image?.original} />
                            </td>
                            <td colSpan={2}
                                className="clickShow"
                                onClick={() => clickShow(dataObj.show.id)}>
                                {dataObj.show.name}
                            </td>
                        </tr>
                        <tr>
                            <td className="language">
                                {dataObj.show?.type}
                            </td>
                            <td >
                                <ul className="genres">
                                    <li>{dataObj.show.genres?.[0]}</li>
                                    <li>{dataObj.show.genres?.[1]}</li>
                                    <li>{dataObj.show.genres?.[2]}</li>
                                    <li>{dataObj.show.genres?.[3]}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="language">{dataObj.show.language}</td>
                            <td className="language">{dataObj.show?.rating.average + "  Runtime " + dataObj.show.averageRuntime + " min"}</td>
                        </tr>
                        <tr>
                            <td>Premiered:{" " + dataObj.show.premiered}</td>
                            <td>Ended:{" " + dataObj.show.ended}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="summary">
                                {dataObj.show.summary?.replace('<p>', '').replace('</p>', '').replace('<br', '').replace('<b>', '').replace('</b>', '')
                                    .replace('<i>', '').replace('</i>', '').replace('<p>', '').replace('</p>', '').replace('<br />', '')}
                            </td>
                        </tr>
                        <tr>
                            <td >
                                Web Chanel
                                <a href={dataObj.show.webChannel?.officialSite} target="_blank">
                                    {" " + dataObj.show.webChannel?.name}</a>
                            </td>
                            <td>
                                official Site
                                <a href={dataObj.show?.officialSite} target="_blank">
                                    {" " + dataObj.show.network?.name}</a>
                            </td>
                        </tr>
                        <tr>
                            <ResultsTvTime datum={dataObj.show.updated} />
                        </tr>
                        {/* <ResultsCollapsableTv idNumber={dataObj.show.id} /> */}
                        {/* <tr>
                            <td colSpan={3}>
                                <IconButton
                                    aria-label='expand row'
                                    size='small'
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton> Cast
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <Collapse in={open} timeout='auto' unmountOnExit>
                                    <Box sx={{ margin: 0 }}>
                                        <CollapsableTvSingl

                                            idNumber={tvShow.id}
                                        />

                                    </Box>
                                </Collapse>
                            </td>
                        </tr> */}
                        <tr>
                            <td colSpan={3}><hr></hr></td>
                        </tr>

                    </tbody>

                ))}

            </table >

        </>
    );
};
export default ResultsTvShow;