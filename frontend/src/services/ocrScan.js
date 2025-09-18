import axios from "axios";


export const performOcrRequest = async (formData) => {
    const backendUrl = import.meta.env.VITE_OCR_URL;
    return axios.post(backendUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 90000,
    });
  };