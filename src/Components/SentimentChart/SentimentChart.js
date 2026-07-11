import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

export default class SentimentChart extends React.Component {
  render() {
    // format chart.js react data
    let isDataPresent = this.props.watsonEmotionResults ? true : false;
    let data = null;
    let options = null;
    let barColor, borderColor;
    if (isDataPresent) {
      barColor =
        this.props.watsonEmotionResults.result.sentiment.document.label === 'negative'
          ? 'rgba(255, 99, 132, 1)'
          : 'rgba(75, 192, 192, 1)';
      borderColor =
      (this.props.watsonEmotionResults.result.sentiment.document.label ===
      'negative'
        ? 'rgba(255, 99, 132, 1)'
        : 'rgba(75, 192, 192, 1)');
      data = {
        datasets: [
          {
            data: [
              this.props.watsonEmotionResults.result.sentiment.document.score
            ],
            backgroundColor: [barColor],
            borderColor: [borderColor],
            borderWidth: 1,
          },
        ],
      };
      
      options = {
        title: {
          display: true,
          fontColor: '#DCDCDC',
          text: (this.props.watsonEmotionResults.result.sentiment.document.label === 'positive' ? 'Positive sentiment' : 'Negative sentiment'),
          fontSize: 40,
          fontFamily: "'Cormorant', 'Lora', 'Montserrat', 'Roboto', 'serif'",
          fontStyle: 500,        
        },
        legend: {
          display: false,
        },
        tooltips: {
          callbacks : {
            title: () => 'overall sentiment',
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: 14,
                fontColor: '#DCDCDC',
                // beginAtZero: true,
              },
              gridLines: {
                zeroLineColor: '#DCDCDC',
                color: '#DCDCDC',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontSize: 14,
                fontColor: '#DCDCDC',
              },
              gridLines: {
                color: '#DCDCDC',
              },
            },
          ],
        },
      } 
    }

    return (
      <section className="sentiment_chart" id="sentimentChart" >
        <HorizontalBar className="chart" options={options} data={data} />
      </section>
    );
  }
}
