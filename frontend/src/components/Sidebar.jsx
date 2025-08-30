import React from "react";

export default function Sidebar({ user, onSectionChange, activeSection }) {
  return (
    <aside className="w-64 bg-gray-900 text-white h-full flex flex-col p-4 border-r border-gray-800">
      <div className="mb-8">
        <div className="text-lg font-bold">
          Welcome, {user?.name || user?.email}
        </div>
        <div className="text-xs text-gray-400">{user?.companyName}</div>
      </div>
      <nav className="flex flex-col gap-2">
        <button
          className={`py-2 px-4 rounded-md text-left ${
            activeSection === "info" ? "bg-blue-700" : "hover:bg-gray-800"
          }`}
          onClick={() => onSectionChange("info")}
        >
          Personal Info
        </button>
        <button
          className={`py-2 px-4 rounded-md text-left ${
            activeSection === "dashboard" ? "bg-blue-700" : "hover:bg-gray-800"
          }`}
          onClick={() => onSectionChange("dashboard")}
        >
          Dashboard
        </button>
        <button
          onClick={() => onSectionChange("connect")}
          className={`py-2 px-4 rounded-md text-left ${
            activeSection === "connect" ? "bg-blue-700" : "hover:bg-gray-800"
          }`}
        >
          Connect
        </button>
      </nav>
    </aside>
  );
}
