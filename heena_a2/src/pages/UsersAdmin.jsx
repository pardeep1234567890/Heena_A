import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { backend_url } = useContext(AppContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        if (backend_url) {
          const { data } = await axios.get(`${backend_url}/api/users`);
          setUsers(data);
        }
      } catch (error) {
        toast.error('Failed to fetch users');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [backend_url]);

  return (
    <div className="py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8 font-dancing">
          Admin Panel - Users
        </h2>
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">Loading users...</p>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm sm:text-base md:text-lg">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base">Name</th>
                    <th className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base">Email</th>
                    <th className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-b">
                      <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base">{user.name}</td>
                      <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base break-all">{user.email}</td>
                      <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersAdmin;
