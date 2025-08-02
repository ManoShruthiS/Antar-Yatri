// antar-yatri/js/daily.js

async function fetchJSON(file) {
  const response = await fetch(file);
  return await response.json();
}

function getTodaySeed() {
  const today = new Date();
  return today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
}

function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return () => {
    h = Math.imul(31, h) + 1 | 0;
    return Math.abs(h % 10000) / 10000;
  };
}

function dailyItem(arr, seed) {
  const rand = seededRandom(seed);
  return arr[Math.floor(rand() * arr.length)];
}

async function loadDailyContent() {
  try {
    const [quotes, words, rituals] = await Promise.all([
      fetchJSON('data/quotes.json'),
      fetchJSON('data/words.json'),
      fetchJSON('data/rituals.json')
    ]);

    const seed = getTodaySeed();

    // Quote
    const quote = dailyItem(quotes, seed + 'q');
    document.getElementById('quoteText').textContent = `"${quote.text}"`;
    document.getElementById('quoteSource').textContent = `— ${quote.source}`;

    // Sanskrit word
    const word = dailyItem(words, seed + 'w');
    document.getElementById('sanskritWord').textContent = word.word;
    document.getElementById('wordPronunciation').textContent = `(${word.pronunciation})`;
    document.getElementById('wordMeaning').textContent = word.meaning;

    // Ritual
    const ritual = dailyItem(rituals, seed + 'r');
    document.getElementById('ritualTitle').textContent = ritual.title;
    document.getElementById('ritualDesc').textContent = ritual.description;

  } catch (error) {
    console.error('Error loading daily content:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadDailyContent);
