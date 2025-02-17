import React from "react";

export default function Portfolio() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <img src="/profile.jpg" alt="My Profile" className="w-40 h-40 rounded-full shadow-lg border-4 border-blue-500" />
      <h1 className="text-3xl font-bold mt-4">Jayaprakash Das</h1>
      <p className="text-lg text-gray-600">Full Stack Developer | MCA Student</p>
    </div>
  );
}
