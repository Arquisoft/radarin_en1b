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
            <div id="notification-for-the-map" className={this.props.type=== "map" ? "hide-notification-map": "hide-notification"}>
                <div id="notification-container" className={this.props.type=== "map" ? "notification-container-map": "notification-container"}>
                        <div className={this.props.type=== "map" ? "notification-map": "notification"}>
                            <div className= {this.props.type=== "map" ? "notification-image-map" : "notification-image"}>
                                <img src={img} className="margin-img" alt="" />
                            </div>
                            <div>
                                <p className={this.props.type=== "map" ? "notification-title-map" : "notification-title"}>
                                    {this.props.title}
                                </p>
                                <p className={this.props.type=== "map" ? "notification-message-map" : "notification-message"}>
                                    {this.props.message}
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}