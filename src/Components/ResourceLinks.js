import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import {
  prePrimaryItems,
  primaryItems,
  schoolTittles,
  secondaryItems,
  jssItems,
  seniorSchoolItems,
  teachersCollageItems,
} from "./schoolItems.js";
import config from "../config.js";
import "../assets/resourceLinks.css";

const ResourceLinks = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async (path, value) => {
    try {
      const apiUrl = config.API_BASE_URL;
      const URL = `${apiUrl}/${path}/${value}`;
      await axios.get(URL);
    } catch (err) {
      console.error("Could not fetch data");
    }
  };

  useEffect(() => {
    if (selectedItem) {
      fetchData(selectedItem.path, selectedItem.value);
    }
  }, [selectedItem]);

  const handleClick = (items, value) => {
    switch (value) {
      case "/primary/schemes":
      case "/primary/revision/notes":
      case "/primary/curriculum/designs":
      case "/primary/assessment/tools":
      case "/grade1/examinations":
      case "/grade2/examinations":
      case "/grade3/examinations":
      case "/grade4/examinations":
      case "/grade5/examinations":
      case "/grade6/examinations":
      case "/grade7/examinations":
      case "/grade8/examinations":
      case "/play/group/exams":
      case "/pp1/exams":
      case "/pp2/exams":
      case "/secondary/schemes":
      case "/secondary/fullset/examinations":
      case "/secondary/notes":
      case "/kcse/trial/examinations":
      case "/kcse/past/papers":
      case "/secondary/holiday/revision":
      case "/jss/assessment/tools":
      case "/jss/curriculum/designs":
      case "/jss/fullset/examinations":
      case "/jss/holiday/assignments":
      case "/jss/notes":
      case "/jss/schemes":
      case "/jss/lesson/plans":
      case "/senior/school/schemes":
      case "/grade10/examinations":
      case "/senior/school/notes":
      case "/senior/school/curriculum/designs":
      case "/pre/primary/schemes":
      case "/pre/primary/curriculum/designs":
      case "/pre/primary/holiday/assignments":
      case "/primary/holiday/assignments":
      case "/dpte/notes":
      case "/cpa/notes":
      case "/ecd/notes":
      case "/diploma/notes":
        window.location.href = value;
        return;
      default: {
        const selected = items.find((item) => item.value === value);
        if (selected) {
          setSelectedItem(selected);
        }
      }
    }
  };

  const renderListItems = (items) =>
    items.map((item, index) => (
      <li
        key={index}
        className="list-group-item border-0 cursor-pointer"
        style={{ backgroundColor: "transparent" }}
      >
        <button
          type="button"
          className="btn btn-link text-black fw-bold text-decoration-none px-2 py-2 rounded bg-light hover-bg-dark border-0"
          onClick={() => handleClick(items, item.value)}
        >
          {item.label}
        </button>
      </li>
    ));

  return (
    <div className="container-fluid p-0 d-flex flex-column align-items-center">
      <Helmet>
        <title>School Learning Resources in Kenya | Elimufiti</title>
        <meta
          name="description"
          content="Explore CBC and CBE learning resources for Pre-Primary, Primary, Junior School, Senior School, and Secondary education in Kenya."
        />
        <link
          rel="canonical"
          href="https://www.elimufiti.co.ke/school/resources"
        />
      </Helmet>

      <div className="w-100 custom-background-pri text-center">
        <header className="schoolTittle">{schoolTittles.prePrimary}</header>
        <ul className="list-group pt-4 pb-4 border-0">
          {renderListItems(prePrimaryItems)}
        </ul>
      </div>

      <div className="w-100 custom-background-primary text-center">
        <header className="schoolTittle">{schoolTittles.primary}</header>
        <ul className="list-group pt-4 pb-4 border-0">
          {renderListItems(primaryItems)}
        </ul>
      </div>

      <div className="w-100 custom-background-jss text-center">
        <header className="schoolTittle">{schoolTittles.jss}</header>
        <ul className="list-group pt-4 pb-4 border-0">
          {renderListItems(jssItems)}
        </ul>
      </div>

      <div className="w-100 custom-background-jss text-center">
        <header className="schoolTittle">{schoolTittles.senior}</header>
        <ul className="list-group pt-4 pb-4 border-0">
          {renderListItems(seniorSchoolItems)}
        </ul>
      </div>

      <div className="w-100 custom-background-sec text-center">
        <header className="schoolTittle">{schoolTittles.secondary}</header>
        <ul className="list-group pt-4 pb-4 border-0">
          {renderListItems(secondaryItems)}
        </ul>
      </div>

      <div className="w-100 custom-background-container text-center">
        <div className="custom-background-teachers-collage">
          <div className="background-overlay"></div>
        </div>

        <header className="schoolTittle">
          {schoolTittles.teachersCollage}
        </header>
        <ul className="list-group pt-4 pb-4 border-0">
          {renderListItems(teachersCollageItems)}
        </ul>
      </div>
    </div>
  );
};

export default ResourceLinks;
