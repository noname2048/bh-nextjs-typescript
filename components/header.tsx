import Link from "next/link";
import { BiSearch } from "react-icons/bi";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-end h-14 m-5">
      <h1 className="basis-1/4 self-start bg-sky-400">BookCollecter</h1>
      <nav className="basis-1/2 flex justify-around bg-green-400">
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
      <div className="basis-1/4 self-start flex flex-row bg-gray-400">
        <input type="text" />
        <BiSearch />
      </div>
    </header>
  );
}
