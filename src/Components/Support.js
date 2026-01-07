import React, { useState } from 'react';
import axios from 'axios';
import {
    prePrimaryItems,
    primaryItems,
    jssItems,
    secondaryItems
} from './schoolItems.js';
import config from '../config.js';

/* =======================
   CATEGORY → TABLE MAP
======================= */
const categoryTableMap = {
    "create/schemes": "schemes",
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
    "create/assessment/tools": "assessment_tools",
    "create/holiday/assignments": "holiday_assignments"
};

/* =======================
   ALLOWED FILE TYPES
======================= */
const allowedFileExtensions = [
    '.pdf', '.docx', '.doc', '.xlsx', '.xls', '.pptx', '.ppt',
    '.txt', '.rtf', '.csv', '.jpg', '.jpeg', '.png', '.gif',
    '.bmp', '.tiff', '.zip', '.rar', '.7z', '.tar', '.gz',
    '.mp3', '.wav', '.mp4', '.mov', '.avi', '.mkv', '.flv',
    '.html', '.htm', '.css', '.js', '.json', '.xml'
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
    const [table, setTable] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [items, setItems] = useState(null);

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

        // IMPORTANT: replace files (do not append)
        setValues(prev => ({
            ...prev,
            files: validFiles
        }));
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        setTable(categoryTableMap[selectedCategory] || "");
    };

    const handleClick = (e) => {
        const selectedPath = e.target.getAttribute("name");
        const schemaPath = e.target.getAttribute("schema");

        setPath(selectedPath);
        setSchema(schemaPath);
        setShowForm(true);

        const itemsMap = {
            "pre/primary": prePrimaryItems,
            "primary": primaryItems,
            "jss": jssItems,
            "secondary": secondaryItems
        };

        setItems(itemsMap[selectedPath] || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        formData.append('schema', schema);
        formData.append('table', table);
        formData.append('category', category);

        try {
            const apiUrl = config.API_BASE_URL;
            const endpoint = `${apiUrl}/${path}/${category}`;

            console.log(`Submitting to: ${endpoint}`);

            const response = await axios.post(endpoint, formData);

            setSuccessMessage(response.data.message);
            resetForm();

            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMessage("An error occurred while submitting the form. Please try again later.");
            setTimeout(() => setErrorMessage(""), 5000);
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

                {["pre/primary", "primary", "jss", "secondary"].map((item, index) => (
                    <li
                        key={index}
                        name={item}
                        schema={item.replace('/', '')}
                        className="col-6 col-md list-group-item text-center"
                        style={{ cursor: 'pointer' }}
                        onClick={handleClick}
                    >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </li>
                ))}
            </ul>

            <div className="d-flex justify-content-center">
                {path && <h4>{path}</h4>}
            </div>

            <div className="row">
                {loading && <div className="loader"></div>}

                <div className={`${showForm ? "d-flex justify-content-center" : "d-none"}`}>
                    <select
                        className="custom-select width-fit-content px-5 rounded bg-primary text-white"
                        name="category"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Select Category</option>
                        {Object.keys(categoryTableMap).map(key => (
                            <option key={key} value={key}>
                                {categoryTableMap[key]
                                    .replace(/_/g, ' ')
                                    .toLowerCase()
                                    .replace(/\b\w/g, c => c.toUpperCase())}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={`d-flex justify-content-center vh-100 position-relative ${showForm ? "" : "d-none"}`}>
                    <form onSubmit={handleSubmit} className="bg-white">
                        {["examMS", "set", "grade", "form", "term", "year", "subject"].map((field) => (
                            <div key={field}>
                                <label className="form-label ms-1">
                                    <strong>{field.charAt(0).toUpperCase() + field.slice(1)}</strong>
                                </label>

                                {field === "examMS" ? (
                                    <select
                                        className="form-select py-0"
                                        name={field}
                                        value={values[field]}
                                        onChange={handleInput}
                                    >
                                        <option value="">Select Option</option>
                                        <option value="Exam">Exam</option>
                                        <option value="Marking Scheme">Marking Scheme</option>
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        className="form-control py-0"
                                        name={field}
                                        value={values[field]}
                                        onChange={handleInput}
                                        placeholder={`Enter ${field}`}
                                    />
                                )}
                            </div>
                        ))}

                        <div>
                            <label className="form-label ms-1"><strong>Files</strong></label>
                            <input
                                type="file"
                                className="form-control py-0"
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="d-flex justify-content-center my-3">
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>

                        {errorMessage && <div className="text-center text-danger"><p>{errorMessage}</p></div>}
                        {successMessage && <div className="text-center text-success"><p>{successMessage}</p></div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Support;
