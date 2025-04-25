import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

const Profile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASEURL_BACKEND}/auth/user/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data. Please try again later.');
        setLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-white text-xl">Loading profile...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className='bg-slate-800 w-full h-20 py-15 flex justify-between items-center px-5 shadow-lg'>
        <h1 className='text-white text-2xl font-bold'>User Profile</h1>
      </div>

      {/* Main Content */}
      <div className="flex-grow w-[95%] md:w-[80%] lg:w-[60%] mx-auto mt-10 mb-10">
        <div className="bg-slate-800 rounded-lg shadow-xl p-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">{userData?.username || 'User'}</h2>
              <p className="text-gray-400">Profile Information</p>
            </div>

            {/* Contact Information */}
            <div className="w-full bg-slate-700 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm">Instagram</label>
                  <p className="text-white font-medium">{userData?.instagramId || 'Not available'}</p>
                </div>
                <div>
                  <label className="text-gray-300 text-sm">Email</label>
                  <p className="text-white font-medium">{userData?.email || 'Not available'}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <a
                href={`https://instagram.com/${userData?.instagramId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Follow on Instagram
              </a>
                        <a
            href="mailto:karthikrishna465@gmail.com"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Send Email
          </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile; 