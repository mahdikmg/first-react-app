import React from "react"
export default class LoadingAnimation extends React.Component {
    render() {
        return (
            <div className={"h-100 w-100 d-flex align-items-center justify-content-center"}>
                <div className="spinner-grow text-danger" role="status" />
                <div className="spinner-grow text-warning" role="status" />
                <div className="spinner-grow text-info" role="status" />
            </div>
        )
    }
}
