import React, { useState } from "react";
import axios from "axios";

const ResumeForm = () => {
  const [data, setData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/resume",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={data.name}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={data.email}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Generate Resume
      </button>
    </form>
  );
};

export default ResumeForm;
