import React, { useState } from 'react';
import axios from 'axios';
import {
    prePrimaryItems,
    primaryItems,
    jssItems,
    seniorSchoolItems,
    secondaryItems,
    teachersCollageItems
} from './schoolItems.js';
import config from '../config.js';

/* =======================
   CATEGORY → TABLE MAP
======================= */
const categoryTableMap = {
    "create/schemes": "schemes",
    "create/lesson/plans": "lesson_plans",
    "create/notes": "notes",
    "create/curriculum/designs": "curriculum_designs",
    "create/grade7/examinations": "grade7_examinations",
    "create/grade8/examinations": "grade8_examinations",
    "create/fullset/examinations": "fullset_examinations",
    "create/kcse/past/papers": "ksce_past_papers",
    "create/kcse/trial/examinations": "kcse_trial_examinations",
    "create/revision/notes": "revision_notes",
    "create/play/group/exams": "playgroup_exams",
    "create/pp1/exams": "pp1_exams",
    "create/pp2/exams": "pp2_exams",
    "create/grade1/exam": "grade1_exams",
    "create/grade2/exam": "grade2_exams",
    "create/grade3/exam": "grade3_exams",
    "create/grade4/exam": "grade4_exams",
    "create/grade5/exam": "grade5_exams",
    "create/grade6/exam": "grade6_exams",
    "create/grade7/exam": "grade7_exams",
    "create/grade8/exam": "grade8_exams",
    "create/grade9/exam": "grade9_exams",
    "create/grade10/exams": "grade10_exams",
    "create/assessment/tools": "assessment_tools",
    "create/holiday/assignments": "holiday_assignments",
    "/create/cpanotes": "cpanotes",
    "/create/dptenotes": "dptenotes",
    "/create/ecdnotes": "ecdnotes",
    "/create/diplomanotes": "diplomanotes"
};

/* =======================
   ALLOWED FILE TYPES
======================= */
const allowedFileExtensions = [
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
    '.txt', '.rtf', '.csv', '.odt', '.ods', '.odp',
    '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp', '.svg',
    '.mp3', '.wav', '.aac', '.ogg', '.flac', '.m4a',
    '.mp4', '.mov', '.avi', '.mkv', '.flv', '.wmv', '.webm', '.3gp',
    '.zip', '.rar', '.7z', '.tar', '.gz', '.bz2',
    '.html', '.htm', '.css', '.js', '.json', '.xml', '.yaml', '.yml',
    '.img', '.iso'
];

const Support = () => {
    /* =======================
       STATE
    ======================= */
    const [values, setValues] = useState({
        form: "",
        examMS: "",
        term: "",
        subject: "",
        year: "",
        set: "",
        grade: "",
        files: []
    });

    const [path, setPath] = useState("");
    const [schema, setSchema] = useState("");
    const [categoryPath, setCategoryPath] = useState("");
    const [table, setTable] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showForm, setShowForm] = useState(false);

    /* =======================
       HANDLERS
    ======================= */
    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const validFiles = selectedFiles.filter(file => {
            const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
            return allowedFileExtensions.includes(ext);
        });

        setValues(prev => ({ ...prev, files: validFiles }));
    };

    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        setCategoryPath(selected);
        setTable(categoryTableMap[selected] || "");
    };

    const handleClick = (e) => {
        const selectedPath = e.target.getAttribute("name");
        const schemaPath = e.target.getAttribute("schema");

        setPath(selectedPath);
        setSchema(schemaPath);
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!schema || !table || !categoryPath) {
            setErrorMessage("Schema, category or table missing");
            return;
        }

        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(file => formData.append(key, file));
            } else {
                formData.append(key, value);
            }
        });

        formData.append("schema", schema);
        formData.append("table", table);

        try {
            const apiUrl = config.API_BASE_URL;
            const endpoint = `${apiUrl}/${path}/${categoryPath}`;

            const response = await axios.post(endpoint, formData);
            setSuccessMessage(response.data.message || "Upload successful");
            resetForm();
        } catch (error) {
            setErrorMessage("An error occurred while submitting the form.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setValues({
            form: "",
            examMS: "",
            term: "",
            subject: "",
            year: "",
            set: "",
            grade: "",
            files: []
        });
    };

    /* =======================
       RENDER
    ======================= */
    return (
        <div className="row bgs">
            <ul className="row list-group-flush py-3 bg-success text-white">
                <li className="col-12 col-md-auto list-group-item text-center">
                    <p className="text-info m-0">CREATE RESOURCES</p>
                </li>

                {["pre/primary", "primary", "jss", "senior/school", "secondary", "college"].map((item, index) => (
                    <li
                        key={index}
                        name={item}
                        schema={item.replace('/', '')}
                        className="col-6 col-md list-group-item text-center"
                        style={{ cursor: 'pointer' }}
                        onClick={handleClick}
                    >
                        {item.toUpperCase()}
                    </li>
                ))}
            </ul>

            {path && (
                <div className="text-center mt-3">
                    <h4>{path}</h4>
                </div>
            )}

            {showForm && (
                <>
                    <div className="d-flex justify-content-center my-3">
                        <select
                            className="custom-select px-5 rounded bg-primary text-white"
                            value={categoryPath}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Select Category</option>
                            {Object.keys(categoryTableMap).map(key => (
                                <option key={key} value={key}>
                                    {categoryTableMap[key].replace(/_/g, ' ').toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="d-flex justify-content-center">
                        <form onSubmit={handleSubmit} className="bg-white p-3 rounded">
                            {["examMS", "set", "grade", "form", "term", "year", "subject"].map(field => (
                                <div key={field} className="mb-2">
                                    <label className="form-label">
                                        <strong>{field.toUpperCase()}</strong>
                                    </label>

                                    {field === "examMS" ? (
                                        <select
                                            className="form-select"
                                            name={field}
                                            value={values[field]}
                                            onChange={handleInput}
                                        >
                                            <option value="">Select</option>
                                            <option value="Exam">Exam</option>
                                            <option value="Marking Scheme">Marking Scheme</option>
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name={field}
                                            value={values[field]}
                                            onChange={handleInput}
                                        />
                                    )}
                                </div>
                            ))}

                            <input
                                type="file"
                                className="form-control my-2"
                                multiple
                                onChange={handleFileChange}
                            />

                            <button className="btn btn-success w-100" disabled={loading}>
                                {loading ? "Submitting..." : "Submit"}
                            </button>

                            {errorMessage && <p className="text-danger text-center mt-2">{errorMessage}</p>}
                            {successMessage && <p className="text-success text-center mt-2">{successMessage}</p>}
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default Support;
