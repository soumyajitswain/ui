import Banner from '../../../Home/Banner';
import React from 'react';
import agent from '../../../../agent';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../../../constants/actionTypes';
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';

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
    dispatch({ type: HOME_PAGE_UNLOADED })
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
            <ChargingStationBooking />
          </div>
          <div style={{'height':'20px'}}></div>
          <div className="row">
            <ManageCharging />
          </div>
        </div>

      </div>
    );
  }
}

const ChargingStationBooking = props => {
  const chargingStationList = [
    { label: 'Charging Station 1', value: 'ChargingStation1' },
    { label: 'Charging Station 2', value: 'ChargingStation2' },
    { label: 'Charging Station 3', value: 'ChargingStation3' }];

  const clickHandler = (ev, f) => {
    ev.preventDefault();
  }
  return (

    <MDBContainer fluid>

      <MDBRow>
        <MDBCol md='3' className='col-example'>
        </MDBCol>
        <MDBCol md='6'>
          <div className="row">
            <div className="col">
              <div className="text-gray-light"><h3>Charging Stations:</h3></div>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md='3' className='col-example'>
        </MDBCol>
        <MDBCol md='6'>
          <Form >
            <Form.Group className="mb-10" controlId='ChargingStationName'>
              <Form.Label>Charging Station Name</Form.Label>
              <Form.Control type="text" placeholder='Choose Name'></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId='customerId'>
              <Form.Label>Customer Id</Form.Label>
              <Form.Control type="text" placeholder='Customer Id'></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId='scheduledTime'>
              <Form.Label>Scheduled Time</Form.Label>
              <Form.Control type="text" placeholder='Scheduled Time'></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId='connected'>
              <Form.Label>Connected?</Form.Label>
              <Form.Control type="text" placeholder='connected'></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId='expectedUnit'>
              <Form.Label>Expected Unit</Form.Label>
              <Form.Control type="text" placeholder='expectedUnit'></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId='connected'>
              <Form.Label>Start/Stop Transaction</Form.Label>
              <Form.Control type="text" placeholder='Transaction'></Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit'>Submit</Button>
          </Form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

  );
};

const ManageCharging = props => {

  const clickHandler = (ev, f) => {
    window.location = "/invoice";
    ev.preventDefault();
  }
  return (

    <MDBContainer>
      <MDBRow>
        <MDBCol md='3'></MDBCol>
        <MDBCol md='6'>
          <div className="text-gray-light"><h3>Charging Stations:</h3></div>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md='3'></MDBCol>
        <MDBCol md='6'>
          <Form>
              Track the meter changes
          </Form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChargingStationBookingAndInvoiceHome);
