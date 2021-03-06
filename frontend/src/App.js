import React, { Component } from 'react';
// import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/sandstone/bootstrap.css";
import './App.css';
import { NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
// let request = require('request');

const PLACES = [
  {name: 'Cilantro', zip: '94110'},
  {name: 'Thai basil', zip: '94110'},
  {name: 'Rosemary', zip: '94110'}
];

class WeatherDisplay extends Component {
  constructor () {
    super();
    this.state = { weatherData: null };
  }
  componentDidMount () {
    const zip = this.props.zip;
    console.log(zip);
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + zip + '&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial';
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render () {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Let me pull this up... One moment please</div>;
    return (
      <div>
        <h1> Chart should go here </h1>
      </div>
    );
  }
}

class MiniWeatherDisplay extends Component {
  constructor () {
    super();
    this.state = { weatherData: null };
  }
  componentDidMount () {
    const zip = this.props.zip;
    console.log(zip);
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + zip + '&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial';
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render () {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <span>Let me pull this up... One moment please</span>;
    const weather = weatherData.weather[0];
    return (
        <span>
        current temp in {weatherData.name} is {weatherData.main.temp}° | forecast: {weather.description}
        </span>
      );
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = { activePlace: 0 };
  }
  render () {
    const activePlace = this.state.activePlace;
    return (
    <div>
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="index.html">rootkit v.1</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
          <ul className="nav navbar-nav">
          <li><a href="index.html"> Actions </a></li>
          <li className="active"><a href="index.html"> Settings <span className="sr-only">(current)</span></a></li>
          <li className="dropdown">
            <a href="index.html" className="dropdown-toggle" data-toggle="dropdown" role="button" >I want to... <span className="caret"></span></a>
            <ul className="dropdown-menu" role="menu">
              <li><a href="index.html">Retake readings</a></li>
              <li><a href="index.html">Water a plant</a></li>
              <li><a href="index.html">See my garden</a></li>
              <li className="divider"></li>
              <li><a href="index.html">Separated link</a></li>
              <li className="divider"></li>
              <li><a href="index.html">One more separated link</a></li>
            </ul>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="index.html"><MiniWeatherDisplay key={activePlace} zip={PLACES[activePlace].zip}/></a></li>
          </ul>
        </div>
      </div>
    </nav>
      <Grid>
        <Row>
          <Col md={4} sm={4}>
            <h4>Select a plant</h4>
            <Nav bsStyle="pills" stacked activeKey={activePlace}
            onSelect={index => {this.setState({ activePlace: index });}}
            >
            {PLACES.map((place, index) => (
              <NavItem key={index} eventKey={index}> {place.name}</NavItem>
              ))}
            </Nav>
          </Col>
          <Col md={8} sm={8}>
            <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip}/>
          </Col>
        </Row>
      </Grid>
    </div>
  );
  }
}

export default App;
