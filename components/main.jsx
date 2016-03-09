var React = require('react');
var ReactDOM = require('react-dom');
var PieChart = require("react-chartjs").Pie;
var OdometerComponent = require('react-odometer');

var socket = require('socket.io-client')();

var AllCandidates = React.createClass({
  getInitialState: function() {
    return {
      candidates: []
    }
  },
  updateState: function(data) {
    this.setState(data)
  },
  render: function() {
    return (
      <div className="wide">
        <div className="container flex" id="home">
          <a href="#democrat">
            <div id="donkey-big" className="flex">
              <img className="main-logo" src="/images/donkey.png" />
            </div>
          </a>
          <a href="#republican">
            <div id="elephant-big" className="flex">
              <img className="main-logo" src="/images/elephant.png" />
            </div>
          </a>
        </div>
        <div className="container flex" id="democrat">
            {this.state.candidates.map(function(candidate) {
                if(candidate.party == 'democrat') {
                  return(
                    <Profile candidate={candidate} />
                  );
                }else{
                  return null
                }
              })
            }
        </div>
        <div className="container flex" id="republican">
            {this.state.candidates.map(function(candidate) {
                if(candidate.party == 'republican') {
                  return(
                    <Profile candidate={candidate} />
                  );
                }else{
                  return null
                }
              })
            }
        </div>
      </div>
    )
  }
});


var Profile = React.createClass({
  render: function() {
    return (
      <div className="profile">
        <PhotoAndName name={this.props.candidate.name} photoURL={this.props.candidate.photoURL}/>
        <div className="sentiment-title flex">Sentiment</div>
        <Chart negative={1 - this.props.candidate.positivePercent} positive={this.props.candidate.positivePercent}/>
        <div className="sentiment-title flex">Tweet Count</div>
        <Odometer tweetCount={this.props.candidate.tweetCount} />
        <div className="sentiment-title flex">Trending HashTags</div>
        <HashTags topHashTags={this.props.candidate.topHashTags} />
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


var allCandidates = ReactDOM.render(
  <AllCandidates />,
  document.getElementById('react-mount')
);



socket.on('Tweet', function (candidates) {
  allCandidates.updateState({
    candidates: candidates
  });
});


