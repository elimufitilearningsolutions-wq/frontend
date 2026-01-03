import React from "react";
import ExamsList from "./ExamsListPerYear";
import SecondaryNotesDownload from "./SecondaryNotesDownload";
const DPTENotes =()=>{
    const items = [
        { name: 'Diploma in Primary Teacher Education ', year: 2024, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "schemes" },
        
    ];

    return (
        <>
        
        <ExamsList           
            heading="DPTE NOTES"
            items={items}
            navigateTo="/secondary/schemes/downloads"
        />
        <SecondaryNotesDownload/>
        </>
    );
}

export default DPTENotes