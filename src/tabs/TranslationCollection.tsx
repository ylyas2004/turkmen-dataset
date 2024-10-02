import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Language, NotificationProps, TranslationData } from '../models/interfaces';
import {API_URLS} from '../config/config';

const TranslationCollection: React.FC<NotificationProps> = ({ addNotification }) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [translationData, setTranslationData] = useState<TranslationData>({
    original: '',
    translated: '',
    srcLang: '',
    destLang: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch languages from the backend when the component mounts
  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`${API_URLS.getLanguages}`);
      const data = await response.json();
      setLanguages(data);
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  // Swap the source and destination languages and texts
  const handleSwap = () => {
    setTranslationData({
      original: translationData.translated,
      translated: translationData.original,
      srcLang: translationData.destLang,
      destLang: translationData.srcLang,
    });
  };

  // Handle form submission to save the translation entry
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { original, translated, srcLang, destLang } = translationData;

    // Validate fields
    if (!original || !translated || !srcLang || !destLang) {
      addNotification('All fields are required.', 'error');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URLS.saveTranslations}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalText: original,
          translatedText: translated,
          srcLanguage: srcLang,  // Sending language code
          destLanguage: destLang, // Sending language code
        }),
      });

      if (response.ok) {
        console.log('Translation entry saved successfully');
        addNotification('Translation entry saved successfully!', 'success');
        // Reset the form fields
        setTranslationData({ original: '', translated: '', srcLang: '', destLang: '' });
      } else {
        addNotification('Failed to save translation entry', 'error');
        throw new Error('Failed to save translation entry');
      }
    } catch (error) {
      addNotification('Failed to save translation entry', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="translation-collection max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Horizontal source-destination language with swap button */}
        <div className="language-container">
          <select
            value={translationData.srcLang}
            onChange={(e) => setTranslationData({ ...translationData, srcLang: e.target.value })}
            required
            className="language-selector"
          >
            <option value="">Source</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleSwap}
            className="swap-btn"
          >
            {RefreshCw && <RefreshCw className="mr-2" size={18} />}
          </button>
          <select
            value={translationData.destLang}
            onChange={(e) => setTranslationData({ ...translationData, destLang: e.target.value })}
            required
            className="language-selector"
          >
            <option value="">Destination</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Original Text"
            value={translationData.original}
            onChange={(e) => setTranslationData({ ...translationData, original: e.target.value })}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Translated Text"
            value={translationData.translated}
            onChange={(e) => setTranslationData({ ...translationData, translated: e.target.value })}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="submit-btn"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default TranslationCollection;
