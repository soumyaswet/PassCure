import React from 'react';

export default function WebsiteTracker({ websites, passwords }) {
  return (
    <div>
      {websites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No websites tracked yet. Add passwords to track websites! 🌐</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {websites.map(site => (
              <div
                key={site.id}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{site.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{site.name}</h3>
                    <p className="text-sm text-gray-600">
                      {site.count} password{site.count > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Passwords for this website */}
                <div className="mt-4 pt-4 border-t border-blue-200 space-y-2">
                  {passwords
                    .filter(p => p.website === site.name)
                    .map(pwd => (
                      <div key={pwd.id} className="text-sm bg-white rounded p-2">
                        <p className="text-gray-700">
                          <span className="font-medium">@</span> {pwd.username}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Statistics */}
          <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Portfolio Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Total Websites</p>
                <p className="text-2xl font-bold text-gray-800">{websites.length}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Passwords</p>
                <p className="text-2xl font-bold text-gray-800">{passwords.length}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Avg per Website</p>
                <p className="text-2xl font-bold text-gray-800">
                  {websites.length > 0 ? (passwords.length / websites.length).toFixed(1) : 0}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Coverage</p>
                <p className="text-2xl font-bold text-green-600">✓</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
