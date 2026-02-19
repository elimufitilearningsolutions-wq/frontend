// src/hooks/useResourceOperations.js

import { useState } from "react";
import axios from "axios";

const PREVIEW_EXTENSIONS = [
  "pdf",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "docx",
  "doc",
  "pptx",
  "xlsx",
];

/**
 * Hook to handle file preview (responsive full-page branded tab) + direct download
 */
export const useDownloadHandler = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownloadExam = async (path, id, category, fileName) => {
    const controller = new AbortController();
    const { signal } = controller;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Log In To Proceed");

      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID is missing");

      const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

      // 1. Check subscription
      const subRes = await axios.get(
        `${apiUrl}/api/subscriptions/status/${userId}`,
        { headers: { Authorization: `Bearer ${token}` }, signal }
      );

      if ((subRes.data?.Amount ?? 0) <= 0) {
        throw new Error("🔓 Unlock downloads to continue.\n✔ Unlimited access");
      }

      // 2. Get download link
      const modifiedCategory = category.slice(0, -1);
      const { data } = await axios.get(
        `${apiUrl}/${path}/${modifiedCategory}/file/${id}`,
        { headers: { Authorization: `Bearer ${token}` }, signal }
      );

      if (!data?.downloadUrl) {
        throw new Error("Failed to generate download link");
      }

      const url = data.downloadUrl;
      const name = fileName || data.filename || "downloaded-file";
      const ext = (name.split(".").pop() || "").toLowerCase();

      // 3. Decide action
      if (PREVIEW_EXTENSIONS.includes(ext)) {
        openResponsivePreviewTab(url, name, ext);
      } else {
        triggerDirectDownload(url, name);
      }

      console.log("Elimufiti file action triggered:", name);
    } catch (err) {
      if (signal.aborted) return;

      const msg =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";

      setErrorMessage(msg);
      setShowErrorModal(true);
      console.error("Elimufiti download error:", msg);
    }
  };

  /**
   * Opens preview in a normal browser tab — fully responsive, full-page content
   */
  const openResponsivePreviewTab = (url, name, ext) => {
    const lowerExt = ext.toLowerCase();
    const isOffice = ["docx", "doc", "pptx", "xlsx"].includes(lowerExt);
    const isPdf = lowerExt === "pdf";
    const isImage = ["jpg", "jpeg", "png", "gif"].includes(lowerExt);

    // Microsoft Office viewer for Office files (cleaner & more reliable)
    const viewerUrl = isOffice
      ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
      : url;

    const tab = window.open("", "_blank");

    if (!tab || tab.closed || typeof tab.closed === "undefined") {
      alert(
        "Could not open Elimufiti preview.\n\n" +
        "Your browser may be blocking new tabs.\n" +
        "Please allow popups/new tabs for this site."
      );
      return;
    }

    try {
      tab.focus();
    } catch {}

    const doc = tab.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"/>
        <title>Elimufiti | ${name}</title>
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          html, body {
            height: 100%;
            width: 100%;
            overflow: hidden;
          }
          body {
            font-family: system-ui, -apple-system, sans-serif;
            background: #f9fafb;
            display: flex;
            flex-direction: column;
            touch-action: manipulation;
          }
          header {
            background: linear-gradient(135deg, #0d6efd 0%, #0056d2 100%);
            color: white;
            padding: clamp(0.8rem, 2.5vw, 1rem) clamp(1rem, 3vw, 1.5rem);
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            box-shadow: 0 3px 12px rgba(0,0,0,0.18);
            position: sticky;
            top: 0;
            z-index: 1000;
            flex-wrap: wrap;
          }
          .brand {
            font-size: clamp(1.1rem, 4.2vw, 1.35rem);
            font-weight: 700;
            white-space: nowrap;
          }
          .filename {
            font-size: clamp(0.95rem, 3.8vw, 1.1rem);
            max-width: 50%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            opacity: 0.95;
            flex: 1;
          }
          .actions {
            display: flex;
            gap: clamp(0.6rem, 2vw, 0.8rem);
            flex-shrink: 0;
          }
          .actions button {
            background: rgba(255,255,255,0.97);
            color: #0d6efd;
            border: none;
            padding: clamp(0.6rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.4rem);
            border-radius: 0.5rem;
            font-size: clamp(0.85rem, 3.5vw, 0.95rem);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.18s ease;
            box-shadow: 0 2px 6px rgba(0,0,0,0.12);
            min-width: 90px;
          }
          .actions button:hover {
            background: white;
            transform: translateY(-1px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }
          .preview-area {
            flex: 1;
            width: 100%;
            background: #fff;
            position: relative;
            overflow: hidden;
          }
          iframe, embed, object, img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
          img {
            object-fit: contain;
          }
          .fallback {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #f1f5f9;
            color: #475569;
            font-size: clamp(1.1rem, 4vw, 1.25rem);
            text-align: center;
            padding: 2rem;
          }
          .fallback a {
            color: #0d6efd;
            text-decoration: underline;
            margin-top: 1rem;
            font-weight: 500;
          }

          /* Mobile optimizations */
          @media (max-width: 768px) {
            header {
              padding: 0.8rem 1rem;
              flex-direction: column;
              align-items: flex-start;
              gap: 0.8rem;
            }
            .brand, .filename {
              max-width: 100%;
              text-align: left;
            }
            .actions {
              width: 100%;
              justify-content: space-between;
              gap: 0.6rem;
            }
            .actions button {
              flex: 1;
              padding: 0.75rem 1rem;
              font-size: 0.95rem;
            }
          }
          @media (max-width: 480px) {
            .brand { font-size: 1.1rem; }
            .filename { font-size: 0.95rem; }
            .actions button { padding: 0.7rem 0.9rem; font-size: 0.9rem; }
          }
        </style>
      </head>
      <body>
        <header>
          <div class="brand">Elimufiti</div>
          <div class="filename">${name}</div>
          <div class="actions">
            <button onclick="window.open('${url}', '_blank')" title="Download file">
              Download
            </button>
            <button 
              onclick="navigator.clipboard.writeText('${url}').then(() => alert('Link copied!'))"
              title="Copy shareable link"
            >
              Share
            </button>
          </div>
        </header>

        <div class="preview-area">
          ${
            isPdf
              ? `<embed src="${url}" type="application/pdf">`
              : isImage
              ? `<img src="${url}" alt="${name}">`
              : isOffice
              ? `<iframe src="${viewerUrl}" allowfullscreen></iframe>`
              : `<div class="fallback">
                   <p>Preview not available for this file type</p>
                   <a href="${url}" target="_blank">Click here to download</a>
                 </div>`
          }
        </div>
      </body>
      </html>
    `);
    doc.close();
  };

  /**
   * Triggers direct browser-native download
   */
  const triggerDirectDownload = (url, name) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  return {
    handleDownloadExam,
    showModal: showErrorModal,
    errorMessage,
    closeModal,
  };
};

/**
 * Hook for bulk delete operations
 */
export const useDeleteHandler = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteExam = async ({ path, table, ids }) => {
    try {
      if (!ids || ids.length === 0) return;

      const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

      const schemaMap = {
        primary: "elimufi1_primaryschool",
        secondary: "elimufi1_secondaryschool",
        jss: "elimufi1_jss",
        preprimary: "elimufi1_preprimary",
        senior: "elimufi1_senior",
        college: "elimufi1_college",
        users: "elimufi1_users",
      };

      const normalizedPath = path.replace(/\//g, "").toLowerCase();
      const schema = schemaMap[normalizedPath];

      if (!schema) throw new Error(`Invalid path: ${path}`);

      const url = `${apiUrl}/${path}/${table}/bulk`;

      const response = await axios.post(url, { schema, table, ids });

      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      setShowDeleteModal(false);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete items");
      console.error("Bulk delete error:", error);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setErrorMessage("");
  };

  return {
    handleDeleteExam,
    showDeleteModal,
    setShowDeleteModal,
    errorMessage,
    closeDeleteModal,
  };
};