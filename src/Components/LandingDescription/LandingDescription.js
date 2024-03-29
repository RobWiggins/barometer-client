import React from 'react';
import './Landing.css';

export default class LandingDescription extends React.Component {
  render() {
    return (
      <div id="landingPane">
        <section className="landingRow">
          <h3 className="feature-summary">
              Determine which emotions people on Twitter are feeling regarding
              any subject in real-time.
          </h3>
          <p>
            The Barometer web application grants users the ability to
            quantitatively measure the general population’s emotional view of
            events and subjects on Twitter.
          </p>
          <p>
            Through combining Twitter's tweet search result API and IBM’s
            natural language processing model, the results are aggregated into 6
            emotional sentiment categories (%): sadness, joy, fear, disgust,
            anger, and overall positive vs. negative outlook.
          </p>
          <p>
            <img
              alt="Search query 'leonard clippers trade' with tweet results and emotion target keywords chart, indicating dominating sadness and joy emotional composition"
              src="./static/search_home.png"
              id="search-home-img"
            />
          </p>
          <p id="thesis">
            The application is a continuous, user-search driven online social
            presence survey.
          </p>
        </section>
        <section id="callAction">
          <h3 className="feature-summary">
              Record and quantify the online users' emotional viewpoint on any
              given subject.
          </h3>
          <p>
            Interactive charts and comparative displays enable digestible
            proprietary insights.
          </p>
        </section>
        <button
          id="hideLanding"
          onClick={() => this.props.onLandingButtonClick()}
        >
          Start searching now.
        </button>
      </div>
    );
  }
}
