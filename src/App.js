import React from 'react';
import config from './config';
import './App.css';
import Header from './Components/Header/Header.js';
import FormQuery from './Components/FormQuery/FormQuery';
import EmotionChart from './Components/EmotionChart/EmotionChart';
import TweetList from './Components/TweetList/TweetList';
import SentimentChart from './Components/SentimentChart/SentimentChart';
import SearchError from './Components/SearchError/SearchError';
import SearchHistory from './Components/SearchHistory/SearchHistory';
import LandingDescription from './Components/LandingDescription/LandingDescription';

class App extends React.Component {
  state = {
    watsonEmotionResults: null,
    tweets: null,
    queries: null,
    currentQuery: null,
    activeHistoryQuery: null,
    hasError: false,
    showLandingPage: true,
  };

  onLandingButtonClick = () => {
    this.setState({
      showLandingPage: false,
    });
  };

  /* retrieve past query history for all users */
  componentDidMount() {
    fetch(config.API_ENDPOINT + '/queries/history')
      .then(response => {
        if (!response.ok) {
          throw new Error({ message: 'error with getting history' });
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          queries: data.queries,
        });
      })
      .catch(err => console.log(err.message));
  }

  handleSubmitQuery = (query, isHistoryQuery = false) => {
    if (!isHistoryQuery && this.state.activeHistoryQuery) {
      this.setState({ activeHistoryQuery: null });
    }

    return fetch(config.API_ENDPOINT + `/tweets/queries/${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error({ message: 'something seems to have gone wrong' });
        }
        return response.json();
      })
      .then(data => {
        this.setState(
          {
            watsonEmotionResults: data.watsonEmotionResults,
            tweets: data.duplicatesFiltered,
            hasError: false,
            currentQuery: query,
            activeHistoryQuery: isHistoryQuery ? query : null,
          },
          this.addToHistory(query)
        );
      })
      .catch(error =>
        this.setState({
          hasError: true,
        })
      );
  };

  addToHistory(newQuery) {
    const body = JSON.stringify({
      query: newQuery,
    });
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
    };
    // check if its already been searched, if not dont add
    let pastQueries = [];
    for (let i = 0; i < this.state.queries.length; i++) {
      pastQueries.push(this.state.queries[i].query);
    }
    if (!pastQueries.includes(newQuery)) {
      fetch(config.API_ENDPOINT + '/queries/history', options)
        .then(response => {
          if (!response.ok) {
            throw new Error({ message: 'error with retrieving history' });
          }
          return response.json();
        })
        .then(data => {
          this.setState({
            queries: [...this.state.queries, data],
          });
        })
        .catch(err => console.log(err.message));
    }
  }

  render() {
    let isEmotionDataPresent = this.state.watsonEmotionResults ? true : false;
    let tweetList = this.state.tweets ? <TweetList tweets={this.state.tweets} /> : '';
    let emotionChartDisplay, sentimentChartDisplay;
    if (isEmotionDataPresent) {
      emotionChartDisplay = (
        <EmotionChart watsonEmotionResults={this.state.watsonEmotionResults} />
      );
      sentimentChartDisplay = (
        <SentimentChart
          watsonEmotionResults={this.state.watsonEmotionResults}
        />
      );
    } else {
      emotionChartDisplay = '';
      sentimentChartDisplay = '';
    }

    let errorDisplay;
    if (this.state.hasError) {
      errorDisplay = <SearchError />;
    } else {
      errorDisplay = '';
    }

    return (
      <div className='container'>
        <Header />
        {this.state.showLandingPage ? (
          <LandingDescription
            onLandingButtonClick={this.onLandingButtonClick}
          />
        ) : (
          ''
        )}
        {!this.state.showLandingPage ? (
          <main className="main" role="main">
            <div id="hideHomePage">
            <FormQuery
              handleSubmitQuery={this.handleSubmitQuery}
            />
            {errorDisplay}
            <SearchHistory
              handleSubmitQuery={this.handleSubmitQuery}
              activeHistoryQuery={this.state.activeHistoryQuery}
              queries={this.state.queries}
            />
            <div id="grid-holder">
              {emotionChartDisplay}
              {sentimentChartDisplay}
              {tweetList}
            </div>
          </div>
          </main>
          ) : (
          ''
        )}
      </div>
    );
  }
}

export default App;
