import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";

// NewsPage component shows all news articles on one page
export default async function NewsPage() {
  // Get all the news articles (from dummy data or database)
  const news = await getAllNews();

  return (
    <main className="news-page">
      <header>
        <h1>Latest News</h1>
        <p className="subtitle">Stay informed with our latest stories</p>
      </header>

      {/* Show the list of news if there are any */}
      {news.length > 0 ? (
        <NewsList news={news} />
      ) : (
        // If no news, show this message
        <p className="no-news">No news articles available at the moment.</p>
      )}
    </main>
  );
}
