import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 py-8">
      {/* Logo image */}
      <Image
        src="/logo.png"
        alt="A server surrounded by magic sparkles."
        width={300}
        height={300}
      />

      {/* Welcome heading */}
      <h1 className="text-4xl text-white font-bold text-center">
        Time to get started!
      </h1>

      {/* Navigation links */}
      <nav className="text-lg text-blue-200 space-y-2">
        <p>
          <Link href="/drinks">Drinks</Link>
        </p>
        <p>
          <Link href="/drinks/share">Share a Drink</Link>
        </p>
        <p>
          <Link href="/community">Community</Link>
        </p>
      </nav>
    </main>
  );
}