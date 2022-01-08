import { useState, useEffect } from "react";
import useSWR from "swr";

export default function NoResultAskAndSendRequestIsbn({
  isbn13,
}: {
  isbn13: number;
}) {
  // request에 있는지 확인하고 요청보내기

  const fetcher = (url: string, ...args: any[]) =>
    fetch(url, ...args).then((res) => res.json());

  const { data, error } = useSWR(
    `/api/v1/books/requests/search?isbn13=${isbn13}`,
    fetcher
  );

  const postFetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isbn13: isbn13 }),
    });

  if (data.length === 0) {
    const { rData, rError } = useSWR(`/api/v1/books/requests`, postFetcher);
  }

  return <div></div>;
}
