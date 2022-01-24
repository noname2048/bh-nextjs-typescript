import { useEffect, useState } from "react";
import useSWR from "swr";

import RequestModel from "../../interfaces/requestModel";
import ResponseModel from "../../interfaces/responseModel";

async function jsonFetcher(request: any) {
  return await (await fetch(request)).json();
}

function useJson(key: any) {
  const { data, error } = useSWR(key, jsonFetcher);
  return { data, loading: !data && !error, error };
}

function isRequestThenChangeToQueryParams(requests: RequestModel[]) {
  if (requests) {
    return "?" + requests.map((item) => `id=${item.id}`).join("&");
  }
  return "";
}

export default function RequestList() {
  const {
    data: requestData,
    loading: requestLoading,
    error: requestError,
  } = useJson(`/api/books/requests`);

  const {
    data: responseData,
    loading: responseLoading,
    error: responseError,
  } = useJson(
    requestData
      ? `/api/books/responses${isRequestThenChangeToQueryParams(requestData)}`
      : null
  );

  const [responseIds, setResponseIds] = useState<Array<string | undefined>>([]);
  useEffect(() => {
    fetch(`/api/books/requests`);
  }, [responseData]);

  if (requestLoading) return <div>로딩중</div>;
  if (requestError) return <div>리퀘스트 실패</div>;
  return (
    <>
      {requestData.map((item: RequestModel, idx: number) => (
        <div key={idx}>{item.isbn13}</div>
      ))}
      {responseData.map((item: ResponseModel | undefined, idx: number) =>
        item ? (
          <div key={idx}>{item.created_at}</div>
        ) : (
          <div key={idx}>대기중</div>
        )
      )}
    </>
  );
}
