//June 14 2025
// Importing components
import Link from 'next/link';
import classes from './page.module.css';
import DrinksGrid from '@/components/drinks/drinks-grid';

export default function DrinksPage() {
  return (
    <>
      {/* Page header with title and description */}
      <header className={classes.header}>
        <h1>
          Refreshing drinks, crafted{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite drink recipe and shake it up yourself. It's easy and fun!
        </p>

        {/* Call-to-action link to share a drink */}
        <p className={classes.cta}>
          <Link href="/drinks/share">
            Share Your Favorite Drink
          </Link>
        </p>
      </header>

      {/* Main content: grid of drinks (currently empty) */}
      <main className={classes.main}>
        <DrinksGrid drinks={[]} />
      </main>
    </>
  );
}
