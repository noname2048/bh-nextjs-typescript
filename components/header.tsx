import Link from "next/link";
import { BiSearch } from "react-icons/bi";

export default function Header() {
  return (
    <header className="flex flex-row justify-between">
      <h1 className="basis-1/4">BookCollecter</h1>
      <nav className="basis-1/2">
        <Link href="/index">
          <a>Home</a>
        </Link>
        <Link href="/search">
          <a>Detail Search</a>
        </Link>
        <Link href="/requests">
          <a>Recent Requests</a>
        </Link>
      </nav>
      <div className="basis-1/4 flex flex-row">
        <input type="text" />
        <BiSearch />
      </div>
    </header>
  );
}
