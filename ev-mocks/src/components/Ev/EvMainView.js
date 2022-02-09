import React, { useState, useEffect, setState } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import SimpleMap from './Map/SimpleMap'; 
import RouteDasBoard from './dasboard/RouteDasboard';
import RouteInfoInput from './routeinput/RouteInfoInput';

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    }

    return (
      <li className="nav-item">
        <a href=""
          className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token,
  route: state.route
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});



//Display the complete information for the 
//npm install --save google-maps-react
const RouteInfoDetail = props => {
  const search = window.location.search;
  const source = new URLSearchParams(search).get('source');
  console.log(source);
  if (!source) {
    return null;
  }
  return (
    <div className='container'>
    <div id="map">
      <SimpleMap></SimpleMap>
    </div>
    
    </div>
  
  );
};


//Main method
const EvMainView = props => {


  return (
    <div className="col-md-12">
    <div className="col-md-9">
      <RouteInfoInput tab={props} onTabClick={props.onTabClick} />
    </div >  
    <div className="col-md-9">
      <RouteDasBoard tab={props}/>
    </div>  
    <div className="col-md-9">
      <RouteInfoDetail tab={props} onTabClick={props.onTabClick} />
    </div>
    </div>

   
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EvMainView);
