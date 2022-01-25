import { time } from "console";
import React, { useEffect, useState } from "react";
import RequestModel from "../../interfaces/requestModel";
import ResponseModel from "../../interfaces/responseModel";

export default function RequestEffect(): React.ReactElement {
  const [requests, setRequests] = useState<any>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const json = await (await fetch(`/api/books/requsets`)).json();
        setRequests({ data: json, isLoading: null, error: null });
      } catch (err) {
        setRequests({ data: null, isLoading: null, error: err });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (requests?.data) {
        const rq: RequestModel[] = requests.data;
        const refresh = rq.filter((item: RequestModel) => !item.response_id);
        if (refresh) {
          const param = refresh
            .map((item: RequestModel) => `id=${item.response_id}`)
            .join("&");
          try {
            const json = await (await fetch(`/api/books/requsets`)).json();
            // setRequests({ data: json, isLoading: null, error: null });
          } catch (err) {
            // setRequests({ data: null, isLoading: null, error: err });
          }
        }
      }
    })();
  }, [requests]);

  return (
    <>
      {requests
        ? requests?.data.map((item: ResponseModel) => item.isbn13)
        : null}
    </>
  );
}
