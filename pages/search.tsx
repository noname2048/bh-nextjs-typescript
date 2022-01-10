import type { NextPage } from "next/types";
import { useState, useEffect } from "react";
import NoResultAskAndSendRequestIsbn from "../components/noResultAskAndSendRequestIsbn";
import AutoUpdate from "../components/autoUpdate";
import { useRouter } from "next/router";

const SearchResultList: NextPage = () => {
  const router = useRouter();
  const { isbn13: temp } = router.query;
  const isbn13 = parseInt(temp as string);
  const [result, setResult] = useState([]);

  useEffect(() => {
    async function fd() {
      try {
        const data = await (
          await fetch(`http://localhost:8000/api/v1/books?isbn13=${isbn13}`)
        ).json();
        setResult(result);
      } catch (err) {
        console.log(fd.name, err);
      }
    }
  });
  return (
    <>
      {result.length === 0 ? (
        <>
          <p>{isbn13}에 대한 검색결과가 없습니다</p>
          {/* <NoResultAskAndSendRequestIsbn isbn13={isbn13} /> */}
          {isbn13 ? <AutoUpdate isbn13={isbn13} /> : null}
        </>
      ) : (
        result.map((item, idx) => <div key={idx}>{item}</div>)
      )}
    </>
  );
};

export default SearchResultList;
