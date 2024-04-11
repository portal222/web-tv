import React from "react";
import EpisodeList from "./EpisodeList";

const SezoneList = (props) => {


    return (
        <>
            {props.sezone.map((sezon) => (
                <div>
                    <div className="sezoneList">
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="sezonNum">S{sezon.number}</td>
                                        <td className="sezonDate">
                                            {sezon.premiereDate + " to " + sezon.endDate}</td>
                                        <td>{sezon.episodeOrder} ep.</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div>
                            <img className="imgSezons"
                                src={sezon.image?.medium} />
                        </div>



                      <div className="summEpis"
                        >{sezon.summary?.replace('<p>', '').replace('</p>', '').replace('<b>', '').replace('</b>', '')
                            .replace('<i>', '').replace('</i>', '').replace('<i>', '').replace('</i>', '')}
                        </div>
                       
                    </div>
                    <EpisodeList sezonId={sezon.id} />

                </div>

            ))}
        </>
    )


}
export default SezoneList;