import type { NextPage } from "next/types";
import { useState, useEffect } from "react";
import AutoUpdate from "../components/autoUpdate";
import { useRouter } from "next/router";
import BookList from "../components/bookList";
import BookModel from "../interfaces/bookModel";

async function fetchIsbn13(isbn: number): Promise<Array<object>> {
  try {
    const data = await (
      await fetch(`http://localhost:8000/api/v1/books?isbn13=${isbn}`)
    ).json();
    return new Promise<Array<object>>((resolve) => {
      resolve(data);
    });
  } catch (err) {
    return new Promise<Array<object>>((resolve) => resolve([]));
  }
}

async function fetchTitle(title: string): Promise<Array<object>> {
  try {
    const data = await (
      await fetch(`http://localhost:8000/api/v1/books?title=${title}`)
    ).json();
    return new Promise<Array<object>>((resolve) => {
      resolve(data);
    });
  } catch (err) {
    return new Promise<Array<object>>((resolve) => resolve([]));
  }
}

async function fetchRecent(): Promise<Array<object>> {
  try {
    const data = await (
      await fetch(`http://localhost:8000/api/v1/books`)
    ).json();
    return new Promise<Array<object>>((resolve) => {
      resolve(data);
    });
  } catch (err) {
    return new Promise<Array<object>>((resolve) => resolve([]));
  }
}

const SearchResultList: NextPage = () => {
  const router = useRouter();
  const { isbn13: isbn13Query, title: titleQuery } = router.query;
  const [result, setResult] = useState<Array<BookModel>>([]);

  useEffect(() => {
    const isbn13 = parseInt(isbn13Query as string);
    if (isbn13 != NaN) {
      fetchIsbn13(isbn13).then((res) => {
        console.log(res);
        setResult(res);
      });
    } else if (titleQuery != undefined) {
      fetchTitle(titleQuery as string).then((res) => {
        setResult(res);
      });
    } else {
      fetchRecent().then((res) => {
        setResult(res);
      });
    }
  }, [isbn13Query, titleQuery]);

  return (
    <>
      {result.length === 0 ? (
        <>
          {/* <p>{isbn13}에 대한 검색결과가 없습니다</p> */}
          {/* <NoResultAskAndSendRequestIsbn isbn13={isbn13} /> */}
          {/* {isbn13 ? <AutoUpdate isbn13={isbn13} /> : null} */}
        </>
      ) : (
        <>
          {result.map((item, idx) => (
            <div key={idx}>{item.title}</div>
          ))}
          <BookList bookList={result} />
        </>
      )}
    </>
  );
};

export default SearchResultList;
