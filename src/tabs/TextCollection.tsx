import React, { useState } from 'react';
import '../models/interfaces';
import { Category, Language, NotificationProps } from '../models/interfaces';
import {API_URLS} from '../config/config';

const TextCollection: React.FC<NotificationProps> = ({ addNotification }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URLS.getCategories}`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      addNotification('Failed to fetch categories', 'error');
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`${API_URLS.getLanguages}`);
      const data = await response.json();
      setLanguages(data);
    } catch (error) {
      console.error('Error fetching languages:', error);
      addNotification('Failed to fetch languages', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const finalCategory = category === 'custom' ? customCategory : category;

    try {
      const response = await fetch(`${API_URLS.saveText}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          text,
          summary,
          language,
          category: finalCategory,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);

        addNotification('Text entry saved successfully!', 'success');

        setTitle('');
        setText('');
        setSummary('');
        setCategory('');
        setCustomCategory('');
        fetchCategories();
        fetchLanguages();
      } else {
        addNotification('Failed to save text entry', 'error');
        throw new Error('Failed to save text entry');
      }
    } catch (error) {
      console.error('Error saving text entry:', error);
      addNotification('Failed to save text entry. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="collection">
        <div className="form-group">
          <textarea
            id="title"
            placeholder="Title..."
            value={title}
            rows={2}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            id="text"
            placeholder="Text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            id="summary"
            placeholder="Summary..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            required
          />
        </div>

        <div className='form-group'>
          <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
              className="category-selector"
            >
              <option value="">Select Language</option>
              {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                  {lang.name}
                  </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <select
            id="category"
            className="category-selector"
            value={category}
            onChange={(e) => 
              {
                setCategory(e.target.value);
              }
            }
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
            <option value="custom">Custom Category</option>
          </select>
        </div>

        {category === 'custom' && (
          <div className="form-group">
            <input
              id="customCategory"
              placeholder="Enter custom category..."
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default TextCollection;
