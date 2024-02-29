import React, { useState } from "react";

const ResultsTvTime = (props) => {

    // const [vreme, setVreme] = useState([]);

    const time = (props.datum)
    const date = new Date(time * 1000);

  
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

return (
    <>
    <td >
       Updated: {" " + day + "." + month + "." + year}
    </td>
    </>
)

}
export default ResultsTvTime;