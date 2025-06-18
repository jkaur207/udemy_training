"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';

// Custom NavLink component to highlight the active link
// Helps the user know which page they're currently on
export default function NavLink({ href, children }) {
  // usePathname gives the current route (like checking the current page)
  const path = usePathname();

  return (
    <Link
      href={href}
      // If the current path starts with the link's href, add 'active' class
      className={path.startsWith(href) ? 'active' : undefined}
    >
      {children}
    </Link>
  );
}
