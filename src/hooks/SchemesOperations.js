import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Modal from "../Components/Modal";
import DeleteModal from '../Components/DeleteModal';
import { useDownloadHandler, useDeleteHandler } from './useResourceOperations';



export const SchemesDownload = ({ isAdmin, isLoggedIn, clearToken, heading, isSubscribed }) => {
    
const [selectedIds, setSelectedIds] = useState([]);


const toggleSelect = (id) => {
  setSelectedIds((prev) =>
    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
  );
};



    // console.log("isAdmin in ExamsDownload:", isAdmin); // uncomment incase of errors in future
    const location = useLocation();
    const data = location.state?.data || [];
    const selectedItem = location.state?.selectedItem || {};

    const { handleDownloadExam, showModal, errorMessage, closeModal } = useDownloadHandler();
 const { handleDeleteExam, showDeleteModal, setShowDeleteModal, closeDeleteModal } = useDeleteHandler();


    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const confirmDeleteExam = () => {
    console.log("Deleting exam with parameters:");
    console.log("Path:", selectedItem.path);
    console.log("Item ID:", itemToDelete?.id);
    console.log("Value:", selectedItem.value);

    handleDeleteExam(selectedItem.path, itemToDelete.id, selectedItem.value);
};


    // Determine the key to use for grouping
    const groupingKey = data.length > 0 && data[0].form ? 'form' : 'grade';

    // Ensure data is an array before using reduce
    const groupedData = Array.isArray(data) ? data.reduce((acc, item) => {
        acc[item[groupingKey]] = acc[item[groupingKey]] || [];
        acc[item[groupingKey]].push(item);
        return acc;
    }, {}) : {};

    
   
    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1030 }}>
              {/*  <Header isLoggedIn={isLoggedIn} clearToken={clearToken} isSubscribed={isSubscribed} /> */}
            </div>
            <div className="flex-grow-1" style={{ paddingTop: '60px' }}>
                
                <div className="container-fluid" style={{ paddingRight: '10px' }}>
                    <div className="row">
                        <div
  className="list-group mt-4"
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',   // 👈 centers EVERYTHING
  }}
>
{/*Delete bulk*/}
 {isAdmin && selectedIds.length > 0 && (
  <div
    style={{
      fontSize: "12px",
      color: "gray",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px",
      justifyContent: "center",
    }}
  >
    <span>
      Selected IDs: {JSON.stringify(selectedIds)}
    </span>

    <button
      className="btn btn-sm btn-danger"
      type="button"
    >
      Delete Selected ({selectedIds.length})
    </button>
  </div>
)}


  {Object.keys(groupedData).length > 0 ? (
    Object.keys(groupedData).map((key) => (
      <div
        key={key}
        style={{
          width: '100%',
          maxWidth: '600px',   // optional: keeps content readable
        }}
      >
        <h3 className="my-4 text-center">
          <span
            style={{
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
            }}
          >
            {groupingKey.toUpperCase()} {key}
          </span>
        </h3>

        {groupedData[key].map((item) => (
  <div
    key={item.id}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      margin: 0,
      padding: 0,
      gap: "8px", // 👈 spacing between checkbox and text
    }}
  >
  {isAdmin && (
  <input
    type="checkbox"
    className="form-check-input"
    checked={selectedIds.includes(item.id)}
    onChange={() => toggleSelect(item.id)}
    onClick={(e) => e.stopPropagation()} // still prevents download
    style={{ margin: 0 }}
  />
)}


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

    {isAdmin && (
      <button
        onClick={() => handleDeleteClick(item)}
        style={{
          margin: 0,
          padding: "0 0 0 8px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "red",
          display: "flex",
          alignItems: "center",
        }}
      >
        <i className="bi bi-trash"></i>
      </button>
    )}
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
           

            <Modal show={showModal} handleClose={closeModal} isLoggedIn={isLoggedIn} isSubscribed={isSubscribed}>
                {errorMessage}
            </Modal>

            {showDeleteModal && (
                <DeleteModal
                    show={showDeleteModal}
                    onClose={closeDeleteModal}
                    handleDeleteExam={confirmDeleteExam}
                />
            )}
        </div>
    );
};

export default SchemesDownload;
