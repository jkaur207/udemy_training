"use client";
import { useRouter } from "next/navigation";

export default function ModalBackdrop() {
    //Closes image when user clicks on backdrop
    const router = useRouter();
    return (
        <div className="modal-backdrop" onClick={router.back} />
    )
}