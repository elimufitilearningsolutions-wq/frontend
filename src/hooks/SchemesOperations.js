import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../Components/Modal";
import DeleteModal from "../Components/DeleteModal";
import { useDownloadHandler, useDeleteHandler } from "./useResourceOperations";

export const SchemesDownload = ({
  isAdmin,
  isLoggedIn,
  clearToken,
  heading,
  isSubscribed,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const location = useLocation();
  const selectedItem = location.state?.selectedItem || {};

  const { handleDownloadExam, showModal, errorMessage, closeModal } =
    useDownloadHandler();

  const {
    handleDeleteExam,
    showDeleteModal,
    setShowDeleteModal,
    closeDeleteModal,
  } = useDeleteHandler();

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;

    await handleDeleteExam({
      path: selectedItem.path,
      table: selectedItem.value,
      ids: selectedIds,
    });

    setSelectedIds([]);
    setShowDeleteModal(false);
  };

  const groupedData = useMemo(() => {
    const data = location.state?.data || []; // Move data inside useMemo

    if (!Array.isArray(data) || data.length === 0) return {};

    // Determine the main key for grouping
    const mainKey =
      data[0].form && data[0].form.trim() !== ""
        ? "form"
        : data[0].grade && data[0].grade.trim() !== ""
        ? "grade"
        : null;

    // Normalize grade/form
    const normalizePrimary = (val, key) => {
      if (!val || val.trim() === "") return "UNGROUPED";
      const v = val.trim();
      if (/^\d+$/.test(v)) return key === "grade" ? `Grade ${v}` : `Form ${v}`;
      if (/^grade\s*\d+$/i.test(v)) return `Grade ${v.replace(/\D/g, "")}`;
      if (/^form\s*\d+$/i.test(v)) return `Form ${v.replace(/\D/g, "")}`;
      return v;
    };

    // Normalize set
    const normalizeSet = (val) => {
      if (!val || val.trim() === "") return "NO_SET";
      const v = val.trim();
      if (/^\d+$/.test(v)) return `Set ${v}`; // numeric set like 1 -> Set 1
      if (/^[A-Z]$/i.test(v)) return `Set ${v.toUpperCase()}`; // A -> Set A
      if (/^set\s*\d+$/i.test(v)) return `Set ${v.replace(/\D/g, "")}`;
      if (/^set\s*[A-Z]$/i.test(v)) return `Set ${v.replace(/\D/g, "").toUpperCase()}`;
      return v;
    };

    return data.reduce((acc, item) => {
      const primaryGroup = mainKey ? normalizePrimary(item[mainKey], mainKey) : "ALL";
      const setGroup = normalizeSet(item.set);

      if (!acc[primaryGroup]) acc[primaryGroup] = {};
      if (!acc[primaryGroup][setGroup]) acc[primaryGroup][setGroup] = [];

      acc[primaryGroup][setGroup].push(item);
      return acc;
    }, {});
  }, [location.state]); // Only depend on location.state

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1030 }} />

      <div className="flex-grow-1" style={{ paddingTop: "60px" }}>
        <div className="container-fluid" style={{ paddingRight: "10px" }}>
          <div className="row">
            <div
              className="list-group mt-4"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
                  <span>Selected IDs: {JSON.stringify(selectedIds)}</span>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Selected ({selectedIds.length})
                  </button>
                </div>
              )}

              {Object.keys(groupedData).length > 0 ? (
                Object.entries(groupedData).map(([primaryKey, sets]) => (
                  <div
                    key={primaryKey}
                    style={{ width: "100%", maxWidth: "600px" }}
                  >
                    {primaryKey !== "ALL" && (
                      <h3 className="my-4 text-center">
                        <span
                          style={{
                            display: "inline-block",
                            maxWidth: "300px",
                            width: "100%",
                            margin: "0 auto",
                            fontWeight: "700",
                            fontSize: "1.6rem",
                            color: "#222",
                            borderBottom: "2px solid #ddd",
                            paddingBottom: "6px",
                            letterSpacing: "1px",
                          }}
                        >
                          {primaryKey}
                        </span>
                      </h3>
                    )}

                    {Object.entries(sets).map(([setKey, items]) => (
                      <div key={setKey} style={{ marginBottom: "20px" }}>
                        {setKey !== "NO_SET" && (
                          <h5
                            style={{
                              textAlign: "center",
                              fontWeight: "600",
                              marginBottom: "10px",
                              color: "#555",
                            }}
                          >
                            {setKey}
                          </h5>
                        )}

                        {items.map((item) => (
                          <div
                            key={item.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              gap: "4px",
                            }}
                          >
                            {isAdmin && (
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={selectedIds.includes(item.id)}
                                onChange={() => toggleSelect(item.id)}
                                onClick={(e) => e.stopPropagation()}
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
                                padding: "6px",
                                fontFamily: "Cinzel, serif",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.fileName}
                            </p>
                          </div>
                        ))}
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

      <Modal
        show={showModal}
        handleClose={closeModal}
        isLoggedIn={isLoggedIn}
        isSubscribed={isSubscribed}
      >
        {errorMessage}
      </Modal>

      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onClose={closeDeleteModal}
          handleDeleteExam={handleBulkDelete}
        />
      )}
    </div>
  );
};

export default SchemesDownload;
