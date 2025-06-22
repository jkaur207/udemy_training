import Link from "next/link";

/**
 * NewsList Component
 * 
 * Displays a grid of news articles with images and titles.
 * Think of it as a digital newspaper front page where each article
 * is represented by an image and headline that you can click on.
 * 
 * @param {Object} props
 * @param {Array} props.news - Array of news items to display
 * @returns {JSX.Element} A grid list of clickable news articles
 */
export default function NewsList({ news }) {
    return (
        <ul 
            className="news-list"
            role="list"
            aria-label="News articles"
        >
            {news.map((newsItem) => (
                <li key={newsItem.id}>
                    <Link 
                        href={`/news/${newsItem.slug}`}
                        aria-label={`Read full article: ${newsItem.title}`}
                    >
                        <img 
                            src={`/images/news/${newsItem.image}`} 
                            alt={newsItem.title}
                            loading="lazy" 
                        />
                        <span className="news-title">{newsItem.title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
