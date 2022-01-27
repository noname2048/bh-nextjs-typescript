import useSWR from "swr";

const fetcher = (request: RequestInfo) =>
  fetch(request).then((res) => res.json());

export default function RequestSWR() {
  const { data: requests, error: requestsError } = useSWR<RequestInfo, any>(
    `http://localhost:8000/api/v1/books/requests`,
    fetcher
  );

  if (requestsError) return <div>error</div>;
  if (!requests && !requestsError) return <div>loading...</div>;
  return <>{JSON.stringify(requests)}</>;
}
