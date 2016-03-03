// TWITTER STREAM
var Twit = require('twit');
var sentiment = require('sentiment')

var  twitterStream = function() {
  var watchList = ['trump', 'rubio', 'carson', 'cruz', 'kasich', 'bernie', 'clinton'];
  var T = new Twit({
      consumer_key:         process.env.T_consumer_key
    , consumer_secret:      process.env.T_consumer_secret
    , access_token:         process.env.T_access_token
    , access_token_secret:  process.env.T_access_token_secret
  })

  var trumpCount = 0
  var rubioCount = 0
  var carsonCount = 0
  var kasichCount = 0
  var bernieCount = 0
  var clintonCount = 0

  var trumpTags = {}
  var rubioTags = {}
  var carsonTags = {}
  var kasichTags = {}
  var bernieTags = {}
  var clintonTags = {}

  var trumpSentimentCounter = [0,0] // [for, against]
  var rubioSentimentCounter = [0,0]
  var carsonSentimentCounter = [0,0]
  var kasichSentimentCounter = [0,0]
  var bernieSentimentCounter = [0,0]
  var clintonSentimentCounter = [0,0]

  var trumpRegex = /trump|Donald Trump/ig
  var rubioRegex = /rubio|marco rubio/ig
  var carsonRegex = /carson|ben carson/ig
  var kasichRegex = /kasich|john kasich/ig
  var bernieRegex = /bernie|bernie sanders/ig
  var clintonRegex = /clinton|hillary|Hillary Clinton/ig

  var tweetCount = 0

  var hashTagFinder = /(#[a-z0-9][a-z0-9\-_]*)/ig


   var stream = T.stream('statuses/filter', { track: watchList })


    stream.on('tweet', function (tweet) {
      text = tweet.text
      tweetCount ++
      console.log('Tweet Count: ', tweetCount)

      if (trumpRegex.test(text)) {
        trumpCount += 1
        trumpTags = hashtagMapperCounter(trumpTags, text);
        trumpSentimentCounter = sentimentCounter(trumpSentimentCounter, text);
        console.log(SentimentPercent(trumpSentimentCounter))
      }
      if (rubioRegex.test(text)) {
        rubioCount += 1
        rubioTags = hashtagMapperCounter(rubioTags, text);
      }
      if (carsonRegex.test(text)) {
        carsonCount += 1
        carsonTags = hashtagMapperCounter(carsonTags, text);
      }
      if (kasichRegex.test(text)) {
        kasichCount += 1
        kasichTags = hashtagMapperCounter(kasichTags, text);
      }
      if (bernieRegex.test(text)) {
        bernieCount += 1
        bernieTags = hashtagMapperCounter(bernieTags, text);
      }
      if (clintonRegex.test(text)) {
        clintonCount += 1
        clintonTags = hashtagMapperCounter(trumpTags, text);
      }

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

    // sentimentIndex = [for, against]

    var sentimentCounter = function(sentimentIndex, text){
      console.log(sentimentIndex)
      var textSentiment = sentiment(text).comparative

      if (textSentiment > 0) {
        sentimentIndex[0] ++
      }

      if (textSentiment < 0){
        sentimentIndex[1] ++
      }
      return sentimentIndex
    }

    var SentimentPercent = function(sentimentIndex) {
      return (sentimentIndex[0] / (sentimentIndex[0] + sentimentIndex[1])) || 0
    }

}

module.exports = twitterStream