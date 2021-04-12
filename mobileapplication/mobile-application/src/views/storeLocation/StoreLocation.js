import React from 'react';
import AddLocationForm from '../../components/AddLocationForm';

const StoreLocation = props => {
  return (
    <div className="store-location">
      <h1>Store a favourite location</h1>
      <p>Here you can store your current location and save it a as a favourite location</p>
      <AddLocationForm />
    </div>
  );
};

export default StoreLocation;