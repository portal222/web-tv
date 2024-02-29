import axios from "axios";
import React, { useEffect, useState } from "react";
import GuestCaracter from "./GuestCaracter";

const EpisodeList = (props) => {

    const [error, setError] = useState(null);

    const [episode, setEpisode] = useState([]);


    useEffect(() => {
        getEpisode();
    }, []);

    const getEpisode = async () => {
        const url = `https://api.tvmaze.com/seasons/${props.sezonId}/episodes?embed=guestcast`

        try {
            const response = await axios.get(url);

            const data = response.data;

            console.log("iz episodeList lista", data)
            setEpisode(data);
        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            {episode.map((epis) => (
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <p>{epis.number}</p>
                            <p>{epis.airdate}</p></td>
                        <td className="episName">{epis.name}</td>
                        <td>
                            <img className="imgSezons"
                                src={epis.image?.medium} />
                        </td>
                        <td >{epis.summary?.replace('<p>', '').replace('</p>', '')}</td>

                    </tr>

                    <GuestCaracter embedded={epis?._embedded.guestcast} />


                </tbody>




            ))}
        </>
    )


}
export default EpisodeList;