import React, {Component}  from "react";
import locationAdded from "../static/location-added.png";
import locationNotAdded from "../static/location-not-added.png";
import friend from "../static/united.svg";
import "../css/Notification.css";

export default class Notification extends Component {
    constructor(props){
        super();
    }

    render(){
        var img;
        if (this.props.icon === "locationAdded")  {
            img = locationAdded;
        } else if (this.props.icon === "locationNotAdded") {
            img = locationNotAdded;
        } else {
            img = friend;
        }
        return (
            <div id="notification-for-the-map" className="hide-notification">
                <div id="notification-container" className={this.props.animation}>
                        <div className="notification">
                            <div className="notification-image">
                                <img src={img} className="margin-img" alt="" />
                            </div>
                            <div>
                                <p className="notification-title">
                                    {this.props.title}
                                </p>
                                <p className="notification-message">
                                    {this.props.message}
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}