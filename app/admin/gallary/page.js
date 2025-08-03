"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

export default function GallaryPage() {
  const [loading, setLoading] = useState(false);
  const [gallary, setGallary] = useState([
   
  ]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/gallary");
      if (res.data.success) {
        setGallary(res.data.data);
      } else {
        throw new Error(res.data.message || "Failed to fetch gallary");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handelDelete = async (id) => { 
    await axios.delete(`/api/admin/gallary/${id}`);
    fetchData();
  }

  return (
    <>
      {/* Table */}
      <div className="overflow-x-auto">
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">
            Manage Gallery Photos
          </h2>
          <p>
            Upload, edit, or delete images to showcase your latest work and
            maintain an engaging visual portfolio.
          </p>
        </div>

        <div className="mb-6">
          <Link
            href={"/admin/gallary/addGallary"}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Gallary Photo
          </Link>
        </div>

        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-50 text-blue-600">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                Title
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                Description
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                Category
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                Size
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                Image
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">
                  <div className="flex justify-center items-center py-10">
                    <Loader className="h-8 w-8 text-blue-500 animate-spin" />
                    <span className="ml-2 text-blue-600 text-sm font-medium">
                      Loading photos...
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {gallary.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.size}</td>
                    <td className="px-6 py-4">
                      <img
                        src={`/uploads/gallary/${item.image}`}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 flex items-center">
                      <Link href={`/admin/gallary/addGallary/${item._id}`} className="text-blue-600 hover:underline">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-square-pen-icon lucide-square-pen"
                        >
                          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handelDelete(item._id)}
                        className="text-red-600 hover:underline ml-4"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash-icon lucide-trash"
                        >
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
