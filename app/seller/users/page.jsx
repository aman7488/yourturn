'use client';
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import Footer from "@/components/seller/Footer";
import { assets } from "@/assets/assets";

const UserList = () => {
  const { getToken, user } = useAppContext();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/seller-list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUsers(data.users);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <h2 className="pb-4 text-lg font-medium">All Users</h2>
          <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-medium truncate">User</th>
                  <th className="px-4 py-3 font-medium truncate">Email</th>
                  <th className="px-4 py-3 font-medium truncate">User ID</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600">
                {users.map((user, index) => (
                  <tr key={index} className="border-t border-gray-500/20">
                    <td className="px-4 py-3 flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={user.imageUrl}
                          alt="User"
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="truncate">{user.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{user.email}</td>
                    <td className="px-4 py-3 truncate text-xs text-gray-500">{user._id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserList;
