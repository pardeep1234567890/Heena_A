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
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Admin Panel - Users</h2>
        <div className="bg-white p-8 rounded-lg shadow-md overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading users...</p>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No users found</p>
            </div>
          ) : (
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersAdmin;
