import DrinkItem from './drink-item';
import classes from './drinks-grid.module.css';

export default function DrinksGrid({ drinks }) {
  return (
    <ul className={classes.drinks}>
      {drinks.map((drink) => (
        <li key={drink.id}>
          <DrinkItem {...drink} />
        </li>
      ))}
    </ul>
  );
}
