import React from "react";
import { Helmet } from "react-helmet-async";
import FirstContent from "./FirstContent.jsx";
import SecondContent from "./SecondContent.js";
import SecondContentSmallScreen from "./SecondContentSmallScreen.js";
import ThirdContent from "./ThirdContent.js";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>CBE Learning Materials in Kenya | Elimufiti</title>
        <meta
          name="description"
          content="Access CBE learning materials for Junior and Senior Schools in Kenya. Download schemes of work, lesson plans, exams, and revision resources on Elimufiti."
        />
        <link rel="canonical" href="https://www.elimufiti.co.ke/" />
      </Helmet>

      <div>
        <FirstContent />
        <SecondContent />
        <SecondContentSmallScreen />
        <ThirdContent />
      </div>
    </>
  );
};

export default Home;
