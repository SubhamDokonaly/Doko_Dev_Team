import React from "react";
import './BookingDetail.css';
import { AiOutlineInfoCircle } from "react-icons/ai";
import ContainerFillingStatus from "../ContainerFillingStatus/ContainerFillingStatus";
import FireLogo from './firelogo.svg';

function BookingDetail({ portName, cbm, startPrice, currentPrice, chargeOne, chargeTwo, chargeThree, nowValue, trendingStatus }) {
    return (
        <div className="detailcon">
            <div className="detaildiv">
                <div className="portalignments">
                    <div>
                        <h1 className="portsdetail">{portName}</h1>
                        <p className="cbmsdetail">CBMs Available <span>{cbm}</span> </p>
                    </div>
                    {trendingStatus === 0 &&
                        ''
                    }
                    {trendingStatus === 1 &&
                        <div className="trendingdiv">
                            <img src={FireLogo} alt="FireLogo" />
                            <p>Trending</p>
                        </div>
                    }
                    {trendingStatus === 2 &&
                        <div className="fillingdiv">
                            <img src={FireLogo} alt="FireLogo" />
                            <p>Filling Fast</p>
                        </div>
                    }
                </div>
                <div className="containerdetail">
                    <div>
                        <ContainerFillingStatus now={nowValue} />
                        <h5 className="containertxt">Container Filled so far</h5>
                    </div>
                    <div>
                        <h5 className="start">Start</h5>
                        <h1 className="startval">{startPrice}</h1>
                    </div>
                    <div>
                        <h5 className="start">Current</h5>
                        <h1 className="startval d-flex align-items-center"><AiOutlineInfoCircle color="#1E6AFF" className="infoicon" />{currentPrice}</h1>
                    </div>
                </div>
                <div className="chargeinclude">
                    <p className="chargeincludetxt">Origin + Freight + Destination charges included</p>
                </div>
            </div>
            <div className="vesseldiv">
                <div className="containerdetail">
                    <h5 className="vesseltxt">Charge #01</h5>
                    <h1 className="vesselval">{chargeOne}</h1>
                </div>
                <div className="containerdetail">
                    <h5 className="vesseltxt">Charge #02</h5>
                    <h1 className="vesselval">{chargeTwo}</h1>
                </div>
                <div className="containerdetail">
                    <h5 className="vesseltxt">Charge #03</h5>
                    <h1 className="vesselval">{chargeThree}</h1>
                </div>
            </div>

        </div>
    )
};

export default BookingDetail;
