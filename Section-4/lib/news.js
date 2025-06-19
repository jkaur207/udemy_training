// Completed on: June 13, 2025

import { DUMMY_NEWS } from '@/dummy-news';

// Returns all the news items
// In real projects, this would be taken from a database 
export function getAllNews() {
  return DUMMY_NEWS;
}

// Gets the 3 latest news items for homepage display
export function getLatestNews() {
  return DUMMY_NEWS.slice(0, 3);
}

// Finds all years that have at least one news article
// Useful for showing archive filters (like "2023", "2024", etc.)
export function getAvailableNewsYears() {
  return DUMMY_NEWS.reduce((years, news) => {
    const year = new Date(news.date).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    return years;
  }, []).sort((a, b) => b - a); // Sort years from newest to oldest
}

// Finds all months that have news articles for a given year
export function getAvailableNewsMonths(year) {
  return DUMMY_NEWS.reduce((months, news) => {
    const newsYear = new Date(news.date).getFullYear();
    if (newsYear === +year) {
      const month = new Date(news.date).getMonth();
      if (!months.includes(month)) {
        months.push(month + 1); // Months are 0-based in JS, so add 1
      }
    }
    return months;
  }, []).sort((a, b) => a - b); // Sort months in ascending order
}

// Filters all news items for a specific year
export function getNewsForYear(year) {
  return DUMMY_NEWS.filter(
    (news) => new Date(news.date).getFullYear() === +year
  );
}

// Filters all news items for a specific year and month
export function getNewsForYearAndMonth(year, month) {
  return DUMMY_NEWS.filter((news) => {
    const newsYear = new Date(news.date).getFullYear();
    const newsMonth = new Date(news.date).getMonth() + 1;
    return newsYear === +year && newsMonth === +month;
  });
}
