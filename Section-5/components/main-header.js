import Link from 'next/link';
import NavLink from './nav-link';

/**
 * MainHeader Component
 * 
 * The primary navigation header for the application.
 * Think of it as the app's compass, helping users navigate
 * between different sections while maintaining visual identity.
 * 
 * Features:
 * - Brand logo/link
 * - Primary navigation menu
 * - Smart highlighting of current section
 * 
 * @returns {JSX.Element} The main header with navigation
 */
export default function MainHeader() {
    return (
        <header id="main-header" role="banner">
            <div id="logo">
                <Link 
                    href="/"
                    aria-label="NextNews Home"
                    className="brand-link"
                >
                    NextNews
                </Link>
            </div>

            <nav aria-label="Main navigation">
                <ul>
                    <li>
                        <NavLink href="/news">News</NavLink>
                    </li>
                    <li>
                        <NavLink href="/archive">Archive</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}