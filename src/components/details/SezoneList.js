import React from "react";
import EpisodeList from "./EpisodeList";

const SezoneList = (props) => {


    return (
        <>
            {props.sezone.map((sezon) => (
                <table className="showMain">
                    <tbody>
                        <tr>
                            <td className="sezonNum">{sezon.number}</td>
                            <td className="sezonDate">
                                {sezon.premiereDate + " to " + sezon.endDate}</td>
                            <td>{sezon.episodeOrder} ep.</td>
                            <td>
                                <img className="imgSezons"
                                    src={sezon.image?.medium} />
                            </td>
                            <td className="summaryEpis"
                            >{sezon.summary?.replace('<p>', '').replace('</p>', '')}</td>
                        </tr>
                    </tbody>
                    <EpisodeList sezonId={sezon.id} />

                </table>
            ))}
        </>
    )


}
export default SezoneList;