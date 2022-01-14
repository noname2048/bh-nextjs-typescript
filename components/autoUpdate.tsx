import { useEffect, useState, useMemo, useRef } from "react";
import useSWR from "swr";

function handleOnClick() {
  (async () => {
    const res = await fetch(`http://localhost:8000/api/v1/books/requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([{ isbn13: 9791188102051 }]),
    });
    const data = await res.json();
    console.log(data);
  })();
}

export default function Update({ isbn13 }: { isbn13: number }) {
  /**
   * 레벨이 대한 설명
   * -1 유효하지 않음
   * 0 초기상태
   * 1 리퀘스트가 없어서 보냈음
   * 2 리퀘스트가 있어서 대기중
   * 3 준비가 완료됨
   */
  const [level, setLevel] = useState<number>(0);
  const [msgArray, setMsgArray] = useState<string[]>([]);
  const [objId, setObjId] = useState<string>("");
  const isIsbnValid: boolean = useMemo(
    () => isbn13 >= 10 ** 12 && isbn13 < 10 ** 13,
    [isbn13]
  );
  //new useEffect
  useEffect(() => {
    (async () => {
      let keepGo = true;
      try {
        const data: Object[] = await (
          await fetch(
            `http://localhost:8000/api/v1/books/requests?isbn13=${isbn13}`
          )
        ).json();
        if (data.length === 0) {
          setMsgArray((prev) => [
            ...prev,
            "해당 리퀘스트가 존재하지 않습니다.",
          ]);
          const res = await fetch(
            `http://localhost:8000/api/v1/books/requests`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify([{ isbn13 }]),
            }
          );
          const data: Object[] = await res.json();
          if (res.status === 201) {
            setMsgArray((prev) => [
              ...prev,
              "해당 리퀘스트를 자동으로 작성하였습니다.",
            ]);
          } else {
            keepGo = false;
            setMsgArray((prev) => [
              ...prev,
              "해당 리퀘스트를 자동으로 작성하는데에 오류가 발생하였습니다.",
            ]);
          }
        }

        setMsgArray((prev) => [
          ...prev,
          "자동으로 결과 반영을 확인중입니다...",
        ]);

        const loop = setInterval(async () => {
          if (keepGo) {
            console.log("fetch!");
            const res = await fetch(
              `http://localhost:8000/api/v1/books/requests?isbn13=${isbn13}`
            );
            const data = await res.json();
            if (data.length > 0 && data.result_code === 201) {
              setMsgArray((prev) => [...prev, "크롤링 완료!"]);
              clearInterval(loop);
            }
          }
        }, 3000);
        return () => clearInterval(loop);
      } catch (err) {
        keepGo = false;
        setMsgArray((prev) => [...prev, "백그라운드에 문제가 발생했습니다."]);
        console.log(err);
      }
    })();
  }, [isbn13]);

  // useEffect(() => {
  //   console.log({ level, msgArray, objId });

  //   (async () => {
  //     try {
  //       if (isIsbnValid === false) {
  //         setLevel(-1);
  //         setMsgArray((msgs) => ["유효한 isbn13 값이 아닙니다"]);
  //       } else {
  //         switch (level) {
  //           case 0:
  //             console.log(0);
  //             const data = await (
  //               await fetch(
  //                 `http://localhost:8000/api/v1/books/requests?isbn13=${isbn13}`
  //               )
  //             ).json();
  //             if (data.length === 0) {
  //               const data: Object[] = await (
  //                 await fetch(`http://localhost:8000/api/v1/books/requests`, {
  //                   method: "POST",
  //                   headers: { "Content-Type": "application/json" },
  //                   body: JSON.stringify({ isbn13 }),
  //                 })
  //               ).json();
  //               if (data.length > 0) {
  //                 setMsgArray((msgs) => [...msgs, "리퀘스트를 보냈습니다."]);
  //                 setLevel(1);
  //               } else {
  //                 setMsgArray((msgs) => [
  //                   ...msgs,
  //                   "리퀘스트를 정상적으로 보내지 못했습니다.",
  //                 ]);
  //                 setLevel(5);
  //               }
  //             } else {
  //               console.log("num");
  //               setObjId(data[0].id);
  //               if (data.result_code === 201) {
  //                 setMsgArray((msgs) => [...msgs, "준비가 완료되었습니다!"]);
  //                 setLevel(3);
  //               } else if (data.result_code === 200) {
  //                 setMsgArray((msgs) => [
  //                   ...msgs,
  //                   "리퀘스트가 있어서 대기중입니다.",
  //                 ]);
  //                 setLevel(2);
  //               } else {
  //                 console.log(data);
  //                 setMsgArray((msgs) => [
  //                   ...msgs,
  //                   "리퀘스트 처리에 문제가 있음을 확인했습니다. 관리자에게 연락하세요.",
  //                 ]);
  //                 setLevel(5);
  //               }
  //             }
  //             break;
  //           case 1:
  //           case 2:
  //             // 주기적인 폴링 함수 등록
  //             break;
  //         }
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();

  //   console.log("end", { level, msgArray, objId });
  // }, [isbn13, level, objId, isIsbnValid, msgArray]);

  return (
    <>
      {isIsbnValid ? msgArray.map((s, idx) => <div key={idx}>{s}</div>) : null}
      <button
        className="border-2 p-2 bg-slate-400 rounded-md"
        onClick={handleOnClick}
      >
        humm
      </button>
    </>
  );
}
