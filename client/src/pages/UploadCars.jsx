import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../utils/server.js";
import { toast } from "react-hot-toast";

const UploadCars = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("CarStore-Auth_Token");

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length < 10) {
      toast.error("Minimum 10 images are required", {
        position: "top-center",
      });
      return;
    }
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/cars/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(data.message, {
        position: "top-center",
      });
      setFiles([]);
      setTitle("");
      setDescription("");
      setTags("");
      setLoading(false);
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message, {
        position: "top-center",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-2xl p-8 bg-white rounded-md shadow-md mt-10 mb-10 ml-3 mr-4">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Upload Your Car
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-600">
              Car Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none
               focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-600">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none
               focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-600">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none
               focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-600">
              Upload Images (minimum 10)
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full"
              accept="image/*"
            />
            <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:underline ml-4"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              Selected {files.length} {files.length === 1 ? "file" : "files"}.
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded
                      hover:bg-blue-600 focus:outline-none"
          >
            {loading ? (
              <div
                className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only"></span>
              </div>
            ) : (
              "Upload Car"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadCars;
