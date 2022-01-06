import type { NextPage } from "next/types";
import { useState } from "react";

const ResponseList: NextPage = () => {
  const [result, setResult] = useState([]);
  return (
    <>
      {result.length === 0
        ? "검색결과가 없습니다"
        : result.map((item, idx) => <div key={idx}>{item}</div>)}
    </>
  );
};

export default ResponseList;
