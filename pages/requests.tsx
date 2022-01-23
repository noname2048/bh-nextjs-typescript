import { NextPage } from "next";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { useState, useEffect } from "react";
import useSWR from "swr";
import RequestListComp from "../components/requestList";
import RequestModel from "../interfaces/requestModel";
import styled from "styled-components";

const TempComp = styled.div`
  tr,
  th {
    padding: 15px;
  }
`;

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
  console.log("fetch one!");
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
      <table className="w-full border-2">
        <thead className="border-2">
          <tr className="border-2">
            <th className="border-2" colSpan={2}>
              request
            </th>
            <th className="border-2" colSpan={2}>
              response
            </th>
            <th className="border-2">book</th>
          </tr>
          <tr>
            <th>isbn13</th>
            <th>date</th>
            <th>success?</th>
            <th>date</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          {requestList.map((item, idx) => (
            <RequestItem item={item} key={idx} />
          ))}
        </tbody>
      </table>
    </>
  );
};

const er = "text-center py-3 border-2 w-24";

function RequestItem({ item }: { item: RequestModel }): React.ReactElement {
  return (
    <tr>
      <td className={er}>{item.isbn13}</td>
      <td className={er}>{item.created_at}</td>
      <td className={er}></td>
      <td className={er}></td>
      <td className={er}></td>
    </tr>
  );
}

export default RequestsPage;

const responseFetcher = async <T extends unknown>(
  request: RequestInfo
): Promise<T> => {
  const response = await fetch(request);
  return await response.json();
};

function useResponse(isbns: Array<JSON>) {
  const request: RequestInfo = new Request(
    `http://localhost:8000/api/v1/books/responses`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isbns),
    }
  );
  const { data, error } = useSWR(request, responseFetcher);

  return {
    requests: data,
    isLoading: !error && !data,
    isError: error,
  };
}
