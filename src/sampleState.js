const sampleState = {
  watsonEmotionResults: {
    result: {
      usage: {
        text_units: 1,
        text_characters: 5563,
        features: 2,
      },
      sentiment: {
        document: {
          score: -0.389527,
          label: 'negative',
        },
      },
      language: 'en',
      emotion: {
        targets: [
          {
            text: 'trump',
            emotion: {
              sadness: 0.527292,
              joy: 0.117104,
              fear: 0.107436,
              disgust: 0.172389,
              anger: 0.160808,
            },
          },
        ],
        document: {
          emotion: {
            sadness: 0.22184,
            joy: 0.613288,
            fear: 0.108367,
            disgust: 0.532003,
            anger: 0.565455,
          },
        },
      },
    },  
  },
  tweets: [
    "President Trump's proposed executive action for a #2020Census citizenship question will be illegal, unconstitutional, and un-American. Everyone in the country should be pushing back against it. Walk with me briefly as I unpack this... https://t.co/PLaambiNeD",
    'QUESTION FOR @washingtonpost:\n\nTrump⁠—via lawyers⁠—denies a social relationship with Epstein. So why is this info in PARAGRAPH #22:\n\n"[Per his black book], Epstein\'s relationship with Trump was significant...Epstein listed 14 phone numbers for Trump..." https://t.co/c4fZVcYCwL',
    'This staffer said Trump grabbed her by the shoulders and forcibly kissed her at a campaign event. She is now suing Trump for "violating norms of decency."\n\nSomeone else captured this video, just released tonight.\n\nThe instance seems to have been greatly mischaracterized. https://t.co/qAxJjPyrnN',
    'We can’t afford for the media to divide the Democratic Party. @AOC  @SpeakerPelosi please keep your differences on the DL. The media will use any disagreements to further divide and next thing you know Trump is back in office and God help us. #teamAOC #Palante #BX',
    'This staffer said Trump grabbed her by the shoulders and forcibly kissed her at a campaign event. She is now suing Trump for "violating norms of decency."\n\nSomeone else captured this video, just released tonight.\n\nThe instance seems to have been greatly mischaracterized. https://t.co/qAxJjPyrnN',
    'Wait. Trump literally thought that Pete Buttigieg had a Twitter handle based on the sophomoric nickname Trump himself gave him? https://t.co/JNWuGPihmi',
    '*Wins 2019 World Cup, Golden Ball and Golden Boot*\n\nMegan Rapinoe: WE DID IT! I deserve this. \n\nGOP: What happened to humility? So rude and un-American.\n\nNo one:\n\nDonald Trump: I’m so great looking and smart, a true Stable Genius!\n\nGOP: Very good sir, you are wise AND handsome.',
  ],
  queries: [
    { id: 1, query: 'durant', interval: '2019-07-09T18:59:54.676Z' },
    { id: 2, query: 'trump britain', interval: '2019-07-09T18:59:54.676Z' },
    { id: 3, query: 'butterflies', interval: '2019-07-09T18:59:54.676Z' },
    { id: 4, query: 'bumblebee', interval: '2019-07-10T00:04:58.914Z' },
    { id: 17, query: 'earthquake', interval: '2019-07-10T00:19:49.459Z' },
    { id: 18, query: 'trees', interval: '2019-07-10T00:32:34.926Z' },
    { id: 19, query: 'earthquake', interval: '2019-07-10T01:02:39.611Z' },
  ],
  currentQuery: 'trump',
  hasError: false,
  showLandingPage: false,
};

module.exports = sampleState;
