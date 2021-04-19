import React, {Component}  from 'react';
import icon from '../static/united.svg';
import '../css/Notification.css';

export default class Notification extends Component {
    constructor(props){
        super();
        
    }

    handleClick(){
        var div = document.getElementById('notification');
        div.remove();
    }

    render(){
            return (
                <div id='notification' onClick={() => this.handleClick(this)}>
                    <div className={'notification-container'}  >
                                <div 
                                    className={'notification toast'}
                                >
                                    <div className="notification-image">
                                        <img src={icon} alt="" />
                                    </div>
                                    <div>
                                        <p className="notification-title">
                                            A friend is near you:
                                        </p>
                                        <p className="notification-message">
                                            {this.props.name}
                                        </p>
                                    </div>
                                </div>
                    </div>
                </div>
            );

    }
}