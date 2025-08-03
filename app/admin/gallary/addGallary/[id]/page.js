"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ServiceForm() {

  const { id } = useParams();

    const fetchData = async (id) => {
      const res = await axios.get(`/api/admin/gallary/${id}`);
      if (res.data.success) {
        setFormData(res.data.data);
      }
    };

    useEffect(() => {
      fetchData(id);
    }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    category: "",
    size: "medium",
  });

  const sizes = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
    { value: "tall", label: "Tall" },
    { value: "wide", label: "Wide" },
  ];

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

      const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("size", formData.size);
    if (formData.image) {
      data.append('image', formData.image);
    }

    setLoading(true);
    try {
      const response = await axios.put(`/api/admin/gallary/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message) {
        setMessage("photo Update successfully!");
        router.push("/admin/gallary");
        setFormData({ title: "", description: "", image: null,category: "", size: "medium" });
      } else {
        setMessage("Failed to add photo. Please try again.");
      }
    } catch (error) {
      console.error("Error adding photo:", error);
      setMessage("An error occurred while adding the photo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Update Gallary Image
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter title"
            name="title"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter description"
            rows="4"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Image Grid Size
          </label>
          <div className="flex gap-4">
            {sizes.map((size) => (
              <label
                key={size.value}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="size"
                  value={size.value}
                  checked={formData.size === size.value}
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                  className="sr-only"
                />
                <div
                  className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                    formData.size === size.value
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-gray-200 hover:border-sky-300"
                  }`}
                >
                  {size.label}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-center text-green-600">{message}</p>
      )}
    </div>
  );
}
