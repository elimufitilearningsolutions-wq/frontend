import { useState } from "react";
import axios from "axios";

/**
 * Hook to handle file downloads with subscription checks and preview
 */
export const useDownloadHandler = () => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownloadExam = async (path, id, category, fileName) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Log In To Proceed");

      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID is missing");

      const apiUrl =
        process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

      // ✅ Check subscription
      const subscriptionResponse = await axios.get(
        `${apiUrl}/api/subscriptions/status/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          signal,
        }
      );

      const amount = subscriptionResponse.data?.Amount || 0;
      if (amount <= 0)
        throw new Error(
          "🔓 Unlock downloads to continue.\n✔ Unlimited access"
        );

      // ✅ Get download link
      const modifiedCategory = category.slice(0, -1);
      const { data } = await axios.get(
        `${apiUrl}/${path}/${modifiedCategory}/file/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          signal,
        }
      );

      if (!data?.downloadUrl)
        throw new Error("Failed to generate download link");

      const url = data.downloadUrl;
      const name = fileName || data.filename || "downloaded-file";
      const ext = name.split(".").pop().toLowerCase();

      const previewExts = [
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

      if (previewExts.includes(ext)) {
        openPreviewWindow(url, name, ext);
      } else {
        triggerDirectDownload(url, name);
      }

      console.log("File preview/download triggered successfully");
    } catch (error) {
      if (signal.aborted) return;

      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      setErrorMessage(message);
      setShowModal(true);

      console.error("Download error:", message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage("");
  };

  return { handleDownloadExam, showModal, errorMessage, closeModal };
};

/**
 * Open Preview Window (Refactored — No document.write)
 */
const openPreviewWindow = (url, name, ext) => {
  const newWindow = window.open("", "_blank", "width=1000,height=700");

  if (!newWindow) return;

  const isOfficeFile = ["docx", "doc", "pptx", "xlsx"].includes(ext);

  const viewerUrl = isOfficeFile
    ? `https://docs.google.com/gview?url=${encodeURIComponent(
        url
      )}&embedded=true`
    : url;

  // ✅ Basic HTML structure
  newWindow.document.title = `Elimufiti | ${name}`;

  const meta = newWindow.document.createElement("meta");
  meta.name = "viewport";
  meta.content = "width=device-width, initial-scale=1.0";
  newWindow.document.head.appendChild(meta);

  // ✅ Inject CSS
  const styleTag = newWindow.document.createElement("style");
  styleTag.innerHTML = previewStyles;
  newWindow.document.head.appendChild(styleTag);

  // ✅ Body container
  const body = newWindow.document.body;
  body.className = "preview-body";

  // ✅ Header
  const header = newWindow.document.createElement("div");
  header.className = "preview-header";

  const title = newWindow.document.createElement("div");
  title.className = "preview-title";
  title.textContent = `Elimufiti | ${name}`;

  const actions = newWindow.document.createElement("div");
  actions.className = "preview-actions";

  const openBtn = createButton("Open", () =>
    newWindow.open(url, "_blank")
  );

  const downloadBtn = createButton("Download", () => {
    const link = newWindow.document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  });

  const copyBtn = createButton("Copy", async () => {
    await navigator.clipboard.writeText(url);
    alert("Link copied!");
  });

  actions.append(openBtn, downloadBtn, copyBtn);
  header.append(title, actions);

  // ✅ Iframe
  const iframe = newWindow.document.createElement("iframe");
  iframe.src = viewerUrl;
  iframe.className = "preview-iframe";

  body.append(header, iframe);
};

/**
 * Create reusable button
 */
const createButton = (label, onClick) => {
  const button = document.createElement("button");
  button.textContent = label;
  button.onclick = onClick;
  return button;
};


/**
 * Trigger direct download
 */
const triggerDirectDownload = (url, name) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

/**
 * CSS for preview window
 */
const previewStyles = `
  body.preview-body {
    margin: 0;
    font-family: "Segoe UI", Arial, sans-serif;
    background: #0d6efd;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .preview-header {
    background: #1e3c72;
    color: white;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .preview-title {
    font-size: 15px;
    font-weight: 600;
  }

  .preview-actions {
    display: flex;
    gap: 8px;
  }

  .preview-actions button {
    background: white;
    color: #1e3c72;
    border: none;
    padding: 6px 14px;
    font-size: 13px;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .preview-actions button:hover {
    background: #dbe4ff;
  }

  .preview-iframe {
    flex: 1;
    width: 100%;
    border: none;
    background: white;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: 600;
    color: white;
  }

  .watermark {
    position: fixed;
    bottom: 20px;
    right: 20px;
    opacity: 0.08;
    font-size: 60px;
    font-weight: bold;
    color: black;
    pointer-events: none;
    user-select: none;
  }

  @media (max-width: 768px) {
    .preview-title {
      font-size: 14px;
    }

    .preview-actions button {
      font-size: 12px;
      padding: 6px 10px;
    }

    .watermark {
      font-size: 40px;
    }
  }

  @media (max-width: 480px) {
    .preview-title {
      font-size: 13px;
    }

    .preview-actions button {
      font-size: 11px;
      padding: 5px 8px;
    }
  }
`;


/**
 * Hook to handle delete operations (bulk deletes)
 */
export const useDeleteHandler = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteExam = async ({ path, table, ids }) => {
    try {
      if (!ids || ids.length === 0) return;

      const apiUrl =
        process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

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

      if (!schema)
        throw new Error(`Invalid path provided: ${path}`);

      const url = `${apiUrl}/${path}/${table}/bulk`;

      const response = await axios.post(url, {
        schema,
        table,
        ids,
      });

      if (response.status !== 200)
        throw new Error(
          `Unexpected response status: ${response.status}`
        );

      setShowDeleteModal(false);
      setErrorMessage("");

      console.log("Bulk delete successful");
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error deleting scheme:", error);
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
