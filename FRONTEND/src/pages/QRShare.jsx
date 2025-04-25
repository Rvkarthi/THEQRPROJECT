import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import Footer from '../components/Footer';

const QRShare = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASEURL_BACKEND}/auth/user/karthikrishna`);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const generateQRData = () => {
    if (!userData) return '';
    return JSON.stringify({
      instagramId: userData.instagramId || '',
      email: userData.email || ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
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
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Share Your Profile
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Scan this QR code to get my contact information
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-white p-4 rounded-lg">
              <QRCode
                value={generateQRData()}
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>
            
            <div className="text-white text-center space-y-2">
              <p className="text-lg font-semibold">Contact Information</p>
              <p className="text-gray-300">Instagram: {userData?.instagramId || 'Not available'}</p>
              <p className="text-gray-300">Email: {userData?.email || 'Not available'}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QRShare; 