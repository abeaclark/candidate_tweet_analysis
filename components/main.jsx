var React = require('react');
var ReactDOM = require('react-dom');
var PieChart = require("react-chartjs").Pie;
var OdometerComponent = require('react-odometer');

var socket = require('socket.io-client')();

var Abe = React.createClass({
  getInitialState: function() {
    return {
      tweetCount: 0,
      negative: 0,
      positive: 1
    }
  },
  updateState: function(data) {
    this.setState(data)
  },
  render: function() {
    return (
      <div>
      <OdometerComponent value={this.state.tweetCount} />
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
      </div>
    )
  }
});

var main = ReactDOM.render(
  <Abe />,
  document.getElementById('react-mount')
);


socket.on('tweetCount', function (tweetCount) {
  main.updateState({tweetCount: tweetCount});
});

socket.on('positivePercent', function (positivePercent) {
  main.updateState({positive: positivePercent, negative: (1 - positivePercent)});
});

