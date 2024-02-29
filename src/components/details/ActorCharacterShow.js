import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const ActorCharacterShow = (props) => {
    const [error, setError] = useState(null);
    const [serije, setSerije] = useState([]);
    const [show, setShow] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        getSerije();
    }, []);


    const getSerije = async () => {

        const urlCast = `${props.show}`


        try {

            const responseCast = await axios.get(urlCast);

            const dataCast = responseCast.data;

            console.log("show karaktera glumca", dataCast);

            setShow(dataCast);


        } catch (err) {
            setError(err);


        }
    };

    const clickShow = (showId) => {
        const LinkTo = `/showDetails/${showId}`;
        navigate(LinkTo);

    }



    return (
        <>
      
            <div>

                <p className="clickShow"
                    onClick={() => clickShow(show.id)}>
                    {show.name}
                </p>
                <p>{show.premiered}</p>
                <ul className="genres">
                    <li>{show.genres?.[0]}</li>
                    <li>{show.genres?.[1]}</li>
                    <li>{show.genres?.[2]}</li>
                    <li>{show.genres?.[3]}</li>

                </ul>

            </div>












        </>
    );
};
export default ActorCharacterShow;