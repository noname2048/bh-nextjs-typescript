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
      console.log("interval", intervalId);
      if (requests?.error) {
        clearInterval(intervalId);
      } else if (requests?.data) {
        const refresh = requests.data.filter(
          (item: RequestModel) => !item.response_id
        );
        if (refresh) {
          const param = refresh
            .map((item: RequestModel) => `id=${item.response_id}`)
            .join("&");

          let newFetchData: any;
          try {
            newFetchData = await (
              await fetch(
                `http://localhost:8000/api/v1/books/requests` + param
                  ? `?${param}`
                  : ""
              )
            ).json();
          } catch (err) {
            setRequests({ data: null, error: err });
            clearInterval(intervalId);
          }

          const newRequestsData = requests.map((oldItem: RequestModel) => {
            let same = newFetchData.filter(
              (item: RequestModel) => oldItem.response_id == item.response_id
            );
            if (same) {
              return same;
            }
            return oldItem;
          });

          setRequests({
            data: newRequestsData,
            error: null,
          });
        } else {
          clearInterval(intervalId);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   console.log("useeffect02");
  //   (async () => {
  //     const intervalId: any = setInterval(async () => {
  //       console.log("interval");
  //       console.log(requests);
  //       if (requests?.data) {
  //         const rq: RequestModel[] = requests.data;
  //         const refresh = rq.filter((item: RequestModel) => !item.response_id);
  //         if (refresh) {
  //           const param = refresh
  //             .map((item: RequestModel) => `id=${item.response_id}`)
  //             .join("&");
  //           try {
  //             const json = await (
  //               await fetch(
  //                 `http://localhost:8000/api/v1/books/requests` + param
  //                   ? `?${param}`
  //                   : ""
  //               )
  //             ).json();
  //             const newJson = requests.map((old: RequestModel) => {
  //               let same = json.filter(
  //                 (item: RequestModel) => old.response_id == item.response_id
  //               );
  //               if (same) {
  //                 return same;
  //               }
  //               return old;
  //             });

  //             setRequests({
  //               data: newJson,
  //               isLoading: null,
  //               error: null,
  //             });
  //           } catch (err) {
  //             setRequests({ data: null, isLoading: null, error: err });
  //           }
  //         } else {
  //           return clearInterval(intervalId);
  //         }
  //       }
  //     }, 1000);
  //   })();
  // }, []);

  return (
    <>
      {requests?.data
        ? requests?.data.map((item: ResponseModel) => (
            <div key={item.id}>{item.isbn13}</div>
          ))
        : null}
    </>
  );
}
