
import { notFound } from "next/navigation";
import ModalBackdrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";

export default async function InterceptedImagePage({params}){


    // from /[slug] page.js
    const newsItemSlug=params.slug;
    const newsItem = await getNewsItem(newsItemSlug);
    
        // Redirects to notFound if newsItem doesn't exist
    if (!newsItem){
            notFound();
    }
    
    return(
        <>
            <ModalBackdrop />
                <dialog className="modal" open>
            <div className="fullscreen-image">
                <img src={`/images/news/${newsItem.image}`}></img>
            </div>
            </dialog>
        </>

    )
}