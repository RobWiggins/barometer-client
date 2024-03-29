import React from 'react';

export default class TweetList extends React.Component {

  render() {
    
    const tweets = this.props.tweets;
    let isTweetDataPresent = (this.props.tweets ? true : false);
    let tweetList;
    if (isTweetDataPresent) {
      tweetList = tweets.map((tweet, idx) => {
        return <li key={idx}>{tweet}</li>
      } )
    }

    return (
      <section className="tweet_list" id="tweet-list" >
        <h3 id="listTitle">Tweets</h3>
        <ul id="tweets">
          {tweetList}
        </ul>
      </section>
    );
  }
}
