import { useState, useEffect } from "react";

async function isRequestExsist(isbn: number) {
  try {
    const url = `http://localhost:8000/api/v1/books/requests?isbn=${isbn}`;
    const data = await (await fetch(url)).json();
    console.log(isRequestExsist.name, data);
    return data;
  } catch (err) {
    console.log(isRequestExsist.name, err);
    return false;
  }
}

async function postRequest(isbn: number) {
  try {
    const url = `http://localhost:8000/api/v1/books/requests`;
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isbn13: isbn }),
    };
    const data = await (await fetch(url, params)).json();
    console.log(postRequest.name, data);
    return data;
  } catch (err) {
    console.log(postRequest.name, err);
    return [];
  }
}

/**
 * ISBN을 통해 검색하는 결과 json에서 LIST 이지만,
 * 한개만 반환되도록 설정하였습니다.
 *
 * 만약 isbn이 없다면 이미 크롤링 중인지 물어보기 위해 request를 확인하고
 * 없다면 request를 자동으로 보냅니다
 *
 * post로 보낸 request의 답변은 mongodb string id로 돌아오는데,
 * request의 id를 찾아 result_code를 계속해서 polling으로 확인합니다.
 */
export default function NoResultAskAndSendRequestIsbn({
  isbn13,
}: {
  isbn13: number;
}) {
  const [result, setResult] = useState([]);
  console.log(isbn13);

  useEffect(() => {
    async function checkValidAndGetRequest(isbn: number) {
      const isIsbnValid = isbn >= 10 ** 13 && isbn < 10 ** 14;
      if (isIsbnValid) {
        const temp = await isRequestExsist(isbn);
        if ((temp ? true : false) === false) {
          const idList = await postRequest(isbn);
        } else {
          const id = temp[0].id;
          console.log(checkValidAndGetRequest.name, id);
        }
      }
    }

    checkValidAndGetRequest(isbn13);
  }, [isbn13]);

  return <div></div>;
}
