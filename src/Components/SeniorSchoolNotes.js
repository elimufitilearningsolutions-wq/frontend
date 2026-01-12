// src/components/SeniorSchoolNotes.js
import React from "react";
import ExamsList from "./ExamsListPerYear";

const SeniorSchoolNotes = ({ isLoggedIn, clearToken }) => {
  const items = [
    {
      name: "SENIOR SCHOOL NOTES 2026",
      year: 2026,
      bgColor: "rgba(0, 0, 0, 0.2)",
      textColor: "rgb(0, 0, 0)",
      path: "senior/school",
      value: "notes",
    },
    {
      name: "SENIOR SCHOOL NOTES 2025",
      year: 2025,
      bgColor: "rgba(0, 0, 0, 0.1)",
      textColor: "rgb(0, 0, 0)",
      path: "/senior/school",
      value: "notes",
    },
    {
      name: "SENIOR SCHOOL NOTES 2024",
      year: 2024,
      bgColor: "rgba(0, 0, 0, 0.2)",
      textColor: "rgb(0, 0, 0)",
      path: "/senior/school",
      value: "notes",
    },
    {
      name: "SENIOR SCHOOL NOTES 2023",
      year: 2023,
      bgColor: "rgba(0, 0, 0, 0.1)",
      textColor: "rgb(0, 0, 0)",
      path: "/senior/school",
      value: "notes",
    },
  ];

  return (
    <ExamsList
      heading="SENIOR SCHOOL NOTES"
      items={items}
      navigateTo="/senior/school/notes/downloads"
    />
  );
};

export default SeniorSchoolNotes;
