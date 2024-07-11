import React from "react";

import { PuffLoader } from 'react-spinners';

const Loader = () => {

    return (

        <div className="loader">
            <div>
                <PuffLoader size='170px'
                    color='dodgerblue'
                    speedMultiplier='0.3'
                />
            </div>
        </div>

    )

}
export default Loader;