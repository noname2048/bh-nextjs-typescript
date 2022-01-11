import { NextPage } from "next";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const Banner: NextPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [isbn13, setIsbn13] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  return (
    <div>
      <div className="text-5xl m-10">
        사용자의 검색데이터를 통해
        <br />
        책을 모으는 콜렉터 서비스
        <br />
        BookCollecter 입니다
      </div>
      <div className="flex flex-row justify-around m-10">
        <form
          className="flex flex-col border-2 p-20 hover:border-gray-600 focus-within:border-black"
          onSubmit={(event) => {
            event.preventDefault();
            console.log(isbn13);
            if (/^(\d-*){12}\d$/g.test(isbn13)) {
              setErrorMsg("");
              router.push(`/search?isbn13=${isbn13}`);
            } else {
              setErrorMsg("* 유효하지 않은 ISBN13 형식입니다.");
            }
          }}
        >
          <span className="text-5xl text-center">ISBN13으로 검색하기</span>
          <div className="flex flex-row justify-center items-center gap-1 mt-2 border-2 rounded px-2 focus-within:border-sky-400">
            <BiSearch className="text-2xl text-center" />
            <input
              className="h-10 w-full text-2xl text-center focus:border-transparent focus:outline-none"
              name="isbn13"
              type="text"
              onChange={(e) => {
                setIsbn13(e.target.value);
                if (errorMsg !== "") setErrorMsg("");
              }}
            />
          </div>
          {errorMsg === "" ? (
            <div className="text-white">a</div>
          ) : (
            <div className="text-red-700 flex flex-start">
              <div>{errorMsg}</div>
            </div>
          )}
          <Link href={`search?isbn13=9791188102051`} passHref>
            <div className="justify-self-end flex flex-row justify-center items-center">
              <div className="grow-0 border-2 px-2 py-1 rounded-md bg-slate-200 hover:bg-slate-100">
                <span>979-11-88102-05-1</span> 으로 검색해보기
              </div>
            </div>
          </Link>
        </form>
        <form
          className="flex flex-col border-2 p-20 hover:border-gray-600 focus-within:border-black"
          action="/search"
          method="GET"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?title=${title}`);
          }}
        >
          <span className="text-5xl text-center">제목으로 검색하기</span>
          <div className="flex flex-row justify-center items-center gap-1 my-2 border-2 rounded px-2 focus-within:border-sky-400 ">
            <BiSearch className="text-2xl text-center" />
            <input
              className="h-10 w-full text-2xl text-center focus:border-transparent focus:outline-none"
              name="title"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banner;
