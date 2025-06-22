import { DUMMY_NEWS } from "@/dummy-news";
import Link from "next/link";
import { notFound } from "next/navigation";

// This is a dynamic route page — [slug] in the file name makes it dynamic
// Example URLs: /news/will-ai-replace-humans or /news/beaver-plague
// This single file handles all those URLs like a template
export default function NewsDetailPage({ params }) {
  // Get the "slug" value from the URL
  const newsSlug = params.slug;

  // Try to find a matching news article from the dummy data
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsSlug);

  // If no match found, show the 404 Not Found page
  if (!newsItem) {
    notFound();
  }

  return (
    <article className="news-article">
      <header>
        {/* Clicking the image goes to the image view of the article */}
        <Link href={`/news/${newsItem.slug}/image`}>
          <img
            src={`/images/news/${newsItem.image}`}
            alt={newsItem.title}
          />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>

      {/* Show the article's content */}
      <p>{newsItem.content}</p>
    </article>
  );
}