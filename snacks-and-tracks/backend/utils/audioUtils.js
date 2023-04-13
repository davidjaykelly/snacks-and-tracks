const getMood = (audioFeatures) => {
  let moods = [];

  audioFeatures.forEach((audioFeature) => {
    const loudness = audioFeature.loudness;
    const tempo = audioFeature.tempo;

    let modeCounts = [0, 0];
    let keyCounts = new Array(12).fill(0);

    audioFeatures.forEach((audioFeature) => {
      modeCounts[audioFeature.mode]++;
      keyCounts[audioFeature.key]++;
    });

    const mode = modeCounts[0] >= modeCounts[1] ? 0 : 1;
    const key = keyCounts.indexOf(Math.max(...keyCounts));

    let mood = "";

    if (loudness <= -10) {
      mood = "Calm";
    } else {
      if (tempo <= 100) {
        mood = "Slow";
      } else if (tempo <= 130) {
        mood = "Moderate";
      } else {
        mood = "Fast";
      }

      switch (key) {
        case 0:
          mood += " Calm";
          break;
        case 1:
          mood += " Sad";
          break;
        case 2:
          mood += " Happy";
          break;
        case 3:
          mood += " Energetic";
          break;
        case 4:
          mood += " Romantic";
          break;
        case 5:
          mood += " Dreamy";
          break;
        case 6:
          mood += " Melancholy";
          break;
        case 7:
          mood += " Hopeful";
          break;
        case 8:
          mood += " Peaceful";
          break;
        case 9:
          mood += " Epic";
          break;
        default:
          break;
      }

      if (mode === 0) {
        mood += " Major";
      } else if (mode === 1) {
        mood += " Minor";
      }
    }

    moods.push(mood);
  });

  return moods;
};

const createAlbumMood = (moods) => {
  // Count the occurrences of each mood
  const moodCounts = {};
  moods.forEach((mood) => {
    if (mood in moodCounts) {
      moodCounts[mood]++;
    } else {
      moodCounts[mood] = 1;
    }
  });

  // Find the most frequent mood
  let albumMood = null;
  let maxCount = 0;
  Object.entries(moodCounts).forEach(([mood, count]) => {
    if (count > maxCount) {
      albumMood = mood;
      maxCount = count;
    }
  });

  // If there is a tie, choose the mood with the highest total value of tempo
  if (
    Object.values(moodCounts).filter((count) => count === maxCount).length > 1
  ) {
    let maxTempo = 0;
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count === maxCount) {
        const tempoSum = moods
          .filter((m) => m === mood)
          .reduce((total, m) => total + getTempoFromMood(m), 0);
        if (tempoSum > maxTempo) {
          albumMood = mood;
          maxTempo = tempoSum;
        }
      }
    });
  }

  return albumMood;
};

const getTempoFromMood = (mood) => {
  if (mood.includes("Slow")) {
    return 1;
  } else if (mood.includes("Moderate")) {
    return 2;
  } else {
    return 3;
  }
};

module.exports = {
    getMood,
    createAlbumMood,
    getTempoFromMood
}
