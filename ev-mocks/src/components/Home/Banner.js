import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import earth from '../../img/earth.jpg';
import earth1 from '../../img/earth1.jpg';


const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    /**  <div className="banner">
       <div className="container">
         <h1 className="logo-font">
           {appName}
         </h1>
         <p>Transition into a greener world.</p>
       </div>
     </div>*/
    <div style={{ display: 'block', width: '100%', padding: 30 }}>
      <h4>Sutainable solution provider</h4>
      <Carousel>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src={earth}
            alt="Image One" style={{'height':'500px'}}
          />
          <Carousel.Caption>
            <h3>Reach us for complete EV solution</h3>
            <p>EvViron</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={earth1}
            alt="Image Two" style={{'height':'500px'}}
          />
          <Carousel.Caption>
            <h3>Reach us for complete EV solution</h3>
            <p>EvViron</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>

  );
};

export default Banner;
