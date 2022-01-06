import type { NextPage } from "next";
import Banner from "../components/banner";

const Home: NextPage = () => {
  return (
    <div>
      <div className="text-3xl font-bold underline">Home</div>
      <Banner></Banner>
    </div>
  );
};

export default Home;
