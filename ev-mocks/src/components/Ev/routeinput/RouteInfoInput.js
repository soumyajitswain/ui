//Look at the option of using MDB.
//https://mdbootstrap.com/docs/b5/react/forms/overview/
//Use the simple react form 
import React, { useState, useEffect, setState } from 'react';


const RouteInfoInput = props => {

    //this.setState ( { source: '', destination:'', vehicleType:'' });
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [vehicleType, setVehicleType]  = useState("");
   
    const clickHandler = ev => {
      ev.preventDefault();
    }

    const submitForm = ev => {
        console.log(`Source : ${source} Destination : ${destination} vehicleType : ${vehicleType} `
                     );
      window.location.href = `/?source=${source}&destination=delhi&vehicleType=ICE`;
      ev.preventDefault();
    };
    
    return (
      <div className='auth-page'>
        <div className='container page'>
          <form onSubmit={submitForm}>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Source"
                value={source}
                onChange={e => setSource(e.target.value)}
              />
            </fieldset>
  
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="Destination"
                placeholder="Destination"
                value={destination}
                onChange={e => setDestination(e.target.value)}
              />
            </fieldset>
  
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="vehicleType"
                placeholder="VehicleType"
                value={vehicleType}
                onChange={e => setVehicleType(e.target.value)}
              />
            </fieldset>
            
            <fieldset className="form-group">
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
              >
              submit
              </button>
            </fieldset>  
          </form>
        </div>
      </div>
  
    );

  };

export default RouteInfoInput;  