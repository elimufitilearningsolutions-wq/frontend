// src/hooks/useResourceOperations.js

import { useState } from "react";
import axios from "axios";


/**
 * Hook to handle file preview (normal browser tab with Elimufiti branding) + direct download
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
      const ext = name.split(".").pop()?.toLowerCase() || "";

      // 3. Open branded preview tab
      openBrandedPreviewTab(url, name, ext);

      console.log("Elimufiti preview opened:", name);
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
   * Opens file preview in a normal browser tab with Elimufiti branding,
   * Download and Share buttons
   */
  const openBrandedPreviewTab = (url, name, ext) => {
    const isOffice = ["docx", "doc", "pptx", "xlsx"].includes(ext.toLowerCase());

    const viewerUrl = isOffice
      ? `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`
      : url;

    const tab = window.open("", "_blank");

    if (!tab || tab.closed || typeof tab.closed === "undefined") {
      alert(
        "Could not open Elimufiti preview tab.\n\n" +
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <!-- You can add real favicon here later -->
        <!-- <link rel="icon" href="/favicon.ico" /> -->
        <title>Elimufiti | ${name}</title>
        <style>
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #f8f9fa;
            height: 100vh;
            display: flex;
            flex-direction: column;
          }
          header {
            background: #0d6efd;
            color: white;
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            position: sticky;
            top: 0;
            z-index: 100;
          }
          .brand-title {
            font-size: 1.2rem;
            font-weight: 700;
            letter-spacing: -0.02em;
          }
          .filename {
            font-size: 1.05rem;
            max-width: 55%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .actions button {
            background: white;
            color: #0d6efd;
            border: none;
            padding: 8px 18px;
            border-radius: 6px;
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .actions button:hover {
            background: #e9f0ff;
            transform: translateY(-1px);
            box-shadow: 0 3px 8px rgba(0,0,0,0.15);
          }
          iframe {
            flex: 1;
            width: 100%;
            border: none;
            background: white;
          }
          @media (max-width: 640px) {
            header { padding: 10px 14px; flex-direction: column; align-items: flex-start; gap: 10px; }
            .brand-title { font-size: 1.1rem; }
            .filename { font-size: 1rem; max-width: 100%; }
            .actions { width: 100%; display: flex; justify-content: space-between; }
            .actions button { flex: 1; margin: 0 4px; padding: 8px 12px; font-size: 0.9rem; }
          }
        </style>
      </head>
      <body>
        <header>
          <div class="brand-title">Elimufiti</div>
          <div class="filename">${name}</div>
          <div class="actions">
            <button 
              onclick="window.open('${url}', '_blank')" 
              title="Download this file"
            >
              Download
            </button>
            <button 
              onclick="navigator.clipboard.writeText('${url}').then(() => alert('Link copied to clipboard!'))" 
              title="Copy shareable link"
            >
              Share
            </button>
          </div>
        </header>
        <iframe src="${viewerUrl}" allowfullscreen></iframe>
      </body>
      </html>
    `);
    doc.close();
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
 * Hook to handle bulk delete operations
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