import { notFound } from "next/navigation";
import { DUMMY_NEWS } from "@/dummy-news";
export default function ImagePage({params}){

    // from /[slug] page.js
    const newsItemSlug=params.slug;
    const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsItemSlug);
    
        // Redirects to notFound if newsItem doesn't exist
    if (!newsItem){
            notFound();
    }
    
    return(
        <div className="fullscreen-image">
            <img src={`/images/news/${newsItem.image}`}></img>
        </div>
    )
}