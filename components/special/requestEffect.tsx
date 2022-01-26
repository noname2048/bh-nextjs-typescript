import { time } from "console";
import React, { useEffect, useState, useRef } from "react";
import RequestModel from "../../interfaces/requestModel";
import ResponseModel from "../../interfaces/responseModel";

/**
 * 1. request => 리스트로된 json data, RequestModel[] 타입의 데이터를 얻는다.
 * 2. 해당 리스트에서 response_id가 등록되지 않은 개체를 찾아 모은다
 * 3. 1초마다 다시 request를 보낸다
 * 4. response_id가 모두 등록될때까지 3번과정을 진행하여 업데이트한다.
 */
export default function RequestEffect(): React.ReactElement {
  const [requests, setRequests] = useState<any>({
    data: null,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const json = await (
          await fetch(`http://localhost:8000/api/v1/books/requests`)
        ).json();
        setRequests({ data: json, error: null });
      } catch (err) {
        setRequests({ data: null, error: err });
      }
    })();

    const intervalId: any = setInterval(async () => {
      // 인터벌 시작지점
      console.log("interval", intervalId);
      // 에전 리퀘스트 가져와서
      setRequests(
        async (prevRequest: {
          data: RequestModel[] | undefined;
          error: any;
        }) => {
          // 에러나있으면 종료
          if (prevRequest?.error) {
            clearInterval(intervalId);
            return prevRequest;
          } else if (prevRequest?.data) {
            // 에러가 없다면 리프레시 확인
            let refresh = prevRequest.data.filter(
              (item: RequestModel) => !item.response_id
            );
            if (refresh) {
              // 리프레시가 있다면
              const param = refresh
                .map((item: RequestModel) => `id=${item.response_id}`)
                .join("&");
              let newFetchData: any;
              try {
                newFetchData = await (
                  await fetch(
                    `http://localhost:8000/api/v1/books/requests?${param}`
                  )
                ).json();
              } catch (err) {
                // 여기서 에러 발생시 에러를 기록한다.
                return { data: null, error: err };
              }
              // 예전 데이터에서 새로운 데이터를 만든다
              const newRequestsData = prevRequest.data.map(
                (oldItem: RequestModel) => {
                  // 예전데이터를 돌면서 업데이트된 데이터와 매칭되면
                  let same = newFetchData.filter(
                    (item: RequestModel) =>
                      oldItem.response_id == item.response_id
                  );
                  if (same) {
                    return same;
                  }
                  return oldItem;
                }
              );

              return { data: newRequestsData, error: null };
            } else {
              clearInterval(intervalId);
              return prevRequest;
            }
          }
          clearInterval(intervalId);
          return prevRequest;
        }
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {requests?.data
        ? requests?.data.map((item: ResponseModel) => (
            <div key={item.id}>{item.isbn13}</div>
          ))
        : null}
      {requests.error ? requests.error : null}
      {JSON.stringify(requests)}
    </>
  );
}
