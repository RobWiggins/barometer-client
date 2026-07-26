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
          ? 'rgba(232, 74, 106, 0.9)'
          : 'rgba(25, 169, 116, 0.9)';
      borderColor =
      (this.props.watsonEmotionResults.result.sentiment.document.label ===
      'negative'
        ? 'rgba(232, 74, 106, 1)'
        : 'rgba(25, 169, 116, 1)');
      data = {
        labels: ['Overall sentiment'],
        datasets: [
          {
            data: [
              this.props.watsonEmotionResults.result.sentiment.document.score
            ],
            backgroundColor: [barColor],
            borderColor: [borderColor],
            borderWidth: 0,
          },
        ],
      };
      
      options = {
        title: {
          display: true,
          fontColor: '#172033',
          text: (this.props.watsonEmotionResults.result.sentiment.document.label === 'positive' ? 'Positive sentiment' : 'Negative sentiment'),
          fontSize: 24,
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontStyle: 800,        
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
                fontColor: '#65728a',
                // beginAtZero: true,
              },
              gridLines: {
                zeroLineColor: 'rgba(101, 114, 138, 0.28)',
                color: 'rgba(101, 114, 138, 0.16)',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontSize: 14,
                fontColor: '#65728a',
              },
              gridLines: {
                color: 'rgba(101, 114, 138, 0.16)',
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
