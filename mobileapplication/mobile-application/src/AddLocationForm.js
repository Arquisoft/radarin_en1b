import React, { Component } from 'react';

const initialState = {
  value: "",
  localizationDescription: "",
  latitude: 1,
  longitude: 1
};

class AddLocationForm extends Component{

    constructor(props){
        super(props);
        this.lati = 0;
        this.long = 0;
        this.state = initialState;
 
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
      this.setState({value: event.target.value});
      //console.log("name =" + this.state.value);
    }

    handleChangeDescription(event) {
      this.setState({localizationDescription: event.target.value});
      //console.log("description =" + this.state.localizationDescription);
    }
  
    handleSubmit(event) {
      this.obtainUserLocation();
      alert('A new localization was added: ' + this.state.value);
      event.preventDefault();
    }

    obtainUserLocation() {
      this.geolocateUser();
      console.log("latitude = " + this.state.latitude);
      console.log("longitude = " + this.state.longitude);
      console.log("name = " + this.state.value);
      console.log("description = " + this.state.localizationDescription);
      //aqui se mete
      this.resetState();
  }

  resetState() {
    this.setState(initialState);
  }

  geolocateUser() {
    window.navigator.geolocation.getCurrentPosition((position) => {
      this.lati = position.coords.latitude;
      this.long = position.coords.longitude;
      this.setState({latitude: this.lati});
      this.setState({longitude: this.long});
      if (this.state.latitude == 1 || this.state.longitude == 1) {
          console.log("no cargo");
          setTimeout(this.geolocateUser, 1000);
      }
    }, console.log);
  }

    render() {
      return (
        <div> 
            <form onSubmit={this.handleSubmit}>
                <label>Name of the location: 
                   <input type="text" value = {this.state.value} onChange={this.handleChangeName}/> 
                </label>
                <br/>
                <label>Description of the location:  
                   <input type="text" value = {this.state.localizationDescription} onChange={this.handleChangeDescription}/>
                </label>
                <br/>
                <button onClick={this.handleSubmit}>Add new location</button>
           </form>
       </div>
    );
    }
}

export default AddLocationForm;