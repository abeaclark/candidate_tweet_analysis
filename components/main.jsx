var React = require('react');
var ReactDOM = require('react-dom');
var PieChart = require("react-chartjs").Pie;
var OdometerComponent = require('react-odometer');

var socket = require('socket.io-client')();

var Chart = React.createClass({
  getInitialState: function() {
    return {
      tweetCount: 0,
      negative: 0,
      positive: 1,
      topHashTags: []
    }
  },
  updateState: function(data) {
    this.setState(data)
  },
  render: function() {
    return (
      <PieChart
        data={[
        {
        value: this.state.negative,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Negative"
        },
        {
        value: this.state.positive,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Positive"
        },
        ]}
        options={
          {animation: false}
        }
        width="400"
        height="150"/>
    )
  }
});

var Odometer = React.createClass({
  getInitialState: function() {
    return {
      tweetCount: 0,
    }
  },
  updateState: function(data) {
    this.setState(data)
  },
  render: function() {
    return (
      <OdometerComponent value={this.state.tweetCount} />
    )
  }
});

var HashTags = React.createClass({
  getInitialState: function() {
    return {
      topHashTags: []
    }
  },
  updateState: function(data) {
    this.setState(data)
  },
  render: function() {
    return (
      <div>
        {this.state.topHashTags}
      </div>
    )
  }
});


var chart = ReactDOM.render(
  <Chart />,
  document.getElementById('react-chart-mount')
);

var odometer = ReactDOM.render(
  <Odometer />,
  document.getElementById('react-odometer-mount')
);

var hashtags = ReactDOM.render(
  <HashTags />,
  document.getElementById('react-hashtags-mount')
);



socket.on('positivePercent', function (positivePercent) {
 chart.updateState({positive: positivePercent, negative: (1 - positivePercent)});
});

socket.on('tweetCount', function (tweetCount) {
  odometer.updateState({tweetCount: tweetCount});
});

socket.on('topHashTags', function (topHashTags) {
  hashtags.updateState({topHashTags: topHashTags});
});
