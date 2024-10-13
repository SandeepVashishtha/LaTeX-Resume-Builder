import React from "react";
import ResumeForm from "../components/ResumeForm";

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Welcome to LaTeX Resume Builder
        </h2>
        <ResumeForm />
      </div>
    </div>
  );
};

export default Home;
