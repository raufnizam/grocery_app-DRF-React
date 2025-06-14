import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:8000/api/auth/profile/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || err.message || 'Failed to fetch user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        <p className="mt-2 text-gray-300">Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <div className="bg-black border border-orange-500 text-orange-400 px-4 py-3 rounded max-w-md mx-auto">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-orange-600 text-black font-bold rounded hover:bg-orange-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-lg shadow-orange-500/20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center text-orange-400">User Dashboard</h1>
        <button
          onClick={() => navigate('/edit-profile')}
          className="px-4 py-2 bg-orange-600 text-black font-bold rounded hover:bg-orange-500 transition-colors"
        >
          Edit Profile
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-orange-400">Account Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-400">Username</p>
              <p className="font-medium text-gray-200">{userData.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="font-medium text-gray-200">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">User Type</p>
              <p className="font-medium text-gray-200 capitalize">{userData.user_type}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-orange-400">Personal Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-400">Full Name</p>
              <p className="font-medium text-gray-200">
                {userData.first_name || 'Not provided'} {userData.last_name || ''}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p className="font-medium text-gray-200">{userData.phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Address</p>
              <p className="font-medium text-gray-200">{userData.address || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>

      {userData.profile_picture && (
        <div className="mt-6 flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg">
            <img 
              src={userData.profile_picture} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;