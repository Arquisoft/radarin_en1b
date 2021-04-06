import React, { useState } from 'react';
function AddLocationForm() {

  const [lati, setLati] = useState(0);
  const [long, setLong] = useState(0);
  const [value, setValue] = useState("");
  const [localizationDescription, setLocalizationDescription] = useState("");

    const handleChangeName = (event) => {
      setValue(event.target.value);
      geolocateUser();
    };

    const handleChangeDescription = (event) => {
      setLocalizationDescription(event.target.value);
      geolocateUser();
    };
  
    const handleSubmit = (event) => {
      obtainUserLocation();
      alert('A new localization was added: ' + value);
      event.preventDefault();
    };

    const obtainUserLocation = () => {
      geolocateUser();
      console.log("latitude = " + lati);
      console.log("longitude = " + long);
      console.log("name = " + value);
      console.log("description = " + localizationDescription);
      resetState();
  };

  const resetState = () => {
    setValue("");
    setLocalizationDescription("");
    setLong(0);
    setLati(0);
  };

  const geolocateUser = () => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      setLati(position.coords.latitude);
      setLong(position.coords.longitude);
      if (lati === 0 || long === 0) {
          setTimeout(geolocateUser, 1000);
      }
    }, console.log);
  };
      return (
        <div> 
            <form onSubmit={handleSubmit}>
                <label>Name of the location: 
                   <input type="text" value = {value} onChange={handleChangeName}/> 
                </label>
                <br/>
                <label>Description of the location:  
                   <input type="text" value = {localizationDescription} onChange={handleChangeDescription}/>
                </label>
                <br/>
                <button onClick={handleSubmit}>Add new location</button>
           </form>
       </div>
    );
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export default AddLocationForm;