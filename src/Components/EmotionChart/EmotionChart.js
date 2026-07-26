import React from 'react'
import { Bar } from 'react-chartjs-2'

export default class EmotionChart extends React.Component {
  calculateAvgEmotion(targetsEmotions) {
    let averageEmotions = {
      sadness: 0,
      joy: 0,
      fear: 0,
      disgust: 0,
      anger: 0,
    }

    targetsEmotions.forEach(emotions => {
      averageEmotions.sadness += emotions.emotion.sadness
      averageEmotions.joy += emotions.emotion.joy
      averageEmotions.fear += emotions.emotion.fear
      averageEmotions.disgust += emotions.emotion.disgust
      averageEmotions.anger += emotions.emotion.anger
    })
    for (let emotion in averageEmotions) {
      averageEmotions[emotion] /= targetsEmotions.length
    }
    return averageEmotions
  }

  render() {
    // get average emotion across all target keywords
    const averageEmotionsObj = this.calculateAvgEmotion(
      this.props.watsonEmotionResults.result.emotion.targets
    )

    // format chart.js react data
    let isDataPresent = this.props.watsonEmotionResults ? true : false
    let data = null
    if (isDataPresent) {
      data = {
        labels: Object.keys(averageEmotionsObj),
        datasets: [
          {
            label: 'Emotion density',
            data: Object.values(averageEmotionsObj),
            backgroundColor: [
              'rgba(53, 99, 233, 0.9)', // sad
              'rgba(245, 165, 36, 0.9)', // joy
              'rgba(124, 92, 255, 0.9)', // fear
              'rgba(25, 169, 116, 0.9)', // disgust
              'rgba(232, 74, 106, 0.9)', // anger
            ],
            borderColor: [
              'rgba(53, 99, 233, 1)', // sad
              'rgba(245, 165, 36, 1)', // joy
              'rgba(124, 92, 255, 1)', // fear
              'rgba(25, 169, 116, 1)', // disgust
              'rgba(232, 74, 106, 1)', // anger
            ],
            borderWidth: 0,
          },
        ],
      }
    }

    const options = {
      title: {
        display: true,
        text: 'Tweet emotions',
        fontSize: 24,
        fontColor: '#172033',
        padding: 18,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontStyle: 800,
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontSize: 13,
              fontColor: '#65728a',
            },
            
          },
        ],
        yAxes: [
          {
            ticks: {
              fontSize: 13,
              fontColor: '#65728a',
            },
            gridLines: {
              color: 'rgba(101, 114, 138, 0.16)',
              zeroLineColor: 'rgba(101, 114, 138, 0.28)',
            },
          },
        ],
      },
    }

    return (
      <section id="emotionChart">
        <Bar className="chart" data={data} options={options} />
      </section>
    )
  }
}
