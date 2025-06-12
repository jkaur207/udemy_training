import Link from 'next/link';

import classes from './page.module.css';
import DrinksGrid from '@/components/drinks/drinks-grid';

export default function DrinksPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Refreshing drinks, crafted{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite drink recipe and shake it up yourself. It's easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/drinks/share">
            Share Your Favorite Drink
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        <DrinksGrid drinks={[]} />
      </main>
    </>
  );
}
