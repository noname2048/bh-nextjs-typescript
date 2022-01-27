import { stringify } from "querystring";
import useSWR, { Key, Fetcher } from "swr";
import RequestModel from "../../interfaces/requestModel";

const fetcherOne = (request: string) => {
  console.log("fetch 01");
  return fetch(request).then((res) => res.json());
};

const fetcherTwo = (request: string) => {
  console.log("fetch 02");
  return fetch(request).then((res) => res.json());
};

const shouldRefresh = (requests: any) => {
  console.log("fetch 03"); // 3번 호출 된다 03, 01, 03, 02, 03 이렇게
  if (!requests) return false;
  let target = requests.filter((item: RequestModel) => !item.response_id);
  if (target) {
    return (
      `http://localhost:8000/api/v1/books/requests?` +
      target.map((item: RequestModel) => `id=${item.id}`).join("&")
    );
  }
  return false;
};

export default function RequestSWR() {
  const { data: requests, error: requestsError } = useSWR<Key, Fetcher>(
    `http://localhost:8000/api/v1/books/requests`,
    fetcherOne,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );

  const { data: updatedRequests, error: updatedRequestsError } = useSWR(
    shouldRefresh(requests),
    fetcherTwo,
    { refreshInterval: 1000 }
  );

  if (requestsError) return <div>error</div>;
  if (!requests && !requestsError) return <div>loading...</div>;

  let exchange;
  return (
    <>
      <div className="border-2">{JSON.stringify(requests)}</div>
      <div>{JSON.stringify(updatedRequests)}</div>
    </>
  );
}
