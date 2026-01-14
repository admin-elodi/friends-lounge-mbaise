import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  HandCoins,
  Eye,
  Trash2,
  User,
  Calendar
} from "lucide-react";

export default function Projects() {

  const [projects, setProjects] = useState([]);
  const [contributions, setContributions] = useState({});
  const [newProject, setNewProject] = useState({
    name: "",
    initiator: "",
    description: "",
    status: "ongoing",
    amount: ""
  });

  const [isCreating, setIsCreating] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showHistorical, setShowHistorical] = useState(false);

  /* ---------------- TOTALS ---------------- */
  const totals = useMemo(() => {
    const ongoingTotal = projects
      .filter(p => p.status === "ongoing")
      .reduce((acc, proj) => {
        acc[proj.id] = (contributions[proj.id] || [])
          .reduce((a, b) => a + b.amount, 0);
        return acc;
      }, {});

    const grandOngoing =
      Object.values(ongoingTotal).reduce((a, b) => a + b, 0);

    return {
      ongoing: ongoingTotal,
      grandOngoing,
      completed: projects.filter(p => p.status === "completed").length,
      historical: projects.filter(p => p.status === "historical").length,
    };
  }, [projects, contributions]);

  const isFormValid =
    newProject.name.trim() && newProject.initiator.trim();

  const handleInputChange = (field, value) => {
    setNewProject(prev => ({ ...prev, [field]: value }));
  };

  /* ---------------- CREATE PROJECT ---------------- */
  const createProject = async () => {
    if (!isFormValid) return;

    setIsCreating(true);
    await new Promise(r => setTimeout(r, 400));

    const project = {
      id: Date.now(),
      ...newProject,
      createdAt: new Date().toISOString()
    };

    setProjects(prev => [...prev, project]);
    setNewProject({
      name: "",
      initiator: "",
      description: "",
      status: "ongoing",
      amount: ""
    });

    setIsCreating(false);
  };

  /* ---------------- ADD CONTRIBUTION ---------------- */
  const addContribution = useCallback((id) => {

    const name = window.prompt("Your name:");
    if (!name?.trim()) return;

    const amount = window.prompt("Amount (₦):");
    if (!amount?.trim()) return;

    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const entry = {
      name: name.trim(),
      amount: num,
      date: new Date().toLocaleString()
    };

    setContributions(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), entry]
    }));

  }, []);

  /* ---------------- DELETE ---------------- */
  const deleteProject = (id) => {
    if (!window.confirm("Delete project?")) return;
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  /* ---------------- FILTER ---------------- */
  const filteredProjects = useMemo(() => {
    let result = projects;
    if (!showCompleted)
      result = result.filter(p => p.status !== "completed");
    if (!showHistorical)
      result = result.filter(p => p.status !== "historical");
    return result;
  }, [projects, showCompleted, showHistorical]);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">

      {/* PAGE BACKGROUND – STARTS BELOW NAVBAR */}
      <div className="absolute inset-x-0 top-[120px] bottom-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/mbaise-archive.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 className=" md:text-2xl text-black tracking-widest">
            UDO TRANSPARENCY ARCHIVE
          </h1>
          <p className="mt-12 text-gray-400 max-w-2xl mx-auto">
            Honoring contributors • Tracking ongoing projects • Preserving history
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Stat
            label="Ongoing Total"
            value={`₦${totals.grandOngoing.toLocaleString()}`}
            highlight
          />
          <Stat
            label="Completed"
            value={totals.completed}
          />
          <Stat
            label="Historical"
            value={totals.historical}
          />
        </div>

        {/* FORM */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="bg-black/60 border border-white/10 rounded-xl p-8">

            <div className="flex items-center gap-3 mb-6">
              <Plus className="text-red-400" />
              <h3 className="font-bold text-lg">Add New Project</h3>
            </div>

            <div className="space-y-4">
              <input
                placeholder="Project name"
                value={newProject.name}
                onChange={e => handleInputChange("name", e.target.value)}
                className="w-full p-3 bg-black/40 border border-white/20 rounded"
              />

              <input
                placeholder="Initiator"
                value={newProject.initiator}
                onChange={e => handleInputChange("initiator", e.target.value)}
                className="w-full p-3 bg-black/40 border border-white/20 rounded"
              />

              <textarea
                rows={3}
                placeholder="Description"
                value={newProject.description}
                onChange={e => handleInputChange("description", e.target.value)}
                className="w-full p-3 bg-black/40 border border-white/20 rounded"
              />

              <input
                placeholder="Estimated cost ₦ (optional)"
                value={newProject.amount}
                onChange={e => handleInputChange("amount", e.target.value)}
                className="w-full p-3 bg-black/40 border border-white/20 rounded"
              />

              <div className="flex gap-3">
                <select
                  value={newProject.status}
                  onChange={e => handleInputChange("status", e.target.value)}
                  className="flex-1 p-3 bg-black/40 border border-white/20 rounded"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="historical">Historical</option>
                </select>

                <button
                  onClick={createProject}
                  disabled={!isFormValid}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded font-bold transition"
                >
                  {isCreating ? "Adding..." : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`px-5 py-2 border rounded-full ${
              showCompleted ? "bg-green-500/20" : ""
            }`}
          >
            Completed ({totals.completed})
          </button>

          <button
            onClick={() => setShowHistorical(!showHistorical)}
            className={`px-5 py-2 border rounded-full ${
              showHistorical ? "bg-gray-500/20" : ""
            }`}
          >
            Historical ({totals.historical})
          </button>
        </div>

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredProjects.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">
              No projects yet
            </p>
          ) : (

            filteredProjects.map(p => {
              const total = totals.ongoing[p.id] || 0;
              const list = contributions[p.id] || [];

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/50 border border-white/10 rounded-xl p-6"
                >
                  <h3 className="font-bold text-xl">
                    {p.name}
                  </h3>

                  <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-2">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {p.initiator}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {p.description && (
                    <p className="text-sm text-gray-300 mt-3">
                      {p.description}
                    </p>
                  )}

                  {p.status === "ongoing" && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3 mt-4">
                      <p className="text-green-400 font-bold text-lg">
                        ₦{total.toLocaleString()}
                      </p>
                      <p className="text-xs text-green-300">
                        {list.length} contribution{list.length !== 1 && "s"}
                      </p>
                    </div>
                  )}

                  {/* CONTRIBUTION LIST */}
                  {list.length > 0 && (
                    <div className="mt-4 space-y-2 text-sm">
                      <p className="font-semibold text-gray-300">
                        Contributions
                      </p>

                      {list.map((c, i) => (
                        <div
                          key={i}
                          className="flex justify-between bg-black/30 p-2 rounded border border-white/10"
                        >
                          <span>{c.name}</span>
                          <span className="text-green-400 font-bold">
                            ₦{c.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 mt-5">
                    {p.status === "ongoing" && (
                      <button
                        onClick={() => addContribution(p.id)}
                        className="px-4 py-2 bg-green-600/20 border border-green-600/40 rounded"
                      >
                        Contribute
                      </button>
                    )}

                    <button
                      onClick={() => deleteProject(p.id)}
                      className="px-4 py-2 bg-red-600/20 border border-red-600/40 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* PUBLIC TRACKERS */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-32 pt-16 border-t-2 border-dashed border-white/20"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-4 justify-center">
              <Eye className="w-10 h-10 text-red-400" />
              Track Public Spending
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { url: "https://tracka.ng", name: "Tracka", desc: "Track government projects" },
              { url: "https://www.eyemark.ng", name: "Eyemark", desc: "Monitor capital projects" },
              { url: "https://constrack.ng", name: "ConsTrack", desc: "Track constituency projects" }
            ].map(({ url, name, desc }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-black/40 hover:bg-red-500/20 border-2 border-white/30 hover:border-red-400 rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 backdrop-blur-md shadow-xl"
              >
                <div className="font-bold text-2xl text-white group-hover:text-red-400 transition mb-3">
                  {name}
                </div>
                <p className="text-gray-400 text-sm">
                  {desc}
                </p>
              </a>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
}

/* STAT COMPONENT */
function Stat({ label, value, highlight }) {
  return (
    <div className="bg-black/60 border border-white/10 rounded-xl p-8 text-center">
      <div
        className={`text-3xl font-black ${
          highlight ? "text-green-400" : ""
        }`}
      >
        {value}
      </div>
      <p className="text-sm text-gray-400 mt-1">
        {label}
      </p>
    </div>
  );
}
