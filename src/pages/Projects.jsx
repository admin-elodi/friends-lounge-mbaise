// src/pages/Projects.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  HandCoins,
  PiggyBank,
  Eye,
  Trash2,
} from "lucide-react";

// 🔥 Minimal Udo/Mbaise Transparency Engine
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [contributions, setContributions] = useState({});
  const [newProjectName, setNewProjectName] = useState("");
  const [newInitiatorName, setNewInitiatorName] = useState("");

  // ------------------------------
  // LOAD LOCAL STORAGE ON MOUNT
  // ------------------------------
  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    const savedContributions = localStorage.getItem("contributions");

    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedContributions) setContributions(JSON.parse(savedContributions));
  }, []);

  // SAVE PROJECTS
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // SAVE CONTRIBUTIONS
  useEffect(() => {
    localStorage.setItem("contributions", JSON.stringify(contributions));
  }, [contributions]);

  // CREATE NEW PROJECT
  const createProject = () => {
    if (!newProjectName.trim() || !newInitiatorName.trim()) return;

    const newProj = {
      id: Date.now(),
      name: newProjectName.trim(),
      initiator: newInitiatorName.trim(),
      createdAt: new Date().toISOString(),
    };

    setProjects((p) => [...p, newProj]);
    setNewProjectName("");
    setNewInitiatorName("");
  };

  // ADD CONTRIBUTION
  const addContribution = (id) => {
    const amount = prompt("Enter amount contributed (₦):");
    if (!amount || isNaN(amount)) return;

    const amt = Number(amount);

    setContributions((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), amt],
    }));
  };

  // DELETE PROJECT
  const deleteProject = (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setProjects((p) => p.filter((proj) => proj.id !== id));

    const updated = { ...contributions };
    delete updated[id];
    setContributions(updated);
  };

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">

      {/* BACKGROUND LOOPING VIDEO */}
      <video
        src="/src/assets/videos/dollars.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY TO IMPROVE READABILITY */}
      <div className="fixed inset-0 bg-black/60" />

      {/* PAGE CONTENT */}
      <div className="relative z-10">

        {/* EXTERNAL LINKS TO PROJECT TRACKING PORTALS */}
        <section className="mt-4 max-w-3xl mx-auto px-6 py-10 bg-black/40 border border-white/10 rounded-lg shadow-xl backdrop-blur-md mb-2">
          <h2 className="text-xl font-bold mb-6">Track Community Projects</h2>
          <p className="mb-4 text-gray-300">
            Friends Lounge encourages Udo and beyond to watch the money in public projects by
            using the tools below. True Friends of the people spend wisely on their behalf
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a
                href="https://tracka.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline"
              >
                Tracka - BudgIT Foundation
              </a>
            </li>
            <li>
              <a
                href="https://www.eyemark.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline"
              >
                Eyemark
              </a>
            </li>
            <li>
              <a
                href="https://constrack.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline"
              >
                ConsTrack
              </a>
            </li>
          </ul>
        </section>

        {/* HERO */}
        <section className="py-32 text-center">
          <h1 className="text-xl md:text-4xl font-black">
            Udo & Mbaise Public Projects
          </h1>
          <p className="mt-6 text-xl md:text-xl text-gray-300 max-w-3xl mx-auto">
            Welcome to a special Friends Lounge space for transparency
            and accountability   A centralized space where you can 
            view details of active projects initiated here
          </p>
        </section>

        {/* CREATE PROJECT */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="bg-black/40 border border-white/10 p-10 rounded-3xl shadow-xl backdrop-blur-md">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              <Plus /> Start a New Project
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Project Name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="px-6 py-4 rounded-xl bg-black/50 border border-white/20 focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                placeholder="Initiator Name"
                value={newInitiatorName}
                onChange={(e) => setNewInitiatorName(e.target.value)}
                className="px-6 py-4 rounded-xl bg-black/50 border border-white/20 focus:outline-none focus:border-red-500"
              />
            </div>

            <button
              onClick={createProject}
              className="mt-8 px-10 py-4 bg-red-600 hover:bg-red-500 rounded-full font-bold text-lg shadow-lg transition"
            >
              Create Project
            </button>
          </div>
        </section>

        {/* PROJECT LIST */}
        <section className="max-w-6xl mx-auto px-6 pb-40">
          <h2 className="text-xl font-black mb-10 flex items-center gap-3">
            <Eye /> Active Community Projects
          </h2>

          {projects.length === 0 ? (
            <p className="text-gray-400 text-lg">
              No projects yet. Start one above.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-10">
              {projects.map((proj) => {
                const total = (contributions[proj.id] || []).reduce(
                  (a, b) => a + b,
                  0
                );

                return (
                  <div
                    key={proj.id}
                    className="bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-lg shadow-lg"
                  >
                    <h3 className="text-2xl font-bold">{proj.name}</h3>
                    <p className="text-gray-400 mt-2">
                      Initiator: <span className="text-white">{proj.initiator}</span>
                    </p>

                    <div className="mt-6">
                      <p className="text-xl font-black text-green-400">
                        Total Raised: ₦{total.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-8">
                      <button
                        onClick={() => addContribution(proj.id)}
                        className="px-5 py-3 bg-green-600 hover:bg-green-500 rounded-full font-bold flex items-center gap-2"
                      >
                        <HandCoins size={20} />
                        Contribute
                      </button>

                      <button
                        onClick={() => deleteProject(proj.id)}
                        className="px-5 py-3 bg-red-700 hover:bg-red-600 rounded-full font-bold flex items-center gap-2"
                      >
                        <Trash2 size={20} />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
