import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';








const ResultsActorCelebs = (props) => {
    const [error, setError] = useState(null);
    const [celebrity, setCelebrity] = useState([]);
    const [results, setResults] = useState([]);







    useEffect(() => {
        getCelebs();
    }, []);


    const getCelebs = async () => {
        const url = `https://api.api-ninjas.com/v1/celebrity?name=${props.celebName}`;



        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );


            const data = response.data;




            console.log("rezultat poznatih", data)
            setCelebrity(data[0]);
            setResults(data.length);
        } catch (err) {
            setError(err);

        }

    };


    // const handleClick = (personName) => {

    //     const LinkTo = `/personImage/${personName}`;
    //     navigate(LinkTo);
    // }


    if (results == 0) {
        return (
            <>


                <tr>
                    <td colSpan={2}>No data in Celebrity Base</td>
                </tr>
                <tr>
                    <td colSpan={2}></td>
                </tr>
                <tr>
                    <td colSpan={2}></td>
                </tr>
            </>

        )
    }
    return (
        <>

            <tr>
                <td className="nameComm">{celebrity.age} age </td>

                <td className="nameComm">
                    <ul>
                        <li>{celebrity.occupation?.[0]}</li>
                        <li>{celebrity.occupation?.[1]}</li>
                        <li>{celebrity.occupation?.[2]}</li>
                        <li>{celebrity.occupation?.[3]}</li>
                        <li>{celebrity.occupation?.[4]}</li>
                        <li>{celebrity.occupation?.[5]}</li>
                        <li>{celebrity.occupation?.[6]}</li>
                        <li>{celebrity.occupation?.[7]}</li>
                        <li>{celebrity.occupation?.[8]}</li>
                        <li>{celebrity.occupation?.[9]}</li>
                        <li>{celebrity.occupation?.[10]}</li>
                        <li>{celebrity.occupation?.[11]}</li>
                        <li>{celebrity.occupation?.[12]}</li>
                    </ul>
                </td>
            </tr>
            {/* <tr>
                            <td className="navod">Birthday:</td>
                            <td className="nameComm">{celebrity.birthday}</td>

                        </tr>
                        <tr>
                            <td className="navod">Death:</td>
                            <td className="nameComm">{celebrity.death}</td>

                        </tr> */}
            {/* <tr>
                            <td className="navod">Nationality:</td>
                            <td className="celebrity">{celebrity.nationality}</td>

                        </tr> */}
            <tr>
                <td className="navod">Height:</td>
                <td className="nameComm">{celebrity.height}</td>

            </tr>
            <tr>
                <td className="navod">Net worth:</td>
                <td className="nameComm">{celebrity.net_worth}</td>
            </tr>







        </>
    );
};
export default ResultsActorCelebs;