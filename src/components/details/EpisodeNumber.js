import React, { useState } from "react";

const EpisodeNumber = (props) => {





    return (
        <><tr>
            <td colSpan={2}>
                <div className="sezone">
                    {props.sezones.map((sezone) => (

                        <p key={sezone.id}>
                            {"Sezone: " + sezone.number + " Episode: " + sezone.episodeOrder}
                        </p>

                    ))}
                </div>
            </td>
        </tr>
         
                

           
        </>
    )

}
export default EpisodeNumber;