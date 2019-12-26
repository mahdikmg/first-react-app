import React from "react"
import Map from 'pigeon-maps'
import Draggable from 'pigeon-draggable'

export default class Maps extends React.Component {
    constructor(props) {
        super(props);
        this.state = { /* set default value */
            lat: 35.699582,
            lng: 51.337670,
            zoom: 15
        };
    }

    handleDrag(lat, lng, zoom) {
        this.setState({
            lat: lat,
            lng: lng,
            zoom: zoom
        })
        this.sendDataToForm() /* update form data every time coordinate changes */
    }

    sendDataToForm = () => {
        this.props.dataFromMap([this.state.lat, this.state.lng]); /* send data to parent */
    }

    render() {
        return (
            <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}
                 onBoundsChanged={(e) => this.handleDrag(e.center[0], e.center[1], e.zoom)}
                 onClick={(e) => this.handleDrag(e.latLng[0], e.latLng[1], this.state.zoom)}>

                {/* draggable marker */}
                <Draggable
                    className={"drag-icon"}
                    anchor={[this.state.lat, this.state.lng]}
                    onDragEnd={(e) => this.handleDrag(e[0], e[1])}>
                    <span className={"icon icon-pin"}/>
                </Draggable>

            </Map>
        )
    }
}
