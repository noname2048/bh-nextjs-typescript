import { NextPage } from "next";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";
import { useState } from "react";

const Banner: NextPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isbn13, setIsbn13] = useState("");
  return (
    <div>
      <div className="text-5xl m-10">
        사용자의 검색데이터를 통해
        <br />
        책을 모으는 DB 콜렉터 서비스
        <br />
        BookCollecter 입니다
      </div>
      <div className="flex flex-row justify-around m-10">
        <form
          className="flex flex-col border-2 p-20"
          onSubmit={(event) => {
            event.preventDefault();
            console.log(event.target?.isbn13.value);
            const isbn13 = event.target?.isbn13.value || "";
            router.push(`/search?isbn13=${isbn13}`);
          }}
        >
          <span className="text-5xl text-center">ISBN13으로 검색하기</span>
          <div className="flex flex-row justify-center items-center gap-1 my-2 border-2 rounded px-2 focus-within:border-sky-400 ">
            <BiSearch className="text-2xl text-center" />
            <input
              className="h-10 w-full text-2xl text-center focus:border-transparent focus:outline-none"
              name="isbn13"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </form>
        <form
          className="flex flex-col border-2 p-20"
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
