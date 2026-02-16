import { useState } from 'react';
import axios from 'axios';

/**
 * Hook to handle file downloads with subscription checks and preview
 */
export const useDownloadHandler = () => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownloadExam = async (path, id, category, fileName) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('Log In To Proceed');

      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('User ID is missing');

      const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

      // Check subscription
      const subscriptionResponse = await axios.get(
        `${apiUrl}/api/subscriptions/status/${userId}`,
        { headers: { Authorization: `Bearer ${token}` }, signal }
      );
      const amount = subscriptionResponse.data?.Amount || 0;
      if (amount <= 0)
        throw new Error('🔓 Unlock downloads to get.\n✔ Unlimited access');

      // Get download link
      const modifiedCategory = category.slice(0, -1); // remove last char
      const { data } = await axios.get(`${apiUrl}/${path}/${modifiedCategory}/file/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      });

      if (!data?.downloadUrl) throw new Error("Failed to generate download link");

      const url = data.downloadUrl;
      const name = fileName || data.filename || 'downloaded-file';
      const ext = name.split('.').pop().toLowerCase();

      const previewExts = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'docx', 'pptx', 'xlsx'];

      if (previewExts.includes(ext)) {
        // Open preview window with toolbar
        const newWindow = window.open('', '_blank', 'width=1000,height=700,scrollbars=yes');
        if (newWindow) {
          const isOfficeFile = ['docx','doc', 'pptx', 'xlsx'].includes(ext);
          const viewerUrl = isOfficeFile
            ? `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`
            : url;

          newWindow.document.write(`
            <html>
              <head>
                <title>${name}</title>
                <style>
                  body { margin:0; font-family: Arial, sans-serif; }
                  .header {
                    background: #f5f5f5;
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                  }
                  .header button {
                    margin-left: 10px;
                    padding: 5px 10px;
                    font-size: 14px;
                    cursor: pointer;
                  }
                  iframe { width: 100%; height: calc(100vh - 50px); border: none; }
                </style>
              </head>
              <body>
                <div class="header">
                  <span>${name}</span>
                  <div>
                    <button onclick="window.open('${url}', '_blank')">Open in New Tab</button>
                    <button onclick="window.location.href='${url}'">Download</button>
                    <button onclick="navigator.clipboard.writeText('${url}') && alert('Link copied!')">Copy Link</button>
                  </div>
                </div>
                <iframe src="${viewerUrl}"></iframe>
              </body>
            </html>
          `);
          newWindow.document.close();
        }
      } else {
        // Download other files directly
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      console.log("File preview/download triggered successfully");

    } catch (error) {
      if (signal.aborted) return;

      const message = error.response?.data?.message || error.message || 'Something went wrong';
      setErrorMessage(message);
      setShowModal(true);

      console.error("Download error:", message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage('');
  };

  return { handleDownloadExam, showModal, errorMessage, closeModal };
};

/**
 * Hook to handle delete operations (bulk deletes)
 */
export const useDeleteHandler = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDeleteExam = async ({ path, table, ids }) => {
    try {
      if (!ids || ids.length === 0) return;

      const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";
      console.log("rocess.env.REACT_APP_API_BASE_URL", apiUrl)

      const schemaMap = {
        primary: "elimufi1_primaryschool",
        secondary: "elimufi1_secondaryschool",
        jss: "elimufi1_jss",
        preprimary: "elimufi1_preprimary",
        senior: "elimufi1_senior",
        college: "elimufi1_college",
        users: "elimufi1_users"
      };

      const normalizedPath = path.replace(/\//g, '').toLowerCase();
      const schema = schemaMap[normalizedPath];
      if (!schema) throw new Error(`Invalid path provided: ${path}`);

      const url = `${apiUrl}/${path}/${table}/bulk`;
      console.log("Deleting bulk items:", { url, schema, table, ids });

      const response = await axios.post(url, { schema, table, ids });
      if (response.status !== 200) throw new Error(`Unexpected response status: ${response.status}`);

      setShowDeleteModal(false);
      setErrorMessage('');
      console.log("Bulk delete successful");

    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error deleting scheme:', error);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setErrorMessage('');
  };

  return { handleDeleteExam, showDeleteModal, setShowDeleteModal, errorMessage, closeDeleteModal };
};
