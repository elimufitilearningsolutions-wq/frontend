import { useState } from 'react';
import axios from 'axios';

/**
 * Hook to handle file downloads with subscription checks
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

      // Check subscription status
      const subscriptionResponse = await axios.get(
        `${apiUrl}/api/subscriptions/status/${userId}`,
        { headers: { Authorization: `Bearer ${token}` }, signal }
      );

      const amount = subscriptionResponse.data?.Amount || 0;
      if (amount <= 0) {
        throw new Error(
          '🔓 Unlock downloads with a KSh 10 one-time trial.\n✔ Unlimited access'
        );
      }

      // Prepare file download
      const modifiedCategory = category.slice(0, -1); // e.g., "schemes" -> "scheme"
      const fileDownloadUrl = `${apiUrl}/${path}/${modifiedCategory}/file/${id}`;

      const downloadResponse = await axios.get(fileDownloadUrl, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
        signal,
      });

      const blob = new Blob([downloadResponse.data], { type: downloadResponse.headers['content-type'] });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName || 'downloaded-file.docx';
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(downloadUrl);
      link.remove();

      console.log("Download successful");

   } catch (error) {
  if (signal.aborted) {
    console.log('Download aborted by user');
    return;
  }

  const message =
    error.response?.data?.message ||
    error.message ||
    'Something went wrong';

  setErrorMessage(message);
  setShowModal(true); // 🔥 THIS WAS MISSING

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

  /**
   * Bulk delete items
   * @param {Object} params
   * @param {string} params.path - e.g., "primary", "secondary"
   * @param {string} params.table - e.g., "schemes"
   * @param {Array<number>} params.ids - array of IDs to delete
   */
  const handleDeleteExam = async ({ path, table, ids }) => {
    try {
      if (!ids || ids.length === 0) return;

      const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

      // Map path to schema name
      const schemaMap = {
        primary: "elimufi1_primaryschool",
        secondary: "elimufi1_secondaryschool",
        jss: "elimufi1_jss",
        preprimary: "elimufi1_preprimary",
        senior: "elimufi1_senior",
        college: "elimufi1_college",
        users: "elimufi1_users"
      };
      const schema = schemaMap[path] || "default_schema";

      // Bulk delete endpoint
      const url = `${apiUrl}/${path}/${table}/bulk`;

      console.log("Deleting bulk items:", { url, schema, table, ids });

      const response = await axios.post(url, { schema, table, ids });

      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

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
