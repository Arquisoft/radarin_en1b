import React, {Component}  from 'react';
import map from '../static/removeLocation.png';
import '../css/Notification.css';

export default class Notification extends Component {
    constructor(props){
        super();
    };

    componentDidMount(){
        setTimeout(() => {
            document.getElementById('notification-for-the-map').remove();
        }, 3500);
    };


    render(){
        return (
            <div id='notification-for-the-map'>
                <div className='notification-container'>
                        <div className='notification toasts'>
                            <div className="notification-image">
                                <img src={map} className='margin-img' alt="" />
                            </div>
                            <div className='text-adjust'>
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
    };
}