// src/config/config.ts

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const API_URLS = {
  getCategories: `${BASE_URL}/categories`,
  getLanguages: `${BASE_URL}/languages`,
  getTranslations: `${BASE_URL}/translations`,
  saveText: `${BASE_URL}/text-entries`,
  saveTranslations: `${BASE_URL}/translation-entries`,
  // Add more endpoints as needed
};
