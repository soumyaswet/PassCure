import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordList from '../components/PasswordList';
import WebsiteTracker from '../components/WebsiteTracker';
import PasswordStrength from '../components/PasswordStrength';
import Navigation from '../components/Navigation';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('passwords');
  const [passwords, setPasswords] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showAddPassword, setShowAddPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchPasswords();
  }, [navigate]);

  const fetchPasswords = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/passwords', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPasswords(data);
        extractWebsites(data);
      }
    } catch (err) {
      console.error('Failed to fetch passwords:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const extractWebsites = (passwordList) => {
    const uniqueWebsites = [];
    const seen = new Set();

    passwordList.forEach(pwd => {
      if (!seen.has(pwd.website)) {
        seen.add(pwd.website);
        uniqueWebsites.push({
          id: pwd.id,
          name: pwd.website,
          icon: getWebsiteIcon(pwd.website),
          count: passwordList.filter(p => p.website === pwd.website).length,
        });
      }
    });

    setWebsites(uniqueWebsites);
  };

  const getWebsiteIcon = (website) => {
    const icons = {
      'gmail': '✉️',
      'facebook': 'f',
      'twitter': '𝕏',
      'linkedin': 'in',
      'github': '🐙',
      'amazon': '🛒',
      'netflix': '🎬',
      'spotify': '🎵',
    };
    return icons[website.toLowerCase()] || '🔗';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin mb-4">⚙️</div>
          <p className="text-gray-600">Loading your vault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation user={user} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">Manage and secure your passwords with blockchain technology</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Passwords</p>
                <p className="text-3xl font-bold text-gray-800">{passwords.length}</p>
              </div>
              <div className="text-4xl">🔐</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm font-medium">Tracked Websites</p>
                <p className="text-3xl font-bold text-gray-800">{websites.length}</p>
              </div>
              <div className="text-4xl">🌐</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm font-medium">Security Status</p>
                <p className="text-3xl font-bold text-green-600">Protected</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('passwords')}
              className={`flex-1 py-4 px-6 text-center font-medium transition ${
                activeTab === 'passwords'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🔑 All Passwords
            </button>
            <button
              onClick={() => setActiveTab('websites')}
              className={`flex-1 py-4 px-6 text-center font-medium transition ${
                activeTab === 'websites'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🌐 Websites & Apps
            </button>
            <button
              onClick={() => setActiveTab('strength')}
              className={`flex-1 py-4 px-6 text-center font-medium transition ${
                activeTab === 'strength'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              💪 Password Strength
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'passwords' && (
              <PasswordList
                passwords={passwords}
                onPasswordAdded={fetchPasswords}
                onShowAdd={setShowAddPassword}
              />
            )}
            {activeTab === 'websites' && (
              <WebsiteTracker websites={websites} passwords={passwords} />
            )}
            {activeTab === 'strength' && (
              <PasswordStrength passwords={passwords} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
