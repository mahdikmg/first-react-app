import React from "react";

import SetData from "./setData";
import Maps from "./map"

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`); // to fix 100vh bug on chrome android - part 1 - part 2 in index.css

export default class FirstPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coordinates: []
        }
    }

    handleMapData = (data) => {
        this.setState({
            coordinates: data  // handle map data to send it as a prop to form component
        })
    }

    render() {
        return (
            <div className={"container-fluid"}>
                <div className={"row flex-xs-row-reverse flex-sm-row-reverse"}>
                    <div className={"col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 dir-ltr p-0 map"}>
                        <div className="py-3 d-block position-absolute map-info w-100 text-center">
                            <span>لطفا موقعیت خود را در نقشه مشخص کنید</span>
                        </div>
                        <Maps dataFromMap = {this.handleMapData} /> {/* get map coordinates from map component */}
                        <a className="btn rounded-0 d-block d-sm-block d-md-none d-lg-none d-xl-none position-absolute
                        next-part-button py-2 w-100" href={"#setDataSection"}>
                            تایید موقعیت
                        </a>
                    </div>
                    <div className={"col-12 col-md-6 col-lg-6 col-xl-6 p-xl-5 p-lg-5 p-md-5 p-sm-0 p-xs-0"} id={"setDataSection"}>
                        <SetData getMapData = {this.state.coordinates} /> {/* send map coordinates to form component */}
                    </div>
                </div>
            </div>
        )
    }
}
