import sql from 'better-sqlite3';

// Set up connection to the SQLite database called data.db
const db = sql('data.db');

// Get all news articles from the database
export async function getAllNews() {
  const news = db.prepare('SELECT * FROM news').all();
  // Just adding a little delay to simulate real-world data loading
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}

// Get one news article by its slug (the URL part)
export async function getNewsItem(slug) {
  const newsItem = db.prepare('SELECT * FROM news WHERE slug = ?').get(slug);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return newsItem;
}

// Get the 3 newest news articles
// Think of this as showing the newest arrivals on display
export async function getLatestNews() {
  const latestNews = db
    .prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3')
    .all();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return latestNews;
}

// Get all unique years that have news articles
export async function getAvailableNewsYears() {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map((year) => year.year);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return years;
}

// Get all months with news in a given year
// Useful for filtering news by month within a year
export function getAvailableNewsMonths(year) {
  return db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year)
    .map((month) => month.month);
}

// Get all news articles from a specific year
export async function getNewsForYear(year) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}

// Get news articles from a specific year and month
export async function getNewsForYearAndMonth(year, month) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}
