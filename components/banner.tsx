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
      <span>
        사용자의 검색데이터를 통해 책을 모으는 DB 콜렉터 서비스 BookCollecter
        입니다
      </span>
      <div>
        <span>ISBN13으로 검색하기</span>
        <input type="text" />
        <BiSearch />
      </div>
      <form
        action="/search"
        method="GET"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?title=${title}`);
        }}
      >
        <span>제목으로 검색하기</span>
        <input
          name="title"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <BiSearch
          onClick={() => {
            router.push(`/search?title=${title}`);
          }}
        />
      </form>
    </div>
  );
};

export default Banner;
