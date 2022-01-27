import React, { useState, useEffect, useRef } from "react";
import RequestModel from "../../interfaces/requestModel";

const API_BASE = `http://localhost:8000/api/v1/books/requests`;

export default function RequestInterval() {
  const [request, setRequest] = useState<any>([]);
  const [error, setError] = useState<any>(null);

  const savedRequests = useRef<any>(null);
  const clearId = useRef<any>(null);

  useEffect(() => {
    async function optimalRequestFetcher() {
      if (savedRequests.current === null) {
        let data;
        try {
          data = await (await fetch(API_BASE)).json();
        } catch (err) {
          setError(err);
          clearInterval(clearId.current);
          clearId.current = null;
        }
        savedRequests.current = data;
        setRequest(savedRequests.current);
      } else if (savedRequests.current?.length > 0) {
        const target = savedRequests.current
          .map((item: RequestModel, idx: number) => {
            if (!item.response_id) return [idx, item.id];
            else return null;
          })
          .filter((item: any) => item);
        console.log(target);
        if (target?.length === 0) return;
        const param = target
          .map((item: [number, string]) => `id=${item[1]}`)
          .join("&");
        const idxs = target.map((item: [number, string]) => item[0]);
        const url = `${API_BASE}?${param}`;
        try {
          const data = await (await fetch(url)).json();
          idxs.forEach((item: number, idx: number) => {
            savedRequests.current[item] = data[idx];
          });
          setRequest(savedRequests.current);
        } catch (err) {
          setError(err);
          clearInterval(clearId.current);
          clearId.current = null;
        }
      }
    }

    clearId.current = setInterval(optimalRequestFetcher, 3000);
    return () => {
      if (clearId.current) clearInterval(clearId.current);
    };
  }, []);

  return <>{JSON.stringify(request)}</>;
}
