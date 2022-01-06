import { NextPage } from "next";
import { useState, useEffect } from "react";
import useSWR from "swr";

const whatUrl = "http://localhost:8000/what";
const requestUrl = "http://localhost:8000/api/v1/books/requests";

const RequestList: NextPage = () => {
  const [result, setResult] = useState<Array<Object>>([]);

  // const { data, error } = useSWR(
  //   "http://localhost:8000/api/v1/books/requests",
  //   fetch
  // );

  // if (error) return <div>에러가 발생했습니다</div>;
  // setResult(data);

  useEffect(() => {
    async function fetchData() {
      const jsonData = await (await fetch(requestUrl)).json();
      setResult(jsonData);
      console.log(jsonData);
    }
    fetchData();
  }, []);

  return (
    <div>
      {result.length === 0
        ? "검색결과가 없습니다"
        : result.map((item: Object, idx: number) => (
            <div key={idx}>{item}</div>
          ))}
    </div>
  );
};

export default RequestList;
