'use client';

import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
      <h1 className="text-4xl font-bold text-blue-700">About FinTrack</h1>

      <p className="text-lg text-gray-700 leading-relaxed">
        FinTrack is your smart companion for managing personal finances.
        It helps you track income, expenses, and savings goals all in one clean, easy-to-use dashboard.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Built with the latest web tech like Next.js and TypeScript, it’s fast, secure, and always evolving.
        Whether you’re a student or professional, FinTrack gives you clarity and control over your money.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        This app was made with care to help people like you take charge of their finances. Thanks for using it!
      </p>

      <button
        onClick={() => router.push('/')}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
      >
        Back to Home
      </button>
    </div>
  );
}
