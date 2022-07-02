import Banner from '../../../Home/Banner';
import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import agent from '../../../../agent';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../../../constants/actionTypes';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Form, ProgressBar, Row } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import Payment from './invoice/payment';
import WebSocketDemo from './WebsocketClient';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
  messageHistory: state.messageHistory
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({ type: HOME_PAGE_UNLOADED })
});

const ChargingStationBookingAndInvoiceHome = (props) => {
  const [socketUrl, setSocketUrl] = useState('ws://localhost:7000');
  const [messageHistory, setMessageHistory] = useState([]);

  const [authRequest, setAuthRequest] = useState(['{"action":"Authorize", "user_id":"1234"}'])
  const [chargeStation, setChargeStation] = useState(['{"action":"ChargeStation", "user_id":"1234", "func":"GetAllChargeStations"}'])
  const [chargeStationConnector, setChargeStationConnector] = useState(['{"action":"ChargeStation", "user_id":"1234", "func":"ConnectorDetailByChargeBox", "charge_box_id":"1"}'])

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (messageHistory.length == 0) {
      sendMessage(authRequest);
      sendMessage(chargeStation);
    }
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }

    return () => {
      setMessageHistory([]);
    }
  }, [lastMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div className="home-page">

      <Banner token={props.token} appName={props.appName} />

      <Container>
        <Row>

          <Col md='3' lg='3' className='col-example'>
            {/** 
            <p>
              {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
              <ul>
              {messageHistory.map((message, idx) => (
                <span key={idx}>{message ? message.data : null}</span>
              ))}
            </ul>
            </p>
                */}
          </Col>
          <Col md='4' lg='7' className='col-example'>

          </Col>
          <Col md='2' lg='2' className='col-example' style={{ textAlign: 'right' }}>
            <span style={{ backgroundColor: connectionStatus == 'Open' ? 'green' : 'red' }}>{connectionStatus}</span>
          </Col>

        </Row>
        <Row>
          <ChargingStationBooking props={props} messageHistory={messageHistory} />
        </Row>
        <div style={{ 'height': '20px' }}></div>
        <Row>
          <ManageCharging />
        </Row>
        <Row>
          <Payment></Payment>
        </Row>
      </Container>

    </div>
  );

};

const ChargingStationBooking = ({ props, messageHistory }) => {
  const chargingStationList = [
    { label: 'Charging Station 1', value: 'ChargingStation1' },
    { label: 'Charging Station 2', value: 'ChargingStation2' },
    { label: 'Charging Station 3', value: 'ChargingStation3' }];

  const clickHandler = (ev, f) => {
    ev.preventDefault();
  }
  if (messageHistory != null) {
    console.log(props.messageHistory);
  }
  return (

    <MDBContainer fluid>
      <Card>
        <MDBRow>
          <MDBCol md='3' className='col-example'>
            <ul>
              {messageHistory.map((message, idx) => (
                <span key={idx}>{message ? message.data : null}</span>
              ))}
            </ul>

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
      </Card>
    </MDBContainer>

  );
};

const ManageCharging = props => {

  const clickHandler = (ev, f) => {
    window.location = "/invoice";
    ev.preventDefault();
  }
  return (

    <Container fluid='true' className='p-0 bgPrimary'>
      <Card>
        <Row>
          <Col md='3'></Col>
          <Col md='6'>
            <div className="text-gray-light"><h3>Charging Progress</h3></div>
          </Col>
        </Row>
        <Row>
          <Col md='3'></Col>
          <Col md='6'>
            <Form>
              <Form.Group className='mb-3' controlId='meterChargeId'>
                <p>Unit Consumed:1000</p>
                <p>Invoice Amount: <span>&#8377;</span>1000</p>
              </Form.Group>

              <Form.Group className='mb-3' controlId='meterChargeId'>
                <ProgressBar now='75' label='75%'></ProgressBar>
              </Form.Group>

              <Form.Group className='mb-3' controlId='meterChargeId'>
                <p>Charging Completed <b>Conditional</b></p>
              </Form.Group>

              <Row className='mb'>
                <Form.Group as={Col}>
                  <Button variant='primary'>Cancel</Button>
                </Form.Group>
                <Form.Group as={Col} >
                  <Button variant='secondary'>Payment</Button>
                </Form.Group>
              </Row>
            </Form>
          </Col>
        </Row>

      </Card>
    </Container>

  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChargingStationBookingAndInvoiceHome);
