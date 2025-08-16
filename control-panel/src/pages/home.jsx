import React from "react";
import StatCard from "../components/StatCard.jsx";

function Stats({ children }) {
  return <div className="">{children}</div>;
}

const Home = () => {
  return (
    <div class="w-screen h-screen justify-center items-center flex flex-col">
      <h1 class="text-3xl font-bold underline"> Welcome to Legionnaire </h1>
      <p class="pt-5 text-2xl">This is the control panel.</p>
      <p class="pt-2 text-xl">
        Use the navigation bar to access different pages.
      </p>
      <div className="grid grid-flow-col grid-row-3 gap-1">
        <Stats>
          <StatCard title={"Active Clients"} value={"Hardcode"} />
        </Stats>
        <Stats>
          <StatCard title={"Active Clients"} value={"47"} />
        </Stats>
        <Stats>
          <StatCard title={"Active Clients"} value={"Hardcode"} />
        </Stats>
      </div>
    </div>
  );
};
export default Home;
