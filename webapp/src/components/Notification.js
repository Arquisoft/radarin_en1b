import React, {Component}  from "react";
import map from "../static/removeLocation.png";
import "../css/Notification.css";

export default class Notification extends Component {
    constructor(props){
        super();
    }

    render(){
        return (
            <div id="notification-for-the-map" className="hide-notification">
                <div className="notification-container">
                        <div className="notification">
                            <div className="notification-image">
                                <img src={map} className="margin-img" alt="" />
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