import { NextPage } from "next";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { useState, useEffect } from "react";
import useSWR from "swr";
import RequestListComp from "../components/requestList";
import RequestModel from "../interfaces/requestModel";
import ResponseModel from "../interfaces/responseModel";
import styled from "styled-components";
import RequestEffect from "../components/special/requestEffect";
import RequestSWR from "../components/special/requestSWR";

// const TempComp = styled.div`
//   tr,
//   th {
//     padding: 15px;
//   }
// `;

// const fetcher = (...args): Promise<JSON> =>
//   fetch(...args).then((response) => response.json());

// async function typeFetcher<T>(request: RequestInfo): Promise<T> {
//   const response = await fetch(request);
//   return await response.json();
// }

// const unknownrFetcher = async <T extends unknown>(
//   request: RequestInfo
// ): Promise<T> => {
//   const response = await fetch(request);
//   return await response.json();
// };

// const swrFetcher = async (request: RequestInfo): Promise<JSON> => {
//   console.log("fetch one!");
//   const response = await fetch(request);
//   return await response.json();
// };

// function useRequest() {
//   const { data, error } = useSWR(
//     `http://localhost:8000/api/v1/books/requests`,
//     swrFetcher
//   );

//   return {
//     requests: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }

async function jsonFetcher<T>(key: any): Promise<T> {
  return await (await fetch(key)).json();
}

function useJson(request: any) {
  const { data, error } = useSWR(request, jsonFetcher);
  return {
    data,
    loading: !data && !error,
    error,
  };
}

// const tempFetcher = async <T extends unknown>(requests: RequestModel[]) => {
//   const queryParam = requests.map((item) => `isbn13=${item.id}`).join("&");
//   const response = await fetch(
//     `http://localhost:8000/api/v1/books/responses${
//       queryParam ? `?${queryParam}` : ""
//     }`
//   );
//   return await response.json();
// };

const RequestsPage: NextPage = () => {
  // const {
  //   data: requestData,
  //   loading: requestLoading,
  //   error: requestError,
  // } = useJson(`/api/books/requests`);

  // const {
  //   data: responseData,
  //   loading: responseLoading,
  //   error: responseError,
  // } = useJson(requestData ? `/api/books/responses` : null);

  // if (requestLoading && responseLoading) return <div>로딩중입니다.</div>;
  // if (requestError || responseError)
  //   return <div>벡엔드로부터 문제가 발생했습니다</div>;
  // const requestList = requests as unknown as RequestModel[];
  // const responseList = responseData as unknown as ResponseModel[];

  return (
    <RequestSWR />
    // <RequestEffect />
    // <>
    //   <table className="w-full border-2">
    //     <thead className="border-2">
    //       <tr className="border-2">
    //         <th className="border-2" colSpan={2}>
    //           request
    //         </th>
    //         <th className="border-2" colSpan={2}>
    //           response
    //         </th>
    //         <th className="border-2">book</th>
    //       </tr>
    //       <tr>
    //         <th>isbn13</th>
    //         <th>date</th>
    //         <th>success?</th>
    //         <th>date</th>
    //         <th>title</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         {requestList.map((item, idx) => (
    //           <RequestItem item={item} key={idx} />
    //         ))}
    //       </tr>
    //     </tbody>
    //   </table>
    // </>
  );
};

const er = "text-center py-3 border-2 w-24";

function RequestItem({ item }: { item: RequestModel }): React.ReactElement {
  return (
    <>
      <td className={er}>{item.isbn13}</td>
      <td className={er}>{item.created_at}</td>
    </>
  );
}
function ResponseItem({ item }: { item: ResponseModel }): React.ReactElement {
  /**
   * item이 존재하면, response 가 있다는 뜻이므로, 보여주고 끝
   * item이 존재하지 않으면, response가 있을 때까지 주기적으로 찾아봅니다.
   */
  const [response, setResponse] = useState<ResponseModel | undefined>(item);

  useEffect(function () {
    if (!response) {
      const intervalId: NodeJS.Timer = setInterval(() => {
        const data: ResponseModel[] = fetch(
          `http://localhost:8000/api/v1/books/responses?id=${response.id}`
        ).then((res) => res.json());
        if (data) {
          setResponse(data[0]);
          return clearInterval(intervalId);
        }
      }, 1000);
    }
  }, []);

  if (item)
    return (
      <>
        <td className={er}>{item.success}</td>
        <td className={er}>{item.created_at}</td>
      </>
    );

  return (
    <>
      <td className={er}>-</td>
      <td className={er}>wait for server</td>
    </>
  );
}

export default RequestsPage;

const responseFetcher = async <T extends unknown>(
  request: RequestInfo
): Promise<T> => {
  const response = await fetch(request);
  return await response.json();
};

function useResponse(isbns: Array<number>) {
  const isbnQueryParam: Array<string> = isbns.map((item) => `isbn13=${item}`);
  const queryParam = isbnQueryParam.join("&");
  const { data, error } = useSWR(
    `http://localhost:8000/api/v1/books/responses?${queryParam}`,
    responseFetcher
  );

  return {
    responses: data,
    isLoading: !error && !data,
    isError: error,
  };
}
