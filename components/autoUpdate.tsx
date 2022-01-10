import { useEffect, useState, useMemo } from "react";
import useSWR from "swr";

export default function Update({ isbn13 }: { isbn13: number }) {
  const [level, setLevel] = useState(0);
  const [objId, setObjId] = useState("");
  const isIsbnValid = useMemo(
    () => isbn13 >= 10 ** 13 && isbn13 < 10 ** 14,
    [isbn13]
  );

  useEffect(() => {
    (async () => {
      try {
        if (level === 0 && isIsbnValid) {
          const res = await fetch(
            `http://localhost:8000/api/v1/books/requests?isbn13=${isbn13}`
          );
          const data = await res.json();
          if (data.length > 0) {
            setObjId(data[0].id);
            if (data.result_code === 200) {
              setLevel(2);
            } else {
              setLevel(3);
            }
          } else {
            setLevel(1);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [isbn13, level, isIsbnValid]);

  useEffect(() => {
    (async () => {
      try {
        if (level === 1) {
          const res = await fetch(
            `http://localhost:8000/api/v1/books/requests`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isbn13 }),
            }
          );
          const data = await res.json();
          setObjId(data[0].id);
          setLevel(2);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [isbn13, level]);

  useEffect(() => {
    (async () => {
      try {
        if (level === 2) {
          const res = await fetch(
            `http://localhost:8000/api/v1/books/requests/${objId}`
          );
          const data = await res.json();
          if (data) {
            if (data.result_code !== 201) {
              setLevel(3);
            }
          } else {
            console.log("something wrong");
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  });
  return (
    <>
      {isIsbnValid ? <div>올바른 ISBN 입니다. </div> : null}
      {level >= 1 ? <div>리퀘스트가 있는지 확인합니다.</div> : null}
      {level >= 2 ? <div>크롤링을 준비합니다.</div> : null}
      {level >= 3 ? <div>성공적으로 업데이트 되었습니다.</div> : null}
    </>
  );
}
