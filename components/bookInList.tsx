import BookModel from "../interfaces/bookModel";
import React from "react";
import Image from "next/image";

export default function bookInList({
  item,
  key,
}: {
  item: BookModel;
  key: number | undefined;
}): React.ReactElement {
  return (
    <ul className="rounded overflow-hidden">
      <Image
        src={`https://job-book-image.s3.ap-northeast-2.amazonaws.com/${item.cover}`}
        alt={`book image for isbn ${item.isbn13}`}
        width={100}
        height={100}
      />
      <li>{item.cover}</li>
      <li>{item.created_at}</li>
      <li></li>
    </ul>
  );
}
