import Banner from '../../../Home/Banner';
import React from 'react';
import agent from '../../../../agent';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

class ChargingStationBookingAndInvoiceHome extends React.Component {
  componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token ?
      agent.Articles.feed :
      agent.Articles.all;

    this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  
  render() {
    return (
      <div className="home-page">

        <Banner token={this.props.token} appName={this.props.appName} />

        <div className="container page">
          <div className="row">
           
          </div>
        </div>

      </div>
    );
  }
}

const ChargingStationBooking = props => {
  
  const clickHandler = (ev, f) => {
    window.location = '/charging';
      ev.preventDefault();
  }
  return (

      <div id="invoice">

          <div className="invoice overflow-auto">
              <div style={{ 'minWidth': '600px' }}>
                  <main>
                      <div className="row contacts">
                          <div className="col invoice-to">
                              <div className="text-gray-light"><h3>Charging Stations:</h3></div>
                          </div>
                      </div>
                      <table border="0" cellSpacing="0" cellPadding="0">
                          <thead>
                              <tr>
                                  <th>#</th>
                                  <th className="text-left">Name</th>
                                  <th className="text-right">Address </th>
                                  <th className="text-right">Distance (Km)</th>
                                  <th className="text-right">Charging Points</th>
                                  <th className="text-right">Available</th>
                                  <th className="text-right">Schedule</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td className="no">01</td>
                                  <td className="text-left">
                                  Charzer Charging Station
                                  </td>
                                  <td className="unit">Electric vehicle charging station Shop No, 202, Kodigehalli Mai</td>
                                  <td className="qty">10</td>
                                  <td className="unit">CHAdeMO (1)</td>
                                  <td className="total">CHAdeMO (1)</td>
                                  <td className="unit"><Button variant="secondary" onClick={(ev) => clickHandler(ev, 'true')}>Book</Button></td>
                              </tr>
                              <tr>
                                  <td className="no">02</td>
                                  <td className="text-left">Charge And Drive Charging Station</td>
                                  <td className="unit"><h3>Electric vehicle charging station
                                      1, 2nd Main Rd · +46 20 46 00 46
                                      Open 24 hours</h3></td>
                                  <td className="qty">20</td>
                                  <td className="unit">CHAdeMO (1), CCS (1)</td>
                                  <td className="total">CHAdeMO (1)</td>
                                  <td className="unit"><Button variant="secondary" onClick={clickHandler}>Book</Button></td>
                              </tr>
                          </tbody>
                      </table>
                  </main>
              </div>

          </div>
      </div>

  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChargingStationBookingAndInvoiceHome);
