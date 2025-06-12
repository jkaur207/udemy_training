import Image from 'next/image';

// Importing icons for the perks section
import drinkIcon from '@/assets/icons/drink.png';
import communityIcon from '@/assets/icons/community.png';
import eventsIcon from '@/assets/icons/events.png';

// Importing CSS module for styling
import classes from './page.module.css';

export default function CommunityPage() {
  return (
    <>
      {/* Page header with title and description */}
      <header className={classes.header}>
        <h1>
          One shared passion: <span className={classes.highlight}>Drinks</span>
        </h1>
        <p>Join our community and share your favorite beverages!</p>
      </header>

      {/* Main content of the page */}
      <main className={classes.main}>
        <h2>Community Perks</h2>

        {/* List of community benefits */}
        <ul className={classes.perks}>
          <li>
            <Image src={drinkIcon} alt="A refreshing drink" />
            <p>Share & discover drink recipes</p>
          </li>
          <li>
            <Image src={communityIcon} alt="A group enjoying drinks" />
            <p>Find new friends & drink lovers</p>
          </li>
          <li>
            <Image src={eventsIcon} alt="Drink-tasting event" />
            <p>Join exclusive tasting events</p>
          </li>
        </ul>
      </main>
    </>
  );
}
