import React, { Component } from 'react';
import Chart from 'chart.js'
import {Line as LineChart} from 'react-chartjs-2'
import Request from 'react-http-request'
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
var chartData =
{
labels: [],
datasets: [{
    label: 'Soil Moisture',
    data: [],
    backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
};
var chartOption =
{
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
};

class WeatherDisplay extends Component {
  constructor () {
    super();
    this.state = { weatherData: null };
    this.handleGet = this.handleGet.bind(this);
  }
  componentDidMount () {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"
    script.async = true;
    const zip = this.props.zip;
    console.log(zip);
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + zip + '&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial';
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
      this.handleGet();
  }
  handleGet() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !==4) {
        return;
      }
      if (request.status === 200) {
        console.log('success', request.responseText);
        var getResponse = JSON.parse(request.responseText)
        for(var i=getResponse.length-1; i >= 0; i--) {
          console.log("this is a test")
          chartData.labels.push(getResponse[i]["reading_date"])
          chartData.datasets[0].data.push(getResponse[i]["reading_value"])
        }

      } else {
        console.warn('error')
      }
    };
    request.open('GET', 'http://52.90.202.94:7000/1/1/1/10')
    request.send();
  };

  render () {
    const weatherData = this.state.weatherData;
    var LineChart = require("react-chartjs-2").Line;
    if (!weatherData) return <div>Let me pull this up... One moment please</div>;
    return (
      <div>
        <h1> <LineChart data={chartData} options={chartOption} width="600" height="250"/> </h1> {/* insert the graph*/}
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
