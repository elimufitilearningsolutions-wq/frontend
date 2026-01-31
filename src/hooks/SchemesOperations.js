import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Modal from "../Components/Modal";
import DeleteModal from '../Components/DeleteModal';
import { useDownloadHandler, useDeleteHandler } from './useResourceOperations';

export const SchemesDownload = ({ isAdmin, isLoggedIn, clearToken, heading, isSubscribed }) => {
    const [selectedIds, setSelectedIds] = useState([]);

    const location = useLocation();
    const data = location.state?.data || [];
    const selectedItem = location.state?.selectedItem || {};

    const { handleDownloadExam, showModal, errorMessage, closeModal } = useDownloadHandler();
    const { handleDeleteExam, showDeleteModal, setShowDeleteModal, closeDeleteModal } = useDeleteHandler();

    // Toggle checkbox selection
    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    // Bulk delete
    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;

        // Call delete handler with proper dynamic params
        await handleDeleteExam({
            path: selectedItem.path,   // e.g., "primary", "secondary", etc.
            table: selectedItem.value, // e.g., "schemes"
            ids: selectedIds           // array of selected IDs
        });

        setSelectedIds([]);       // clear checkboxes
        setShowDeleteModal(false); // close modal
    };

    // Determine grouping key
    const groupingKey = data.length > 0 && data[0].form ? 'form' : 'grade';
    const groupedData = Array.isArray(data) ? data.reduce((acc, item) => {
        acc[item[groupingKey]] = acc[item[groupingKey]] || [];
        acc[item[groupingKey]].push(item);
        return acc;
    }, {}) : {};

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1030 }} />
            
            <div className="flex-grow-1" style={{ paddingTop: '60px' }}>
                <div className="container-fluid" style={{ paddingRight: '10px' }}>
                    <div className="row">
                        <div className="list-group mt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            {/* Bulk delete section */}
                            {isAdmin && selectedIds.length > 0 && (
                                <div style={{
                                    fontSize: "12px",
                                    color: "gray",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginBottom: "10px",
                                    justifyContent: "center",
                                }}>
                                    <span>Selected IDs: {JSON.stringify(selectedIds)}</span>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => setShowDeleteModal(true)}
                                    >
                                        Delete Selected ({selectedIds.length})
                                    </button>
                                </div>
                            )}

                            {/* Display grouped data */}
                            {Object.keys(groupedData).length > 0 ? (
                                Object.keys(groupedData).map((key) => (
                                    <div key={key} style={{ width: '100%', maxWidth: '600px' }}>
                                        <h3 className="my-4 text-center">
                                            <span style={{
                                                display: 'inline-block',
                                                maxWidth: '300px',
                                                width: '100%',
                                                margin: '0 auto',
                                                fontWeight: '700',
                                                fontSize: '1.6rem',
                                                color: '#222',
                                                borderBottom: '2px solid #ddd',
                                                paddingBottom: '6px',
                                                letterSpacing: '1px',
                                            }}>
                                                {groupingKey.toUpperCase()} {key}
                                            </span>
                                        </h3>

                                        {groupedData[key].map((item) => (
                                            <div key={item.id} style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "100%",
                                                margin: 0,
                                                padding: 0,
                                                gap: "8px",
                                            }}>
                                                {/* Checkbox for selection */}
                                                {isAdmin && (
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={() => toggleSelect(item.id)}
                                                        onClick={e => e.stopPropagation()} // prevent accidental download
                                                        style={{ margin: 0 }}
                                                    />
                                                )}

                                                {/* File name clickable for download */}
                                                <p
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDownloadExam(
                                                            selectedItem.path,
                                                            item.id,
                                                            selectedItem.value,
                                                            item.fileName
                                                        );
                                                    }}
                                                    className="text-primary custom-font"
                                                    style={{
                                                        cursor: "pointer",
                                                        margin: 0,
                                                        padding: "2px",
                                                        fontFamily: "Cinzel, serif",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {item.fileName}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <pre>No data received</pre>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Download modal */}
            <Modal show={showModal} handleClose={closeModal} isLoggedIn={isLoggedIn} isSubscribed={isSubscribed}>
                {errorMessage}
            </Modal>

            {/* Delete confirmation modal */}
            {showDeleteModal && (
                <DeleteModal
                    show={showDeleteModal}
                    onClose={closeDeleteModal}
                    handleDeleteExam={handleBulkDelete} // Bulk delete
                />
            )}
        </div>
    );
};

export default SchemesDownload;
