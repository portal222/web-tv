import React from "react";

import SearchTvShow from "./SearchTvShow.js";
import SearchActors from "./SearchActors.js";
// import SearchTvShowSingl from "./SearchTvShowSingl.js";




const SearchPlaceTv = () => {

    return (

        <div className="place">
            <div className="placeBut">

                <SearchTvShow placeholder={'Tv Show'} linkTo={'/tvShow'} />
                <SearchActors placeholder={'Tv Actor'} linkTo={'/tvActor'} />
                {/* <SearchTvShowSingl placeholder={'One Show'} linkTo={'/tvShowSingl'} /> */}
            </div>





        </div>
    )

}
export default SearchPlaceTv;