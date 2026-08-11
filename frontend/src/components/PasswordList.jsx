import React, { useState } from 'react';

export default function PasswordList({ passwords, onPasswordAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    website: '',
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/passwords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ website: '', username: '', password: '' });
        setShowForm(false);
        onPasswordAdded();
      }
    } catch (err) {
      console.error('Failed to save password:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this password?')) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/passwords/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      onPasswordAdded();
    } catch (err) {
      console.error('Failed to delete password:', err);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (passwords.length === 0 && !showForm) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-6">No passwords saved yet. Let's add one! 🔐</p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
        >
          + Add Password
        </button>
      </div>
    );
  }

  return (
    <div>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
        >
          + Add Password
        </button>
      ) : null}

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Password</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="website"
                placeholder="Website/App Name"
                value={formData.website}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="username"
                placeholder="Username/Email"
                value={formData.username}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition"
              >
                {isLoading ? 'Saving...' : 'Save Password'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Passwords List */}
      <div className="space-y-3">
        {passwords.map(pwd => (
          <div key={pwd.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>
                <p className="text-sm text-gray-600">Website</p>
                <p className="font-semibold text-gray-800">{pwd.website}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Username</p>
                <p className="font-semibold text-gray-800">{pwd.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Password</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-gray-800">
                    {visiblePasswords[pwd.id] ? pwd.password : '••••••••'}
                  </span>
                  <button
                    onClick={() => togglePasswordVisibility(pwd.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    {visiblePasswords[pwd.id] ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => copyToClipboard(pwd.password)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleDelete(pwd.id)}
                  className="text-red-600 hover:text-red-700 font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
