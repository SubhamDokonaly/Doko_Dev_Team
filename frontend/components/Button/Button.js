import React from 'react'

const Button = (props) => {
    console.log(props);
    return (
        <button type={props.type} className={props.className} onClick={props.onClick} data-bs-toggle={props.datatoggle} data-bs-target={props.datatarget}>{props.value}</button>
    )
}

export default Button;