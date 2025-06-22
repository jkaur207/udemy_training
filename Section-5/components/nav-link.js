"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';

/**
 * NavLink Component
 * 
 * A smart navigation link that automatically highlights itself when active.
 * Think of it as a smart signpost that lights up to show you where you are.
 * 
 * @param {Object} props
 * @param {string} props.href - The destination path for the link
 * @param {React.ReactNode} props.children - The content to display inside the link
 * @returns {JSX.Element} A styled navigation link that shows active state
 */
export default function NavLink({ href, children }) {
    // Get current pathname to determine if this link is active
    const path = usePathname();
    
    return (
        <Link 
            href={href}
            className={path.startsWith(href) ? 'active' : undefined}
            aria-current={path.startsWith(href) ? 'page' : undefined}
        >
            {children}
        </Link>
    );
}