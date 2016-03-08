var React = require('react');
var ReactDOM = require('react-dom');
var PieChart = require("react-chartjs").Pie;

var socket = require('socket.io-client')();

var Abe = React.createClass({
  getInitialState: function() {
    return {
      value: 'Abe is hot',
      negative: .5,
      positive: .5
    }
  },
  updateState: function(value) {
    this.setState({value: value})
  },
  render: function() {
    return (
      <div>
      {this.state.value}
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

socket.on('update', function (data) {
  main.updateState(data);
});

