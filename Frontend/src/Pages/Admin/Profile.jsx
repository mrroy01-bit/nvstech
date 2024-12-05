import React, { useState } from 'react';
import './Profile.css';
import { FiEdit2, FiSettings, FiMail, FiPhone, FiUser, FiLock } from 'react-icons/fi';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Alex Mitchell',
    role: 'System Administrator',
    email: 'alex.mitchell@nvstech.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2023',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  });

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'security', label: 'Security' },
    { id: 'preferences', label: 'Preferences' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2c] to-[#4389A2] p-6">
      {/* Profile Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-white mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-300 to-purple-300 bg-clip-text text-transparent">
            User Profile
          </h1>
          <p className="text-blue-200 mt-2">Manage your account settings and preferences</p>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/10">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FiEdit2 size={16} />
              </button>
            </div>

            {/* User Info */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">{userData.name}</h2>
              <p className="text-blue-300 mb-1">{userData.role}</p>
              <p className="text-blue-200 text-sm">Member since {userData.joinDate}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6 border-b border-white/10">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-blue-400'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'profile' && (
              <div className="grid md:grid-cols-2 gap-6">
                <InfoCard
                  icon={<FiUser />}
                  label="Full Name"
                  value={userData.name}
                  isEditing={isEditing}
                />
                <InfoCard
                  icon={<FiMail />}
                  label="Email"
                  value={userData.email}
                  isEditing={isEditing}
                />
                <InfoCard
                  icon={<FiPhone />}
                  label="Phone"
                  value={userData.phone}
                  isEditing={isEditing}
                />
                <InfoCard
                  icon={<FiSettings />}
                  label="Role"
                  value={userData.role}
                  isEditing={isEditing}
                />
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Password Settings</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <FiLock /> Change Password
                  </button>
                </div>
                
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Enable 2FA for enhanced security</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Theme Preferences</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['Dark', 'Light', 'System'].map((theme) => (
                      <button
                        key={theme}
                        className="px-4 py-2 rounded-lg bg-white/5 text-blue-200 hover:bg-white/10 transition-colors"
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    {['Email Notifications', 'Push Notifications', 'SMS Alerts'].map((setting) => (
                      <div key={setting} className="flex items-center justify-between">
                        <span className="text-blue-200">{setting}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value, isEditing }) => (
  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-blue-400">{icon}</span>
      <span className="text-blue-200 text-sm">{label}</span>
    </div>
    <div className="text-white font-medium">
      {isEditing ? (
        <input
          type="text"
          value={value}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2"
        />
      ) : (
        value
      )}
    </div>
  </div>
);

export default Profile;