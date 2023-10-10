import {ThreeCircles} from "react-loader-spinner";
import React from "react";
import './style.scss';

const Spinning = () => {
    return (
        <div className={"Spinning"}>
            <ThreeCircles
                height="100"
                width="100"
                color="#FF9900"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </div>
    );
};

export default Spinning;