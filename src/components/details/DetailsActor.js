import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import ActorCharacters from "./ActorCharacters";
import ActorCharacterShow from "./ActorCharacterShow";
import DetailsEpisode from "./DetailsEpisode";
import BackToTop from "../BackToTop";

const DetailsActor = () => {
    const [error, setError] = useState(null);
    const [person, setPerson] = useState([]);
    const [cast, setCast] = useState([]);
    const [guestCast, setGuestCast] = useState([]);

    const params = useParams()
    const actorId = params.actorId;

    useEffect(() => {
        getPerson();

    }, []);
    console.log("iz detailsPerson params:", actorId);

    const getPerson = async () => {

        const url = ` https://api.tvmaze.com/people/${actorId}?embed=castcredits`;
        const urlCrow = `https://api.tvmaze.com/people/${actorId}/crewcredits`
        const urlCast = `https://api.tvmaze.com/people/${actorId}/guestcastcredits?embed=episode`
        const urlCelebs = `https://api.api-ninjas.com/v1/celebrity?name=${actorId}`;

        try {
            const response = await axios.get(url);
            const responseCrow = await axios.get(urlCrow);
            const responseCast = await axios.get(urlCast);
            const responseCelebs = await axios.get(urlCelebs,
                     {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            )

            const data = response.data;
            const dataCrow = responseCrow.data;
            const dataCast = responseCast.data;
            const dataCelebs = responseCelebs.data;

            console.log("detalji actor glumca", data);
            console.log("detalji crow glumca", dataCrow);
            console.log("cast guestCast credits", dataCast);
            console.log("api ninja celebs", dataCelebs);

            setPerson(data);
            setCast(data._embedded.castcredits)
            setGuestCast(dataCast);

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            <div className="details">
                <div className="holdImg">
                    <img className="imgShow"
                        src={person.image?.original} />
                </div>
                <table >
                    <tbody>
                        <tr>
                            <td colSpan={2}
                                className="showName">
                                {person.name}
                            </td>
                        </tr>
                        <tr>
                            <td className="language">
                                {person.country?.name}
                            </td>
                            <td >
                                {person.gender}
                            </td>
                        </tr>
                        <tr>
                            <td className="language">{person.birthday}</td>
                            <td className="language">{person.deathday}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <a href={person.url} target="_blank">
                                    TvMaze</a>
                            </td>
                        </tr>
                        <tr className="showCast">
                            <td>Show name</td>
                            <td>Cast</td>
                        </tr>
                        {cast.map((dataCast) => (
                            <tr >
                                <td className="borderBotom">
                                    <ActorCharacterShow show={dataCast._links.show.href} />
                                </td>
                                <td className="borderBotom">
                                    <ActorCharacters character={dataCast._links.character.href} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <p className="guestCast">Guest Cast</p>
            </div>

            {guestCast.map((guest) => (
                <div className="showActor">
                    <div >
                        <DetailsEpisode episodeId={guest._embedded.episode.id} />
                        <div>
                            <p>{guest._embedded.episode.name}</p>
                            <p>{guest._embedded.episode.airdate}</p>
                        </div>
                    </div>
                    <div>

                        <div className="forSummary">
                            <td> <img src={guest._embedded.episode.image?.medium} className="imgEpisode" /> </td>
                            <td className="summary">{guest._embedded.episode.summary?.replace('<p>', '').replace('</p>', '').replace('<br', '').replace('<b>', '').replace('</b>', '')
                                .replace('<i>', '').replace('</i>', '').replace('<p>', '').replace('</p>', '').replace('<br />', '')}</td>
                        </div>
                    </div>
                </div>
            ))}
            <BackToTop />
        </>
    )
};
export default DetailsActor;