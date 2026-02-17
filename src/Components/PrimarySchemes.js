// src/components/PrimarySchemes.js
import React from "react";
import ExamsList from "./ExamsListPerYear";

const PrimarySchemes = () => {

  const items = [
    {
      name: "Primary Schemes of Work 2026",
      year: 2026,
      textColor: "#1a1a1a",
      path: "primary",
      value: "schemes",
    },
    {
      name: "Primary Schemes of Work 2025",
      year: 2025,
      textColor: "#1a1a1a",
      path: "primary",
      value: "schemes",
    },
  ];

  return (
    <ExamsList
      customBg="
       
        url('/images/cover1.png')
      "
      heading="Primary Schemes of Work"
      items={items}
      navigateTo="/primary/schemes/downloads"
    />
  );
};

export default PrimarySchemes;
