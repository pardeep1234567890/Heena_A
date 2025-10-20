import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const { backend_url } = useContext(AppContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (backend_url) {
          const { data } = await axios.get(`${backend_url}/api/users`);
          setUsers(data);
        }
      } catch (error) {
        toast.error('Failed to fetch users');
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-dancing">Admin Panel - Users</h2>
        <div className="bg-white p-8 rounded-lg shadow-md overflow-x-auto">
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
        </div>
      </div>
    </div>
  );
};

export default UsersAdmin;
