import React from 'react';
// import { Route, Link } from 'react-router-dom';
import config from './config';
import './App.css';
import twitter from './apis/twitter/twitter';

class App extends React.Component {
  handleSearch(searchQuery) {
    // console.log(searchQuery);
  }

  /* TODO come back and wire up functionally with twitter retrieveTweets() */
  handleSubmitQuery = query => {
    // console.log(query);
    // twitter.retrieveTweets(query);


    /* try to communicate with backend */
    fetch(config.API_ENDPOINT + '/tweets/queries')
      .then(response => {
        if (!response.ok) {
          throw new Error( 'something seems to have gone wrong');
        }
        return response.json();
      })
      .then(data => console.log(data, 'i received the json in the client'))
      .catch(error => console.log(error.status, error.message) ); // perhaps customize more
  }

  render() {
    return (
      <div>
        <form
          className="search"
          id="searchOne"
          onSubmit={e => {
            e.preventDefault();
            this.handleSubmitQuery(e.target.firstSearch.value);
          }}
        >
          <label>Search</label>
          <input
            id="firstSearch"
            type="text"
            name="firstSearch"
            onChange={e => this.handleSearch(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
