import Link from "next/link";

export default function Header() {
  return (
    <header>
      <h1>BookCollecter</h1>
      <nav>
        <Link href="/index">
          <a className="base-1/4">Home</a>
        </Link>
        <Link href="/search">Detail Search</Link>
        <Link href="/requests">Recent Requests</Link>
      </nav>
      <div>
        <input type="text" />
      </div>
    </header>
  );
}
