import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Footer from '../components/Footer';


const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check localStorage first
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');


        // If no localStorage data, fetch from API
        const response = await fetch(`${import.meta.env.VITE_BASEURL_BACKEND}/auth/user/${storedUsername}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Ensure we have the required data structure
        if (data) {
          setUserData({
            username: data.username || storedUsername || '',
            password: data.password || storedPassword || '',
            instagramId: data.instagramId || '',
            email: data.email || ''
          });
        } else {
          throw new Error('No data received from API');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const generateQRData = () => {
    if (!userData) return '';
    const profileUrl = `${import.meta.env.VITE_BASEURL_FRONTEND}/profile/${userData.username}`;
    return profileUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-slate-900   flex flex-col">
      {/* Header */}
      <div className='bg-slate-800 w-full h-auto py-15 flex flex-col justify-between items-center px-5 shadow-lg'>
        <div className="flex justify-between items-center w-full h-20">
          <h1 className='text-white text-2xl font-bold'>Profile QR</h1>
          <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md' onClick={handleLogout}>Logout</button>
        </div>

        
      </div>
        
      {/* Main Content */}
      <div className="flex-grow w-[95%] md:w-[80%] lg:w-[60%] mx-auto mt-10 mb-10">
        <div className="bg-slate-800 rounded-lg shadow-xl p-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-white text-xl">Loading...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-red-500 text-xl">{error}</div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* QR Code Section */}
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg shadow-md relative hover:-top-2 hover:shadow-lg transition-transform duration-300 ease-in-out">
                  <QRCodeSVG
                    
                    value={generateQRData()}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <h2 className="text-white text-xl font-semibold mt-4">Scan to Connect</h2>
              </div>

              {/* Contact Information Section */}
              <div className="flex-1">
                <div className="bg-slate-700 rounded-lg p-6">
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
              </div>
            </div>
          )}
        </div>
      <div className="text-center py-3">
          <p className="text-slate-400/30 text-lg font-medium italic">Replacing traditional visiting cards</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;