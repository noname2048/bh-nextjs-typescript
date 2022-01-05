import Link from "next/link";
import { Router } from "next/router";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";

// TODO: h1을 width에 따라 잘리게 되면 BC로 교체
// TODO: 선택된 Link만 특정 style 적용

export default function Header() {
  const router = useRouter();
  console.log(router);
  return (
    <header className="grid gap-4 grid-cols-3 grid-rows-1 justify-between items-center h-14 m-5 border-4 border-slate-700">
      <div className="border-3 border-slate-700 flex justify-start">
        <h1 className="text-3xl font-bold m-3">BookCollector</h1>
      </div>
      <nav className="flex self-end justify-around items-end">
        <Link href="/">
          <a className={router.asPath === "/" ? "underline" : ""}>Home</a>
        </Link>
        <Link href="/search">
          <a className={router.asPath === "/search" ? "underline" : ""}>
            Detail Search
          </a>
        </Link>
        <Link href="/requests">
          <a className={router.asPath === "/requests" ? "underline" : ""}>
            Recent Requests
          </a>
        </Link>
      </nav>
      <div className="flex flex-row justify-end items-center">
        <input type="text" className="border-2 border-slate-700 w-22" />
        <BiSearch className="m-2" />
      </div>
    </header>
  );
}
