import RequestModel from "../interfaces/requestModel";
import React from "react";

type RequestListProps = {
  requestList: Array<RequestModel>;
};

export default function RequestList({
  requestList,
}: RequestListProps): React.ReactElement {
  return (
    <div className="border-2 m-5 flex flex-col">
      {requestList.map((item, idx) => (
        <ul key={idx}>
          <li>isbn13</li>
          <li>{item.isbn13}</li>
          <li>date</li>
          <li>{item.created_at}</li>
        </ul>
      ))}
    </div>
  );
}
