import React, {Component}  from 'react';
import map from '../static/united.svg';
import info from '../static/info.svg';
import '../css/Notification.css';

export default class Notification extends Component {
    constructor(props){
        super();
    }

    handleClick(){
        var div = document.getElementById('notification');
        if(div !== undefined)
            div.remove();
    };

    componentDidMount(){
        setTimeout(() => {
            this.handleClick();
        }, 2500);
    };

    render(){
        var icon = '';
        if ( this.props.icon === 'info'){
            icon = info;
        }else {
            icon = map;
        }
        return (
            <div id='notification'>
                <div className={'notification-container'}  >
                        <div 
                            className={'notification toast'}
                        >
                            <div className="notification-image">
                                <img src={icon} alt="" />
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
    };
}