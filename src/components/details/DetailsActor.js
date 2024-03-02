import React, { useState, useEffect } from "react";
import axios from 'axios';

// import Loader from "./Loader";
import { useParams } from "react-router-dom";

import ActorCharacters from "./ActorCharacters";
import ActorCharacterShow from "./ActorCharacterShow";











const DetailsActor = () => {
    const [error, setError] = useState(null);
    const [person, setPerson] = useState([]);
    const [cast, setCast] = useState([]);



    const params = useParams()
    const actorId = params.actorId;

    useEffect(() => {
        getPerson();

    }, []);
    console.log("iz detailsPerson params:", actorId);

    const getPerson = async () => {

        const url = ` https://api.tvmaze.com/people/${actorId}?embed=castcredits`;
        // const url = ` https://api.tvmaze.com/people/${actorId}`;
        // const urlCrow =`https://api.tvmaze.com/people/${actorId}/crewcredits?embed=show`
        const urlCrow = `https://api.tvmaze.com/people/${actorId}/crewcredits`
        const urlCast = `https://api.tvmaze.com/people/${actorId}/guestcastcredits?embed=episode`

        try {
            const response = await axios.get(url);
            const responseCrow = await axios.get(urlCrow);
            const responseCast = await axios.get(urlCast);





            const data = response.data;
            const dataCrow = responseCrow.data;
            const dataCast = responseCast.data;





            console.log("detalji actor glumca", data);
            console.log("detalji crow glumca", dataCrow);
            console.log("cast guestCast credits", dataCast);

            setPerson(data);
            setCast(data._embedded.castcredits)


            // setIsLoading(false);
            // setResults(data.length);


        } catch (err) {
            setError(err);

        }

    };



    return (
        <>
         
            <div className="showActor">
                <div className="holdImg">
                    <img className="imgShow"
                        src={person.image?.medium} />
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
        </>
    )


};
export default DetailsActor;