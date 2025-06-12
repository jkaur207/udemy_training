import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to NextLevel Drinks</h1>
      <p>
        <Link href="/drinks">Explore Drinks</Link>
      </p>
    </main>
  );
}
