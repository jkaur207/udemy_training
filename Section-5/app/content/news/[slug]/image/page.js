import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/news";
export default async function ImagePage({params}){

    // from /[slug] page.js
    const newsItemSlug=params.slug;
    const newsItem = await getNewsItem(newsItemSlug);
    
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