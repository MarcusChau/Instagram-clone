import React from "react";
import './css/Button.css';


// Button function
const Button = (prop) => {

    return (

        <button className={prop.className} onClick={prop.do}>{prop.name}</button>
    );
}

export default Button;
