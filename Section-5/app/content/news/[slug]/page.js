import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/news";

export default async function NewsDetailPage({params}){
    const newsSlug = params.slug;
    const newsItem = await getNewsItem(newsSlug);

    // Redirects to notFound if newsItem doesn't exist
    if (!newsItem){
        notFound();
    }

    return(
        <article className="news-article">
            <header>
                <Link href={`/news/${newsItem.slug}/image`}>
                    <img src={`/images/news/${newsItem.image}`} alt={newsItem.title}></img>
                </Link>
                <h1>{newsItem.title}</h1>
                <time dateTime={newsItem.date}>{newsItem.date}</time>
            </header>
            <p>{newsItem.content}</p>
        </article>
        
    )
}