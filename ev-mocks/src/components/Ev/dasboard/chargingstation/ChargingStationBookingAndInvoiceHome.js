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
import { Button, ButtonGroup, Card, CardGroup, Col, Container, Dropdown, Form, ProgressBar, Row } from 'react-bootstrap';
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
  const [chargeStationDetail, setChargeStationDetail] = useState([]);
  const [connectorResponse, setConnectorResponse] = useState([]);


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

      var message_json = JSON.parse(lastMessage.data);
      if (message_json.action == 'ChargeStation' && message_json.func == 'GetAllChargeStations') {
        setChargeStationDetail(message_json);
      } else if (message_json.action == 'ChargeStation' && message_json.func == 'ConnectorDetailByChargeBox') {
        setConnectorResponse(message_json);
      }


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

  const getConnectorDetail = (event) => {
    let req = '{"action":"ChargeStation", "user_id":"1234", "func":"ConnectorDetailByChargeBox", "charge_box_id":"cb_id"}';
    req = req.replace('cb_id', event.target.value);
    setChargeStationConnector([req]);
    sendMessage(req);

    console.log(req);
  }

  return (
    <div className="home-page">

      <Banner token={props.token} appName={props.appName} />

      <Container>
        <Row>

          <Col md='3' lg='3' className='col-example'>
            { }
          </Col>
          <Col md='4' lg='7' className='col-example'>

          </Col>
          <Col md='2' lg='2' className='col-example' style={{ textAlign: 'right' }}>
            <span style={{ backgroundColor: connectionStatus == 'Open' ? 'green' : 'red' }}>{connectionStatus}</span>
          </Col>

        </Row>
        <Row>
          <ChargingStationBooking getConnectorDetail={getConnectorDetail} messageHistory={messageHistory} connectorResponse={connectorResponse} chargeStationDetail={chargeStationDetail} sendMessage={sendMessage} lastMessage={lastMessage} />
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

const ChargingStationBooking = ({ getConnectorDetail, messageHistory, connectorResponse, chargeStationDetail, sendMessage, lastMessage }) => {

  const [chargeBoxSelection, setChargeBoxSelection] = useState('');
  const [connectorDetail, setConnectorDetail] = useState('');
  const [chargeBoxDetailLocal, setChargeBoxDetailLocal] = useState('');
  const [startTransactionReqLocal, setStartTransactionReqLocal] = useState('');

  let startTransactionRequest = JSON.parse('{"action":"StartTransaction", "user_id":"1234", "func":"start_transaction"}');

  useEffect(() => {
    async function loadChargeStationDetail() {
      const loadChargeStationPromise =
        chargeStationDetail.val.map((ix) => {
          return <option value={ix.charge_box_id}>{ix.charge_point_vendor}</option>
        });
      setChargeBoxDetailLocal(chargeStationDetail);
      Promise.all(loadChargeStationPromise).then(setChargeBoxSelection);
    }

    async function loadConenctorDetail() {
      var message_json = await connectorResponse;
      var val_json = message_json.val
      if (message_json.action == 'ChargeStation' && message_json.func == 'ConnectorDetailByChargeBox') {
        var chargeStationDetail = await chargeBoxDetailLocal.val.filter(k => k.charge_box_id === val_json[0][0].charge_box_id).map((ix) => {
          return (
            <Card>
              <Card.Title>{ix.charge_point_vendor}</Card.Title>
              <Card.Body>
                <Card.Text key={ix.charge_box_id}>Charge Box Unique Id:{ix.charge_box_id}</Card.Text>
                <Card.Text key={ix.ocpp_protocol}>OCPP Version:{ix.ocpp_protocol}</Card.Text>
                <Card.Text key={ix.charge_point_model}>Charge Point Model:{ix.charge_point_model}</Card.Text>
                <Card.Text key={ix.location_latitude}>Latitude:{ix.location_latitude}</Card.Text>
                <Card.Text key={ix.location_longitude}>Latitude:{ix.location_longitude}</Card.Text>
              </Card.Body>
              {startTransactionRequest.charge_box_id = ix.charge_box_id}
            </Card>
          )
        });

        setConnectorDetail(
          <Card style={{ width: '16rem' }}>
            <Card.Body>
              {chargeStationDetail}
              <Card.Text>Connector Id:{val_json[0][1].connector_id}</Card.Text>
              <Card.Text>Notes: {val_json[0][0].note}</Card.Text>
              <Card.Text>status:{val_json[0][2].status}</Card.Text>
              {startTransactionRequest.connector_pk = val_json[0][1].connector_pk}

            </Card.Body>
          </Card>
        )

      }
      setStartTransactionReqLocal(startTransactionRequest);
      return connectorDetail;
    }

    loadChargeStationDetail();
    loadConenctorDetail();
  }, [chargeStationDetail, messageHistory])

  const startTransactionFunction = (event) => {
    
    var startTransactionRequest1 = JSON.stringify(startTransactionReqLocal);
    console.log(startTransactionRequest1);
    sendMessage(startTransactionRequest1);
    console.log(lastMessage.data);
    event.preventDefault();
  };
  return (
    <Container fluid>
      <Card>
        <Row>
          <Col md='3' className='col-example'>
          </Col>
          <Col md='6'>
            <div className="row">
              <div className="col">
                <div className="text-gray-light"><h3>Charging Stations:</h3></div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md='3' className='col-example'>

          </Col>
          <Col md='6'>
            <Form >
              <Form.Group className="mb-10" controlId='ChargingStationName'>
                <Form.Label>Charging Station Name</Form.Label>
                <Form.Select aria-label='Default select example' onChange={(event) => getConnectorDetail(event)}>
                  {chargeBoxSelection}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId='customerId'>
                <Form.Label>Customer Id</Form.Label>
                <Form.Control type="text" placeholder='Customer Id'></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId='scheduledTime'>
                <Form.Label>Scheduled Time</Form.Label>
                <Form.Control type="text" placeholder='Scheduled Time'></Form.Control>
              </Form.Group>


              <Form.Group className="mb-3" controlId='expectedUnit'>
                <Form.Label>Expected Unit</Form.Label>
                <Form.Control type="text" placeholder='expectedUnit'></Form.Control>
              </Form.Group>

              <Button variant='primary' type='button' onClick={startTransactionFunction}>Submit</Button>
            </Form>
          </Col>
          <Col md='3' className='col-example' style={{ border: '0px solid black' }}>
            {connectorDetail}
          </Col>

        </Row>
      </Card>
    </Container>

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
