import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Update({ isbn13 }: { isbn13: number }) {
  const [level, setLevel] = useState(0);
  const [objId, setObjId] = useState("");

  useEffect(() => {
    if (level === 0) {
      const data = fetch(
        `http://localhost:8000/api/v1/books/requests?isbn13=${isbn13}`
      )
        .then((res) => res.json())
        .catch((err) => console.log(0, err));
    }
    setLevel(1);
  }, [isbn13, level]);

  useEffect(() => {
    if (level === 1) {
      const data = fetch(`http://localhost:8000/api/v1/books/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isbn13 }),
      }).then((res) => res.json().then((data) => data));

      if (data) {
        setObjId(data?.id);
        setLevel(2);
      }
    }
  }, [isbn13, level]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  return <div>유효한 리퀘스트입니다.</div>;
  return <div>리퀘스트가 있는지 검사중입니다.</div>;
  return <div>리퀘스가 있습니다.</div>;
  return <div>크롤링 대기중입니다.</div>;
  return <div>성공적으로 업데이트 되었습니다.</div>;
}
