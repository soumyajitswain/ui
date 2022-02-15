//https://bootsnipp.com/snippets/qrqGM
import React from "react";
import styles from './RouteDashboard.css';
import { Button } from 'react-bootstrap';

const RouteDasboard = props => {
    const clickHandler = (ev, f) => {
       
        ev.preventDefault();
    }
    return (

        <div id="invoice">

            <div className="invoice">
                <div style={{ 'minWidth': '600px' }}>
                    <main>
                        <div className="row contacts">
                            <div className="col invoice-to">
                                <div className="text-gray-light"><h3>Route Information:</h3></div>
                                <h4 className="to">Bangalore</h4>
                                <div className="address"><h4>Chennai 79273, US</h4></div>
                            </div>
                            <div className="col invoice-details">
                                <h1 className="invoice-id">Total Routes</h1>
                                <div className="date">4</div>
                                <div className="date">Trip end datetime: 30/10/2018</div>
                            </div>
                        </div>
                        <table border="0" cellSpacing="0" cellPadding="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th className="text-left">Destinations</th>
                                    <th className="text-right">Distance (Km)</th>
                                    <th className="text-right">Pollution</th>
                                    <th className="text-right">Cost</th>
                                    <th className="text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="no">01</td>
                                    <td className="text-left">
                                        <h3>
                                            Bangalore - Chennai - NH75 </h3>
                                    </td>
                                    <td className="unit">10</td>
                                    <td className="qty">100</td>
                                    <td className="total">100</td>
                                    <td className="unit"><Button variant="secondary" onClick={(ev)=> clickHandler(event, 'true')}>Select</Button></td>
                                </tr>
                                <tr>
                                    <td className="no">02</td>
                                    <td className="text-left"><h3>Bangalore - Hosur - Chennai - NH48</h3></td>
                                    <td className="unit">360</td>
                                    <td className="qty">30</td>
                                    <td className="total">200</td>
                                    <td className="unit"><Button variant="secondary" onClick={clickHandler}>Select</Button></td>
                                </tr>
                            </tbody>
                        </table>
                    </main>
                </div>

            </div>
        </div>

    );
};
export default RouteDasboard;  