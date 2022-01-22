import { NextPage } from "next";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { useState, useEffect } from "react";
import useSWR from "swr";
import RequestListComp from "../components/requestList";
import RequestModel from "../interfaces/requestModel";

const fetcher = (...args): Promise<JSON> =>
  fetch(...args).then((response) => response.json());

async function typeFetcher<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  return await response.json();
}

const unknownrFetcher = async <T extends unknown>(
  request: RequestInfo
): Promise<T> => {
  const response = await fetch(request);
  return await response.json();
};

const swrFetcher = async (request: RequestInfo): Promise<JSON> => {
  const response = await fetch(request);
  return await response.json();
};

function useRequest() {
  const { data, error } = useSWR(
    `http://localhost:8000/api/v1/books/requests`,
    swrFetcher
  );

  return {
    requests: data,
    isLoading: !error && !data,
    isError: error,
  };
}

const RequestsPage: NextPage = () => {
  const { requests, isLoading, isError } = useRequest();
  if (isLoading) return <div>로딩중입니다.</div>;
  if (isError) return <div>벡엔드로부터 문제가 발생했습니다</div>;
  const requestList = requests as unknown as RequestModel[];
  return (
    <>
      {requestList.map((item, idx) => (
        <RequestItem item={item} key={idx} />
      ))}
    </>
  );
};

function RequestItem({
  item,
  key,
}: {
  item: RequestModel;
  key: number;
}): React.ReactElement {
  return (
    <div className="flex flex-row gap-4">
      <span>isbn13</span>
      <span>{item.isbn13}</span>
      <span>date</span>
      <span>{item.created_at}</span>
    </div>
  );
}

export default RequestsPage;
