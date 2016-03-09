var React = require('react');
var ReactDOM = require('react-dom');
var PieChart = require("react-chartjs").Pie;
var OdometerComponent = require('react-odometer');

var socket = require('socket.io-client')();

var Profile = React.createClass({
  getInitialState: function() {
    return {
      tweetCount: 0,
      negative: 0,
      positive: 1,
      topHashTags: [],
      photoURL: '',
      name: '',
    }
  },
  updateState: function(data) {
    this.setState(data)
  },
  render: function() {
    return (
      <div className="profile">
        <PhotoAndName name={this.state.name} photoURL={this.state.photoURL}/>
        <div className="sentiment-title flex">Sentiment</div>
        <Chart negative={this.state.negative} positive={this.state.positive}/>
        <div className="sentiment-title flex">Tweet Count</div>
        <Odometer tweetCount={this.state.tweetCount} />
        <div className="sentiment-title flex">Trending HashTags</div>
        <HashTags topHashTags={this.state.topHashTags} />
      </div>
    )
  }
});



var Chart = React.createClass({
  render: function() {
    return (
      <div className="sentiment-container flex">
        <PieChart
          data={[
          {
          value: this.props.negative,
          color:"#e85a71",
          },
          {
          value: this.props.positive,
          color: "#5cb072",
          },
          ]}
          options={
            {animation: false, label: false}
          }
          width="300"
          height="150"/>
      </div>
    )
  }
});

var PhotoAndName = React.createClass({
  render: function() {
    return (
      <div className="photo-container flex">
        <div className="name-join-photo">
          <img className="headshot" src={this.props.photoURL} />
          <div className="name">
            {this.props.name}
          </div>
        </div>
      </div>
    )
  }
});

var Odometer = React.createClass({
  render: function() {
    return (
      <div className="tweet-count-container flex">
        <OdometerComponent value={this.props.tweetCount}/>
      </div>
    )
  }
});

var HashTags = React.createClass({
  render: function() {
    return (
      <div className="top-tags-container flex">
        <ul>
          {this.props.topHashTags.map(function(hashtag) {
            return( <a href={"https://twitter.com/hashtag/" + hashtag.substring(1)}>
                <li>{hashtag}</li>
              </a>
              );
            })
          }
        </ul>
      </div>
    )
  }
});


var profile = ReactDOM.render(
  <Profile />,
  document.getElementById('react-mount')
);



socket.on('Tweet', function (candidates) {
  candidate = candidates[0]
  profile.updateState({
    positive: candidate.positivePercent,
    negative: (1 - candidate.positivePercent),
    tweetCount: candidate.tweetCount,
    topHashTags: candidate.topHashTags,
    photoURL: candidate.photoURL,
    name: candidate.name
  });
});


