import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import "./ContainerFillingStatus.css";

function ContainerFillingStatus({now}) {
    return <ProgressBar striped className='procss' now={now} label={`${now}%`} />;
}
export default ContainerFillingStatus;