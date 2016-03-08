var React = require('react');
var ReactDOM = require('react-dom');
var PieChart = require('./pieChart.jsx')

var Abe = React.createClass({
  render: function() {
    return (
      <div>
      Just kidding
      </div>
    )
  }
});


ReactDOM.render(
  <Abe />,
  document.getElementById('react-mount')
);

