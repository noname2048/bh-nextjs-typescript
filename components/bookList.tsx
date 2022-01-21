import BookModel from "../interfaces/bookModel";
import BookInList from "./bookInList";
import React from "react";

type BookListProps = {
  bookList: Array<BookModel>;
};

export default function BookList({
  bookList,
}: BookListProps): React.ReactElement {
  return (
    <div className="border-2 m-5 flex flex-col">
      <ul className="flex flex-row justify-around mb-5 bg-red-200">
        <li>isbn</li>
        <li>date</li>
        <li>success?</li>
        <li>title</li>
        <li>response_date</li>
      </ul>
      {bookList.map((item, idx) => (
        // <ul key={idx}>
        //   <li>{item.title}</li>
        //   <li>{item.pub_date}</li>
        // </ul>
        <BookInList item={item} key={idx} />
      ))}
    </div>
  );
}
