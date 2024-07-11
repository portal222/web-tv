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

            const data = response.data.reverse();

            console.log("iz episodeList lista", data)
            setEpisode(data);
        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            {episode.map((epis) => (
                <div key={epis.id}>
                    <div className="sezoneList">
                        <div >
                            <p className="epNumber">E{epis.number}</p>
                            <p> {epis.airdate}</p>
                          
                            </div>
                        <div className="epName">{epis.name}</div>
                        <div>
                            <img className="imgSezons"
                                src={epis.image?.medium} />
                        </div>
                        <div className="summEpis">{epis.summary?.replace('<p>', '').replace('</p>', '').replace('<br>', '').replace('</br>', '')
                        .replace('<i>', '').replace('</i>', '').replace('<b>', '').replace('</b>', '').replace('<i>', '').replace('</i>', '').replace('<p>', '').replace('</p>', '')
                        .replace('<b>', '').replace('</b>', '')}</div>
                        

                    </div>

                    <GuestCaracter embedded={epis?._embedded.guestcast} />


                </div>




            ))}
        </>
    )


}
export default EpisodeList;