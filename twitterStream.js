// TWITTER STREAM
var Twit = require('twit');
var sentiment = require('sentiment')
var _ = require('lodash')

var  twitterStream = function(socket) {


  var T = new Twit({
      consumer_key:         process.env.T_consumer_key
    , consumer_secret:      process.env.T_consumer_secret
    , access_token:         process.env.T_access_token
    , access_token_secret:  process.env.T_access_token_secret
  })


  var candidates = [
    {
      name: 'Bernie',
      photoURL: '/images/bernie.png',
      regex: /bernie|bernie sanders/ig,
      party: democrat,
      tweetCount: 0,
      hashTags: [],
      sentiment: [0,0],
      positivePercent: 0
    },
    {
      name: 'Clinton',
      photoURL: '/images/clinton.png',
      regex: /clinton|hillary|Hillary Clinton/ig,
      party: democrat,
      tweetCount: 0,
      hashTags: [],
      sentiment: [0,0],
      positivePercent: 0
    },
    {
      name: 'Trump',
      photoURL: '/images/trump.png',
      regex: /trump|Donald Trump/ig,
      party: republican,
      tweetCount: 0,
      hashTags: [],
      sentiment: [0,0],
      positivePercent: 0
    },
    {
      name: 'Rubio',
      photoURL: '/images/rubio.png',
      regex: /rubio|marco rubio/ig,
      party: republican,
      tweetCount: 0,
      hashTags: [],
      sentiment: [0,0],
      positivePercent: 0
    },
    {
      name: 'Carson',
      photoURL: '/images/carson.png',
      regex: /carson|ben carson/ig,
      party: republican,
      tweetCount: 0,
      hashTags: [],
      sentiment: [0,0],
      positivePercent: 0
    },
    {
      name: 'Kasich',
      photoURL: '/images/kasich.png',
      regex: /kasich|john kasich/ig,
      party: republican,
      tweetCount: 0,
      hashTags: [],
      sentiment: [0,0],
      positivePercent: 0
    }
  ]

  var watchList = ['trump', 'rubio', 'carson', 'cruz', 'kasich', 'bernie', 'clinton'];

  var hashTagFinder = /(#[a-z0-9][a-z0-9\-_]*)/ig

  var stream = T.stream('statuses/filter', { track: watchList })

    stream.on('tweet', function (tweet) {
      text = tweet.text
      candidates.forEach( function(element, index, array) {
        if (element.regex.test(text)) {
          element.tweetCount += 1;
          element.hashTags = hashtagMapperCounter(element.hashTags, text);
          element.sentiment = sentimentCounter(element.sentiment, text);
          element.positivePercent = positivePercent(element.sentiment);
          element.topHashTags = topFiveHashTags(element.hashTags);
        };
      });

      socket.emit('Tweet', candidates);

    });


    var hashtagMapperCounter = function(collection, text){
      var matches = text.match(hashTagFinder)
      if (matches) {
        for (index in matches) {
          collection[matches[index]] ? collection[matches[index]] += 1 : collection[matches[index]] = 1;
        }
      }
      return collection
    }

    var topFiveHashTags = function(collection) {
     var sorted = Object.keys(collection).sort(function(a,b){
        return collection[b]-collection[a]
      });
     return sorted.slice(0, 5);
    }

    // sentimentIndex = [for, against]

    var sentimentCounter = function(sentimentIndex, text){
      // console.log(sentimentIndex)
      var textSentiment = sentiment(text).comparative

      if (textSentiment > 0) {
        sentimentIndex[0] ++
      }

      if (textSentiment < 0){
        sentimentIndex[1] ++
      }
      return sentimentIndex
    }

    var positivePercent = function(sentimentIndex) {
      return (sentimentIndex[0] / (sentimentIndex[0] + sentimentIndex[1])) || 0
    }



}

module.exports = twitterStream