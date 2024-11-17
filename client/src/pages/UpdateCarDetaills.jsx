import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../utils/server.js";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateCarDetails = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const { carId } = useParams();
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${backendUrl}/cars/updatecardetails/${carId}`,
        {
          title,
          description,
          tags,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message, {
        position: "top-center",
      });
      setTitle("");
      setDescription("");
      setTags("");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
      setLoading(false);
    }
  };
  const handleImageUpdate = async (e) => {
    e.preventDefault();
    if (files.length > 10) {
      toast.error("Maximum 10 images can be uploaded", {
        position: "top-center",
      });
      return;
    }
    if (files.length == 0) {
      toast.error("Image is required", {
        position: "top-center",
      });
      return;
    }
    const formData = new FormData();
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }
    setLoading1(true);
    try {
      const { data } = await axios.put(
        `${backendUrl}/cars/updatecarimage/${carId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message, {
        position: "top-center",
      });
      setTitle("");
      setDescription("");
      setTags("");
      setLoading1(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
      setLoading1(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 flex-col">
      <div className="w-full max-w-2xl p-8 bg-white rounded-md shadow-md mt-10 mb-10 ml-3 mr-4">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Update Your Car Details
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
              "Update Car"
            )}
          </button>
        </form>
      </div>
      <div className="mt-10 w-full max-w-2xl p-8 bg-white 
      rounded-md shadow-md mb-10 ml-3 mr-4">
          <h1 className="text-2xl font-bold text-center text-gray-700 mb-5">
            Update Image
          </h1>
          <form onSubmit={handleImageUpdate}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-600">
                Upload Images (max 10)
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
              {loading1 ? (
                <div
                  className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only"></span>
                </div>
              ) : (
                "Update Car Image"
              )}
            </button>
          </form>
        </div>
    </div>
  );
};

export default UpdateCarDetails;
