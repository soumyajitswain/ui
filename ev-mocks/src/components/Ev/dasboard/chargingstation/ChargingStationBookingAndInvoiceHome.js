import Banner from '../../../Home/Banner';
import React from 'react';
import agent from '../../../../agent';
import { connect } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../../../constants/actionTypes';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Form, ProgressBar, Row } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import Payment from './invoice/payment';

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

const client = new W3CWebSocket('ws://127.0.0.1:8000'); 

class ChargingStationBookingAndInvoiceHome extends React.Component {
   
  componentDidMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log('Messgae from server '+message.data)
    };
    client.onclose = () => {
      console.log('closed')
      this.setState({
        client: new W3CWebSocket('ws://127.0.0.1:8000')
      })
     
    };
  }

  handleClick = () => {
     client.send('hello');
  };

  render() {
    return (
      <div className="home-page">

        <Banner token={this.props.token} appName={this.props.appName} />

        <Container>
          <Row>
            <Button onClick={this.handleClick}>Test websocket</Button>
          </Row>
          <Row>
            <ChargingStationBooking />
          </Row>
          <div style={{'height':'20px'}}></div>
          <Row>
            <ManageCharging />
          </Row>
          <Row>
            <Payment></Payment>
          </Row>
        </Container>

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
<Card>
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
