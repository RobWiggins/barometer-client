import React from 'react';

export default class TweetList extends React.Component {

  render() {
    
    const tweets = this.props.tweets;
    let isTweetDataPresent = (this.props.tweets ? true : false);
    let tweetList;
    if (isTweetDataPresent) {
      tweetList = tweets.map((tweet, idx) => {
        const tweetText = tweet || '';
        const initial = tweetText.trim().charAt(0).toUpperCase() || '#';
        const sampleNumber = idx + 1;

        return (
          <li key={idx} className="tweet-card">
            <article className="tweet-post">
              <div className="tweet-post-header">
                <div className="tweet-avatar" aria-hidden="true">
                  {initial}
                </div>
                <div className="tweet-author">
                  <span className="tweet-name">Signal sample {sampleNumber}</span>
                  <span className="tweet-handle">@barometer_{sampleNumber}</span>
                </div>
              </div>
              <p className="tweet-text">{tweetText}</p>
              <div className="tweet-post-footer" aria-label="Tweet context">
                <span>Public post</span>
                <span>Analyzed</span>
              </div>
            </article>
          </li>
        )
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
