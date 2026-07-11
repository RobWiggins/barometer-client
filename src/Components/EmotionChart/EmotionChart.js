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
              'rgba(54, 162, 235, 1)', // sad
              'rgba(255, 206, 86, 1)', // joy
              'rgba(153, 102, 255, 1)', // fear
              'rgba(75, 192, 192, 1)', // disgust
              'rgba(255, 99, 132, 1)', // anger
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)', // sad
              'rgba(255, 206, 86, 1)', // joy
              'rgba(153, 102, 255, 1)', // fear
              'rgba(75, 192, 192, 1)', // disgust
              'rgba(255, 99, 132, 1)', // anger
            ],
            borderWidth: 1,
          },
        ],
      }
    }

    const options = {
      title: {
        display: true,
        text: 'Tweet emotions',
        fontSize: 40,
        fontColor: '#DCDCDC',
        padding: 20,
        fontFamily: "'Cormorant', 'Lora', 'Montserrat', 'Roboto', 'serif'",
        fontStyle: 500,
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontSize: 13,
              fontColor: '#DCDCDC',
            },
            
          },
        ],
        yAxes: [
          {
            ticks: {
              fontSize: 13,
              fontColor: '#DCDCDC',
            },
            gridLines: {
              color: '#DCDCDC',
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
