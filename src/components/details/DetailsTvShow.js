import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import ResultsTvTime from "../results/ResultsTvTime";
import { useNavigate } from "react-router-dom";
import SezoneList from "./SezoneList";
import EpisodeNumber from "./EpisodeNumber";
import BackToTop from "../BackToTop";


const DetailsTvShow = () => {
    const [error, setError] = useState(null);
    const [show, setShow] = useState([]);
    const [cast, setCast] = useState([]);
    const [sezons, setSezons] = useState([]);
    const [images, setImages] = useState([]);

    const navigate = useNavigate();




    const params = useParams()
    const showId = params.showId;

    useEffect(() => {
        getShow();

    }, []);
    console.log("iz detailsShow params:", showId);

    const getShow = async () => {

        const url = `https://api.tvmaze.com/shows/${showId}?embed=cast`
        const urlEp = `https://api.tvmaze.com/shows/${showId}/episodes`
        const urlSez = `https://api.tvmaze.com/shows/${showId}/seasons`
     
        try {
            const response = await axios.get(url);
            const responseEp = await axios.get(urlEp);
            const responseSez = await axios.get(urlSez);
          

            const data = response.data;
            const dataEp = responseEp.data;
            const dataSez = responseSez.data.reverse();
           
            console.log("detalji show-a", data);
            console.log("detalji epizoda", dataEp);
            console.log("detalji Sezona", dataSez);
          
            setShow(data);
            setCast(data._embedded.cast);
            setSezons(dataSez)      

        } catch (err) {
            setError(err);
        }
    };


    const clickPerson = (actorId) => {
        const LinkTo = `/actorDetails/${actorId}`;
        navigate(LinkTo);
    }

    const clickImg = (images) => {
        const LinkTo = `/imgShow/${images}`;
        navigate(LinkTo);
    }

    return (
        <>
            <div className="showActor">
                <div
                    className="holdImg">
                    <img className="imgShow"
                        src={show.image?.original} />
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}
                                className="showName">
                                {show.name}
                            </td>
                        </tr>
                        <tr>
                            <td className="language">
                                {show.type}
                            </td>
                            <td >
                                <ul className="genres">
                                    <li>{show.genres?.[0]}</li>
                                    <li>{show.genres?.[1]}</li>
                                </ul>
                                <ul className="genres">
                                    <li>{show.genres?.[2]}</li>
                                    <li>{show.genres?.[3]}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="language">{show.language}</td>
                            <td className="language">{show.rating?.average + "  Runtime " + show.runtime + " min"}</td>
                        </tr>

                        <EpisodeNumber sezones={sezons} />

                        <tr>
                            <td>Premiered:{" " + show.premiered}</td>
                            <td>Ended:{" " + show.ended}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="summary">
                                {show.summary?.replace('<p>', '').replace('</p>', '').replace('<b>', '').replace('</b>', '')
                                    .replace('<i>', '').replace('</i>', '').replace('<p>', '').replace('</p>', '').replace('<br />', '').replace('<br />', '')}
                            </td>
                        </tr>
                        <tr>
                            <td >
                                Web Chanel
                                <a href={show.webChannel?.officialSite} target="_blank">
                                    {" " + show.webChannel?.name}</a>
                            </td>
                            <td>
                                official Site
                                <a href={show?.officialSite} target="_blank">
                                    {" " + show.network?.name}</a>
                            </td>
                        </tr>
                        <tr>
                            <ResultsTvTime datum={show.updated} />
                            <td className="wrap"
                                onClick={() => clickImg(show.id)}>more picture</td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <table className="showActor">
                <tbody>
                    <tr>
                        <td colSpan={3}
                            className="imgCastMain">
                            <table>
                                <tbody>
                                    <tr >
                                        {cast.map((person) => (
                                            <td >
                                                <div className="guest">
                                                    <img className="guestImg"
                                                        src={person.character?.image?.original} alt="no picture" />
                                                    <img className="guestImgClick"
                                                        src={person.person?.image?.original} alt="no picture"
                                                        onClick={() => clickPerson(person.person.id)} />

                                                </div>


                                                <div className="guestName">
                                                    <p>{person.character?.name}</p>
                                                    <p className="click"
                                                        onClick={() => clickPerson(person.person.id)}>{person.person?.name}</p>
                                                </div>

                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>


                    <tr>
                        <td colSpan={3}><hr></hr></td>
                    </tr>

                </tbody>
            </table>
            <SezoneList sezone={sezons} />
            <BackToTop />
        </>
    )


};
export default DetailsTvShow;