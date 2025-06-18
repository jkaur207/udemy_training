"use client";
import { notFound } from "next/navigation";
import { DUMMY_NEWS } from "@/dummy-news";
import { useRouter } from "next/navigation";

// This is a special Next.js 13+ feature called an Intercepted Route
// When you click an image in the news detail page, instead of going to a new page,
// it shows this cool modal overlay with the image
// The (.) in the folder name tells Next.js to intercept the route
export default function InterceptedImagePage({params}){
    // We need the router to let users go back when they click outside the modal
    const router = useRouter();
    const newsItemSlug=params.slug;
    const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsItemSlug);
    
    if (!newsItem){
            notFound();
    }
    
    return(
        <>
            <div className="modal-backdrop" onClick={router.back}/>
                <dialog className="modal" open>
            <div className="fullscreen-image">
                <img src={`/images/news/${newsItem.image}`}></img>
            </div>
            </dialog>
        </>

    )
}