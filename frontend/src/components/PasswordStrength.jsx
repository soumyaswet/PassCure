import React, { useMemo } from 'react';

export default function PasswordStrength({ passwords }) {
  const calculateStrength = (password) => {
    let strength = 0;
    let feedback = [];

    if (!password) return { score: 0, level: 'None', percentage: 0, feedback: ['Password is empty'] };

    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;

    // Character variety
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 2;

    // Generate feedback
    if (password.length < 8) feedback.push('Use at least 8 characters');
    if (!/[A-Z]/.test(password)) feedback.push('Add uppercase letters');
    if (!/[0-9]/.test(password)) feedback.push('Add numbers');
    if (!/[^a-zA-Z0-9]/.test(password)) feedback.push('Add special characters');

    const percentage = Math.min((strength / 8) * 100, 100);
    let level = 'Weak';
    if (percentage >= 75) level = 'Very Strong';
    else if (percentage >= 60) level = 'Strong';
    else if (percentage >= 40) level = 'Fair';

    return { score: strength, level, percentage, feedback };
  };

  const strengthAnalysis = useMemo(() => {
    return passwords.map(pwd => ({
      ...pwd,
      strength: calculateStrength(pwd.password),
    }));
  }, [passwords]);

  const stats = useMemo(() => {
    const levels = { 'Very Strong': 0, 'Strong': 0, 'Fair': 0, 'Weak': 0 };
    strengthAnalysis.forEach(item => {
      levels[item.strength.level]++;
    });
    const avgStrength = strengthAnalysis.length > 0
      ? (strengthAnalysis.reduce((sum, item) => sum + item.strength.percentage, 0) / strengthAnalysis.length).toFixed(1)
      : 0;
    return { levels, avgStrength };
  }, [strengthAnalysis]);

  const getStrengthColor = (level) => {
    const colors = {
      'Very Strong': 'bg-green-500',
      'Strong': 'bg-blue-500',
      'Fair': 'bg-yellow-500',
      'Weak': 'bg-red-500',
    };
    return colors[level] || 'bg-gray-400';
  };

  const getStrengthTextColor = (level) => {
    const colors = {
      'Very Strong': 'text-green-600',
      'Strong': 'text-blue-600',
      'Fair': 'text-yellow-600',
      'Weak': 'text-red-600',
    };
    return colors[level] || 'text-gray-600';
  };

  if (passwords.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No passwords to analyze. Add passwords to see strength metrics! 📊</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <p className="text-green-700 text-sm font-medium mb-2">Average Strength</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-green-600">{stats.avgStrength}%</span>
            <span className="text-sm text-green-600">out of 100</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <p className="text-blue-700 text-sm font-medium mb-2">Total Passwords Analyzed</p>
          <div className="text-4xl font-bold text-blue-600">{passwords.length}</div>
        </div>
      </div>

      {/* Strength Distribution */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Strength Distribution</h3>
        <div className="space-y-4">
          {Object.entries(stats.levels).map(([level, count]) => (
            <div key={level}>
              <div className="flex justify-between mb-2">
                <span className={`font-medium ${getStrengthTextColor(level)}`}>{level}</span>
                <span className="text-gray-600 text-sm">{count} passwords</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getStrengthColor(level)}`}
                  style={{ width: `${(count / passwords.length) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Password Strength */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Password Breakdown</h3>
        <div className="space-y-3">
          {strengthAnalysis.map(item => (
            <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-800">{item.website}</p>
                  <p className="text-sm text-gray-600">@{item.username}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStrengthTextColor(item.strength.level)} ${
                  item.strength.level === 'Very Strong' ? 'bg-green-50' :
                  item.strength.level === 'Strong' ? 'bg-blue-50' :
                  item.strength.level === 'Fair' ? 'bg-yellow-50' :
                  'bg-red-50'
                }`}>
                  {item.strength.level}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-600">Strength Score</span>
                  <span className="text-xs font-medium text-gray-800">{item.strength.percentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getStrengthColor(item.strength.level)}`}
                    style={{ width: `${item.strength.percentage}%` }}
                  />
                </div>
              </div>

              {/* Feedback */}
              {item.strength.feedback.length > 0 && (
                <div className="space-y-1">
                  {item.strength.feedback.map((tip, idx) => (
                    <p key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                      <span>💡</span> {tip}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">🎯 Recommendations</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>✓ Update weak passwords to stronger ones</li>
          <li>✓ Use at least 12 characters for strong passwords</li>
          <li>✓ Mix uppercase, lowercase, numbers, and special characters</li>
          <li>✓ Avoid dictionary words and personal information</li>
          <li>✓ Use unique passwords for important accounts</li>
        </ul>
      </div>
    </div>
  );
}
