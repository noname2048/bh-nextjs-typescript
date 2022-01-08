import type { NextPage } from "next/types";
import { useState } from "react";
import NoResultAskAndSendRequestIsbn from "../components/noResultAskAndSendRequestIsbn";
import { useRouter } from "next/router";

const SearchResultList: NextPage = () => {
  const router = useRouter();
  const { isbn13 } = router.query;
  const [result, setResult] = useState([]);
  return (
    <>
      {result.length === 0 ? (
        <>
          <p>검색결과가 없습니다</p>
          {isbn13 ? <NoResultAskAndSendRequestIsbn isbn13={isbn13} /> : null}
        </>
      ) : (
        result.map((item, idx) => <div key={idx}>{item}</div>)
      )}
    </>
  );
};

export default SearchResultList;
