import React, { useState } from "react";

const EpisodeNumber = (props) => {





    return (
        <>
                <div className="sezone">
            {props.sezones.map((sezone) => (
                    <p colSpan={2} >
                        {"Sezone: " + sezone.number + " Episode: " + sezone.episodeOrder}
                    </p>

))}
</div>
        </>
    )

}
export default EpisodeNumber;