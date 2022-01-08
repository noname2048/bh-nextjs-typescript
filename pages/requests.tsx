import { NextPage } from "next";
import { useState, useEffect } from "react";
import useSWR from "swr";

const requestUrl = "http://localhost:8000/api/v1/books/requests";

const RequestList: NextPage = () => {
  const [result, setResult] = useState([]);
  const [serverError, setServerError] = useState(false);

  // const { data, error } = useSWR(
  //   "http://localhost:8000/api/v1/books/requests",
  //   fetch
  // );

  // if (error) return <div>에러가 발생했습니다</div>;
  // setResult(data);

  // const fd = async (event) => {
  //   event.preventDefault();
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        const jsonData = await (await fetch(requestUrl)).json();
        console.log(jsonData);
        setResult(jsonData);
        console.log(jsonData);
        setServerError(false);
      } catch (err) {
        setResult([]);
        setServerError(true);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {serverError
        ? "벡엔드로부터 문제가 발생했습니다"
        : result.length === 0
        ? "검색결과가 없습니다"
        : result.map((item: Object, idx: number) => (
            <div key={idx}>{item.isbn13}</div>
          ))}
    </div>
  );
};

export default RequestList;
