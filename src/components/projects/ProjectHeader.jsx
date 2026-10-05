import React from "react";

export default function ProjectHeader({ activeProject, onOpenInitiateModal }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          Building Communities
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Open, direct-action infrastructure galvanization & funding.
        </p>
      </div>

      <button
        onClick={onOpenInitiateModal}
        disabled={!!activeProject}
        className={`px-4 py-2.5 rounded-md text-sm font-semibold transition ${
          activeProject
            ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
            : "bg-red-700 hover:bg-red-800 text-white shadow-sm"
        }`}
      >
        {activeProject ? "Project Currently Active" : "+ Initiate New Project"}
      </button>
    </div>
  );
}